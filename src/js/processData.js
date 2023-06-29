// import axios from "axios";
// import '../config/env.mjs'
import axios from "axios";
import Series from "./routes/requests/fredAPI/Series.js";
import getGraphInfo from "./filterDataForRDS.js";
import csvtojson from "csvtojson";
// import createChart from "./charts/createChart.js";
import cheerio from "cheerio";
import xlsx from "xlsx";
import {
  getDataFromRDS,
  sendDataToRDS,
} from "./routes/requests/mysqlRequest.js";
import {
  fredDataList,
  eiaDataOilList,
  eiaDataPetroleumList,
  eiaDataNGList,
  cftcList,
  nasdaqDataLinkList,
} from "./data/dataList.js";
import { permutation } from "js-combinatorics";
import fs from "fs";
import http from "http";
import cftcAPIcreator from "./routes/requests/cftcAPI/cftcAPIcreator.js";
import { tempList } from "./data/tempList.js";



/**
 * Modify this list for FRED data on the main page
 *
 * Runs only at midnight for data update
 *
 * Close connection once done for overall database connection performance
 *
 * @todo - add other API functions.
 * @todo - saving unit in mysql
 */

let failedDataParams = [];
let today = new Date();
let formattedDate =
  String(today.getFullYear()) +
  String(today.getMonth()) +
  String(today.getDate());

// const transformationOptions = [
//   "lin",
//   "chg",
//   "ch1",
//   "pch",
//   "pc1",
//   "pca",
//   "cch",
//   "cca",
//   "log",
// ];
const transformationOptions = ["lin", "pc1"];
// const frequencyOptions = ["d", "w", "bw", "m", "q", "sa", "a"];
const frequencyOptions = ["d", "w", "m", "q"];
// const aggregationOptions = ["avg", "sum", "eop"];
const aggregationOptions = ["avg"];

const fredOptionsCombinations = [];
for (let i = 0; i < transformationOptions.length; i++) {
  for (let j = 0; j < frequencyOptions.length; j++) {
    for (let k = 0; k < aggregationOptions.length; k++) {
      fredOptionsCombinations.push([
        transformationOptions[i],
        frequencyOptions[j],
        aggregationOptions[k],
      ]);
    }
  }
}

export async function updateFredDataset() {
  for (let [key, value] of Object.entries(fredDataList)) {
    for (let combination of fredOptionsCombinations) {
      try {
        console.log(
          "Adding " +
            value +
            "_" +
            combination[0] +
            "_" +
            combination[1] +
            "_" +
            combination[2] +
            " ..."
        );
        let fredRequestInstance = new Series(
          value,
          combination[0],
          combination[1],
          combination[2]
        );
        let response = await fredRequestInstance.getSeriesObservations();
        if (response instanceof Error) {
          throw response;
        }
        let json = response;

        let result = await getGraphInfo(json, value, "FRED");
        await sendDataToRDS(result);
      } catch (error) {
        failedDataParams.push([
          "FRED",
          value,
          combination[0],
          combination[1],
          combination[2],
        ]);
        console.log(error);
      }
    }
  }

  //log failed fred API fetches
  const currentDate = new Date().toISOString().slice(0, 10);
  fs.writeFile(
    `./errorlogs/failedDataParamsAfterUpdate-${currentDate}.txt`,
    failedDataParams.join("\n"),
    (err) => {
      if (err) throw err;
      console.log("Error messages saved to errors.txt");
    }
  );
  console.log("FRED DATA UPDATE COMPLETED.");
}

