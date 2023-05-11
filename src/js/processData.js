// import axios from "axios";
// import '../config/env.mjs'
import axios from "axios";
import Series from "./routes/requests/fredAPI/Series.js";
import getGraphInfo from "./filterDataForRDS.js";
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
import url from "url";
import { permutation } from "js-combinatorics";
import fs from "fs";
import http from "http";
import https from "https";
import cftcAPIcreator from "./routes/requests/cftcAPI/cftcAPIcreator.js";
import { log } from "console";
import { tempList } from "./data/tempList.js";
import e, { json } from "express";
import { format } from "path";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

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
const frequencyOptions = ["d", "w", "m"];
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

    for (let [key, url] of Object.entries(eiaDataPetroleumList)) {
      try {
        const apiurl = url + "&api_key=" + eiaAPIKey;
        const response = await axios.get(apiurl);
        let json = response.data.response;

        let code = response.data.response.data[0].series;

        let result = await getGraphInfo(json, code, "EIA", "Petroleum");

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
const frequencyOptionstemp = ["d"];

// const frequencyOptionstemp = ["d", "w", "m"];
// const aggregationOptionstemp = ["avg", "sum", "eop"];
const aggregationOptionstemp = ["avg"];
const transformationOptionstemp = [
  "lin",
  // "chg",
  // "ch1",
  // "pch",

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

// export async function getBakerHughesDataset(){
//   const url = 'https://rigcount.bakerhughes.com/intl-rig-count'; // replace with the URL of the webpage to scrape
//   const fileName = './src/js/data/excels/' +  'BakerHughes-rig-count' + formattedDate + '.xlsx';

//   https.get(url, response => {

//     let data = '';

//     response.on('data', chunk => {
//       data += chunk;
//     });

//     response.on('end', () => {

//       const doc = new DOMParser().parseFromString(data, 'text/html');

//       const href = doc.evaluate('/html/body/div[2]/div/div/div/div[2]/article/div/div[2]/div/div/div[1]/div/div/div/table/tbody/tr[1]/td[2]/div/div/article/div/div/div/div/span[1]/a', doc, null, XPathResult.STRING_TYPE, null).stringValue;

//       https.get(href, response => {
//         const contentLength = response.headers['content-length'];
//         let downloadedLength = 0;

//         response.pipe(fs.createWriteStream(fileName)).on('finish', () => {
//           console.log(`Downloaded file '${fileName}' from '${href}'`);
//         });
//         console.log(data);
//         response.on('data', chunk => {
//           downloadedLength += chunk.length;
//           console.log(`Downloaded ${downloadedLength} of ${contentLength} bytes (${((downloadedLength / contentLength) * 100).toFixed(2)}%)`);
//         });
//       });
//     });
//   });
// }