export async function updateEIADataset() {
  (async () => {
    // const orderedData = {};
    const eiaAPIKey = process.env.eiaAPIKey;

    for (let [key, url] of Object.entries(eiaDataOilList)) {
      try {
        const apiurl = url + "&api_key=" + eiaAPIKey;
        const response = await axios.get(apiurl);
        let json = response.data.response;
        let code = response.data.response.data[0].series;

        // json.frequency = response.data.response.frequency;
        // json.description = response.data.response['series-description'];
        // // json.description = description;
        // json.lastUpdatedTime = response.data.response.data[0].period;
        // json.transformation = 'lin'; //use this as a default value for all EIA dataset
        // json.aggregation = 'avg'; //use this as a default value for all EIA dataset
        // json.output_type =  '';//use this as a default value for all EIA dataset

        let result = await getGraphInfo(json, code, "EIA", "Oil");
        // orderedData[key] = data;

        await sendDataToRDS(result);
      } catch (error) {
        failedDataParams.push(["EIA", key]);
        console.log(error);
      }
    }

    let gasolineStock = "";
    let distillateStock = "";
    let jetFuelStock = "";
    let tempJson;

    for (let [key, url] of Object.entries(eiaDataPetroleumList)) {
      let result;

      try {
        //special case : ProductBigThreeStorage
        if (key == "Product Storage (Gasoline + Distillate + Jet Fuel)") {
          let samePeriodLength = Math.min(
            gasolineStock.length,
            distillateStock.length,
            jetFuelStock.length
          );
          let bigThreeStock = gasolineStock
            .slice(-samePeriodLength)
            .map(
              (num, index) =>
                num +
                distillateStock.slice(-samePeriodLength)[index] +
                jetFuelStock.slice(-samePeriodLength)[index]
            );

          let tempJsonForBigThree = {};

          tempJsonForBigThree["date"] = tempJson.data
            .map((data) => data["period"])
            .slice(-samePeriodLength);
          tempJsonForBigThree["value"] = bigThreeStock;

          result = await getGraphInfo(
            tempJsonForBigThree,
            "BigThreeProductStorage",
            "EIA",
            "Petroleum"
          );
        } else {
          const apiurl = url + "&api_key=" + eiaAPIKey;
          const response = await axios.get(apiurl);
          let json = response.data.response;

          let code = response.data.response.data[0].series;

          result = await getGraphInfo(json, code, "EIA", "Petroleum");

          //gasoline stock as the shortest dataset
          if (
            key == "U.S. Ending Stocks of Total Gasoline (Thousand Barrels)"
          ) {
            gasolineStock = json.data.map((data) => data["value"]);
            tempJson = json;
          } else if (
            key ==
            "U.S. Ending Stocks of Distillate Fuel Oil (Thousand Barrels)"
          ) {
            distillateStock = json.data.map((data) => data["value"]);
          } else if (
            "U.S. Ending Stocks of Kerosene-Type Jet Fuel (Thousand Barrels)"
          ) {
            jetFuelStock = json.data.map((data) => data["value"]);
          }

          // await sendDataToRDS(result);
        }

        await sendDataToRDS(result);
      } catch (error) {
        failedDataParams.push(["EIA", key]);
        console.log(error);
      }
    }

    for (let [key, url] of Object.entries(eiaDataNGList)) {
      try {
        const apiurl = url + "&api_key=" + eiaAPIKey;
        const response = await axios.get(apiurl);
        let json = response.data.response;

        let code = response.data.response.data[0].series;

        let result = await getGraphInfo(json, code, "EIA", "NG");
        // orderedData[key] = data;

        await sendDataToRDS(result);
      } catch (error) {
        failedDataParams.push(["EIA", key]);
        console.log(error);
      }
    }
  })().then(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    fs.writeFile(
      `./errorlogs/failedDataParamsAfterUpdate-${currentDate}.txt`,
      failedDataParams.join("\n"),
      (err) => {
        if (err) throw err;
        console.log("Error messages saved to errors.txt");
      }
    );
    console.log("EIA DATA UPDATE COMPLETED.");
  });

  //log failed fred API fetches
}

export async function updateCFTCDataset() {
  // + "&cftc_commodity_code=067"
  // + "&yyyy_report_week_ww=2023 Report Week 16"
  // + "&cftc_contract_market_code=001602"
  // + "&commodity_name=CRUDE OIL"

  for (const commodity of cftcList) {
    let response = await cftcAPIcreator.sendRequestToCFTC(commodity);
    let excelAsJson = response.data;
    let code = excelAsJson[0].contract_market_name;

    // console.log(res);
    const extractedData = excelAsJson.map(
      ({
        report_date_as_yyyy_mm_dd,
        open_interest_all,
        m_money_positions_long_all,
        m_money_positions_short_all,
        change_in_m_money_long_all,
        change_in_m_money_short_all,
      }) => ({
        report_date_as_yyyy_mm_dd,
        open_interest_all,
        m_money_positions_long_all,
        m_money_positions_short_all,
        change_in_m_money_long_all,
        change_in_m_money_short_all,
      })
    );
    extractedData.sort(
      (a, b) =>
        new Date(b.report_date_as_yyyy_mm_dd) -
        new Date(a.report_date_as_yyyy_mm_dd)
    );
    extractedData.last_updated_time =
      extractedData[0].report_date_as_yyyy_mm_dd.slice(0, 10);
    extractedData.units = excelAsJson[0].contract_units;
    extractedData.description = excelAsJson[0].market_and_exchange_names;
    extractedData.frequency = "weekly";

    // console.log(extractedData);
    try {
      let result = await getGraphInfo(extractedData, code, "CFTC");

      await sendDataToRDS(result);
    } catch (error) {
      failedDataParams.push(["CFTC", key]);
      console.log(error);
    }
  }
}

//   $.ajax({
//     url: "https://publicreporting.cftc.gov/resource/6dca-aqww.json",
//     type: "GET",
//     data: {
//       "$limit" : 5000,
//       "$$app_token" : "YOURAPPTOKENHERE"
//     }
// }).done(function(data) {
//   alert("Retrieved " + data.length + " records from the dataset!");
//   console.log(data);
// });

// for (let [key, value] of Object.entries(eiaDataList)) {

//     const eiaAPIKey = process.env.eiaAPIKey;
//     const url = value + "&api_key="  + eiaAPIKey;
//     const getData = async (url) => {
//       const response = await axios.get(url)
//       console.log(response);

//     }

// }

// const getData = async (url) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// const processData = async () => {
//   const dataPromises = Object.values(eiaDataList).map(async (url) => {
//     const data = await getData(url);
//     return data;
//   });

//   const allData = await Promise.all(dataPromises);

//   const orderedData = {};
//   Object.keys(eiaDataList).forEach((key, index) => {
//     orderedData[key] = allData[index];
//   });

//   console.log(orderedData);
// };

//finds a unit for dataset from datatag
// const urlToFetchUnits = 'https://fred.stlouisfed.org/series/' + value;
// await axios.get(urlToFetchUnits)
// .then(response => {
//     const $ = cheerio.load(response.data);
//     const unitsElement = $('p.series-meta-label:contains("Units:")').next('span.series-meta-value').find('span.series-meta-value-units');
//     const unit = unitsElement.text().trim();
//     if(!(unit in units)){
//       units[value] = unit;
//     }

// })
// .catch(error => {
//     // Handle errors
//     console.error(error);
// })
// .then(()=>{
//   return getGraphInfo(data);
// })

// export async function createChartForMainPage() {
//   Object.entries(data).forEach(async ([key, value]) => {
//     await getDataFromRDS(value)
//       .then((data) => {
//         createChart(data);
//       })
//       .catch((err) => {
//         throw err;
//       });
//   });
// }

export async function getDataFromFred() {
  // let promises = [];
  // let datalist = {};
  // Object.entries(fredDataTags).forEach(([key, value]) => {
  let apiKey = process.env.fredAPIKey;
  let data = await axios
    .get("https://api.stlouisfed.org/fred/releases?api_key=" + apiKey, {
      params: {
        file_type: "json",
      },
    })
    .then(async (response) => {
      console.log("Got data from FRED and saving data to the AWS RDS");
      // console.log(response);
      console.log(response.data.releases[0].data);
    })
    .catch((error) => {
      throw error;
      // throw error;
    });
  // console.log(data);
}

export async function getDataFromTE() {}

//used to fetch historical gold, copper for now cuz its free
//NDL = nasdaq data link
export async function updateNDLDataset() {
  let apiKey = process.env.nasdaqAPIKey;

  for (let name in nasdaqDataLinkList) {
    //LBMA/GOLD
    let databasedataset = nasdaqDataLinkList[name];
    await axios
      .get(
        "https://data.nasdaq.com/api/v3/datasets/" +
          databasedataset +
          ".json?api_key =" +
          apiKey,
        {
          params: {
            // order
            // transform
          },
        }
      )
      .then(async (response) => {
        let json = response.data.dataset;
        //GOLD
        let tag = json.dataset_code;
        console.log("Data fetched from Nasdaq API :" + tag);

        let result = await getGraphInfo(json, tag, "NDL");
        await sendDataToRDS(result);
      });
  }
  // let data = await axios.get("https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD.json?api_key=" + apiKey, {
  //   params : {

  //   }

  // })
}

// const transformationOptionstemp = ["lin"];
// const frequencyOptionstemp = ["d", "w", "bw", "m", "q", "sa", "a"];
const frequencyOptionstemp = ["d", "w", "m", "q"];

// const frequencyOptionstemp = ["d", "w", "m"];
// const aggregationOptionstemp = ["avg", "sum", "eop"];
const aggregationOptionstemp = ["avg"];
const transformationOptionstemp = [
  "lin",
  // "chg",
  "ch1",
  // "pch",
  "pc1",
  // "pca",
  // "cch",
  // "cca",
  // "log",
];
// const transformationOptionstemp = [
//   "lin",
//   "chg",
//   "ch1",
//   "pch",
//   "pc1",
//   "pca",
//   "cch",
//   "cca",
//   "log",
// ];
// const aggregationOptionstemp = ["avg"];

const fredOptionsCombinationstemp = [];
for (let i = 0; i < transformationOptionstemp.length; i++) {
  for (let j = 0; j < frequencyOptionstemp.length; j++) {
    for (let k = 0; k < aggregationOptionstemp.length; k++) {
      fredOptionsCombinationstemp.push([
        transformationOptionstemp[i],
        frequencyOptionstemp[j],
        aggregationOptionstemp[k],
      ]);
    }
  }
}
// export default fredDataTags;

export async function updateFredDatasettemp() {
  for (let [key, value] of Object.entries(tempList)) {
    for (let combination of fredOptionsCombinationstemp) {
      try {
        console.log(
          "Adding " +
            value +
            "_" +
            combination[0] +
            "_" +
            combination[1] +
            "_" +
            combination[2] +
            " ..."
        );
        let fredRequestInstance = new Series(
          value,
          combination[0],
          combination[1],
          combination[2]
        );
        let response = await fredRequestInstance.getSeriesObservations();
        if (response instanceof Error) {
          throw response;
        }
        let json = response;

        let result = await getGraphInfo(json, value, "FRED");
        await sendDataToRDS(result);
      } catch (error) {
        failedDataParams.push([
          "FRED",
          value,
          combination[0],
          combination[1],
          combination[2],
        ]);
        console.log(error);
      }
    }
  }

  //log failed fred API fetches
  const currentDate = new Date().toISOString().slice(0, 10);
  fs.writeFile(
    `./errorlogs/failedDataParamsAfterUpdate-${currentDate}.txt`,
    failedDataParams.join("\n"),
    (err) => {
      if (err) throw err;
      console.log("Error messages saved to errors.txt");
    }
  );
  console.log("FRED DATA UPDATE COMPLETED.");
}

//https://www.eia.gov/petroleum/drilling/xls/duc-data.xlsx
export async function getDUCDataset() {
  const url = "https://www.eia.gov/petroleum/drilling/xls/duc-data.xlsx";
  // const currentDate = new Date().toISOString().slice(0, 10);
  const fileName = `duc_data`;

  axios({
    url: url,
    method: "GET",
    responseType: "arraybuffer",
  })
    .then(async (response) => {
      fs.writeFileSync(
        "./src/js/data/excels/" + fileName + ".xlsx",
        response.data
      );
      const workbook = xlsx.readFile(
        "./src/js/data/excels/" + fileName + ".xlsx"
      );
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      let excelAsJson = xlsx.utils.sheet_to_json(sheet);

      // Extract DUC counts by region
      let regions = [
        "Anadarko",
        "Appalachia",
        "Bakken",
        "Eagle Ford",
        "Haynesville",
        "Niobrara",
        "Permian",
        "DPR Regions",
      ];
      const name = "__EMPTY";
      let jsonData = {};
      for (let i = 2; i < excelAsJson.length; i++) {
        let column = 0;
        let row = excelAsJson[i];
        let excel_date =
          row[
            "Wells drilled, completed, and drilled but uncompleted (DUC) inventory "
          ];
        //excel starts from 1900, js starts from 1970
        let date = new Date((excel_date - 25569) * 86400 * 1000);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");

        let formattedDate = `${year}-${month}-${day}`;

        regions.forEach((region) => {
          jsonData[region] = jsonData[region] || {};
          jsonData[region][formattedDate] =
            jsonData[region][formattedDate] || {};
          jsonData[region][formattedDate]["drilled"] =
            jsonData[region][formattedDate]["drilled"] || {};
          jsonData[region][formattedDate]["completed"] =
            jsonData[region][formattedDate]["completed"] || {};
          jsonData[region][formattedDate]["DUC"] =
            jsonData[region][formattedDate]["DUC"] || {};

          if (column == 0) {
            jsonData[region][formattedDate]["drilled"] = row[name];
          } else {
            jsonData[region][formattedDate]["drilled"] =
              row[`${name}_${column}`];
          }

          column++;
          jsonData[region][formattedDate]["completed"] =
            row[`${name}_${column}`];
          column++;
          jsonData[region][formattedDate]["DUC"] = row[`${name}_${column}`];
          column++;
          column++;
        });
      }

      let json = {};
      json["data"] = jsonData;
      json.frequency = "m";
      json.code = "DUC";
      json.last_updated_time = Object.keys(jsonData["Anadarko"]).pop();
      json.description =
        "Wells drilled, completed, and drilled but uncompleted (DUC) inventory";
      json.units = "count";
      (json.output_type = ""), //use this as a default value for all EIA dataset
        (json.transformation = "lin"), //use this as a default value for all EIA dataset
        (json.aggregation = "avg"), //use this as a default value for all EIA dataset
        (json.source = "EIA");
      json.assetType = "DUC";

      await sendDataToRDS(json);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getShillerDataset() {
  const fileUrl = "http://www.econ.yale.edu/~shiller/data/ie_data.xls";

  const fileName =
    "./src/js/data/excels/" + "shiller_data" + formattedDate + ".xls";

  http.get(fileUrl, (response) => {
    const contentLength = response.headers["content-length"];
    let downloadedLength = 0;

    response.pipe(fs.createWriteStream(fileName)).on("finish", () => {
      console.log("Download completed");
    });

    response.on("data", (chunk) => {
      downloadedLength += chunk.length;
      console.log(`Downloaded ${downloadedLength} of ${contentLength} bytes`);
    });
  });
}

export async function convertCopperCSVToJson() {
  const csvFilePath =
    "./src/js/data/csv/copper-prices-historical-chart-data.csv"; // Replace with the path to your CSV file

  csvtojson()
    .fromFile(csvFilePath)
    .then(async (jsonObj) => {
      let data = jsonObj.slice(8);

      let extractedData = data.map((row) => {
        return {
          date: row["Macrotrends Data Download"],
          value: row["field2"],
        };
      });

      let json = {};
      json.date = extractedData.map((row) => {
        return row.date;
      });

      json.value = extractedData.map((row) => {
        return row.value;
      });
      json.frequency = "d";
      json.code = "copper";
      json.last_updated_time = extractedData[extractedData.length - 1].date;
      json.description =
        "Historical copper price downloaded from www.macrotrends.net";
      json.units = "dollars";
      json.output_type = ""; //use this as a default value for all EIA dataset
      json.transformation = "lin"; //use this as a default value for all EIA dataset
      json.aggregation = "avg"; //use this as a default value for all EIA dataset
      json.source = "custom";
      json.assetType = "copper";

      await sendDataToRDS(json);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

export async function getDataFromMetalsAPI() {
  const baseurl = "https://metals-api.com/api/";
  const test =
    "https://metals-api.com/api/latest?access_key =" +
    process.env.getDataFromMetalsAPI;
}

export async function getBakerHughesDataset() {

  //@TODO - fetch url automatically
  const fileUrl = 'https://rigcount.bakerhughes.com/static-files/66ad1a03-195a-4d09-84ee-2229ee5ef32c';

  axios({
    url: fileUrl,
    method: "GET",
    responseType: "arraybuffer",
  }).then(async (response) => {
    let fileName = 'Worldwide Rig Count'
    let folderPath = "./src/js/data/excels/" 
    const filePath = folderPath + fileName + ".xlsx"

    fs.writeFileSync(filePath,
      response.data
    );
    
  
    // 'International Rig Counts for May 2023.xlsx',
    // const rigCountFilePattern = /^Worldwide Rig Count (\w+ \d{4})\.xlsx$/;
      // const rigCountFilePattern = /^Worldwide Rig Count.xlsx$/;

  // fs.readdir(folderPath, (err, files) => {
  //   if (err) {
  //     console.error("Error occurred while reading directory:", err);
  //     return;
  //   }
  //   const matchingFiles = files.filter((file) =>
  //     rigCountFilePattern.test(file)
  //   );

  //   if (matchingFiles.length === 0) {
  //     console.log("No matching files found.");
  //     return;
  //   }
  //   filePath = folderPath + matchingFiles.pop();
  // })


    const rigCountExcelSheet = xlsx.readFile(filePath);
    const sheetName = rigCountExcelSheet.SheetNames[0];
    const worksheet = rigCountExcelSheet.Sheets[sheetName];
    let csvContent = xlsx.utils.sheet_to_csv(worksheet);

    //starts from row 7 : year and continents
    //monthly data : 8~19, average : 20
    //space : 21
    //total rows per year : 15;

    const totalRegionNum = 9;
    const dataStartRowIdx = 6;
    const yearAndLocationIdx = 8;
    const numOfDataRows = 15; //12 months and average
    const regionNames = [
      "latAm",
      "europe",
      "africa",
      "middleEast",
      "asiaPacific",
      "totalInt",
      "canada",
      "US",
      "totalWorld",
    ];
    let rigDatasetJson = [];
    let latAm = [];
    let europe = [];
    let africa = [];
    let middleEast = [];
    let asiaPacific = [];
    let totalInt = [];
    let canada = [];
    let US = [];
    let totalWorld = [];

    rigDatasetJson.push(
      latAm,
      europe,
      africa,
      middleEast,
      asiaPacific,
      totalInt,
      canada,
      US,
      totalWorld
    );
    csvtojson({
      noheader: true,
      output: "csv",
    })
      .fromString(csvContent)
      .then(async (csvRow) => {
        let totalYears = (csvRow.length - 6) / 15;
        const taskResults = [];

        // Run asynchronous tasks
        const tasks = [];
        for (let i = 0; i < totalYears; i++) {
          tasks.push(
            readDataFromBakerHughesWorldRigCounts(
              csvRow.slice(
                dataStartRowIdx + i * numOfDataRows,
                dataStartRowIdx + (i + 1) * numOfDataRows
              )
            )
          );
        }

        let rigDataset = await Promise.all(tasks);

        // for(let j = totalYears - 1; j >= 0 ; j--){
        rigDataset = rigDataset.reverse();

        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();
        let year = currentYear - totalYears + 1;

        let regionIdx = 0;
        for (let i = 0; i < totalYears; i++) {
          for (let j = 0; j < totalRegionNum; j++) {
            let temp = rigDataset[i][j].map((value, index) => {
              let month = index;
              let day = 2
              let date = new Date(year, month, day)
            
              return [date, value];
            });

            rigDatasetJson[regionIdx].push(
              ...temp.map(([date, value]) => ({ date, value }))
            );
            regionIdx++;
          }
          year++;
          regionIdx = 0;
        }

      
        for (let i = 0; i < totalRegionNum; i++) {
          let json = {};

          json.date = rigDatasetJson[i].map((row) => {
            return row.date
          });

          
          json.value = rigDatasetJson[i].map((row) => {
            return row.value;
          });

          json.frequency = "m";
          json.code = regionNames[i];
          json.last_updated_time = `${currentYear}-${currentMonth}`;

          json.description = "Number of rigs downloaded from Baker Hughes";
          json.units = "counts";
          json.output_type = ""; //use this as a default value for all EIA dataset
          json.transformation = "lin"; //use this as a default value for all EIA dataset
          json.aggregation = "avg"; //use this as a default value for all EIA dataset
          json.source = "BakerHughes";
          json.assetType = "rigs";
        
           await sendDataToRDS(json);  
        }
      });
  })
  .catch((error) => {
    console.log(error);
  });
}


function readDataFromBakerHughesWorldRigCounts(rows) {
  // An array to store the results of each task

  // let year = rows[0][1]
  let result = [];
  for (let i = 0; i < 9; i++) {
    result.push([]);
  }
  // 'Latin America', 'Europe', 'Africa', 'Middle East', 'Asia Pacific',  'Total Intl.', 'Canada','U.S.', 'Total World' ,'avg

  //each months
  for (let i = 1; i < 13; i++) {

    let idx = 2;
    if(rows[i][idx].replace("$", "") != ''){
      result[0].push(rows[i][idx++].replace("$", ""));
      result[1].push(rows[i][idx++].replace("$", ""));
      result[2].push(rows[i][idx++].replace("$", ""));
      result[3].push(rows[i][idx++].replace("$", ""));
      result[4].push(rows[i][idx++].replace("$", ""));
      result[5].push(rows[i][idx++].replace("$", ""));
      result[6].push(rows[i][idx++].replace("$", ""));
      result[7].push(rows[i][idx++].replace("$", ""));
      result[8].push(rows[i][idx].replace("$", ""));
      idx = 2;
    } 
    
  }
  //
  return result;
}
