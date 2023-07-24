import { cftcFinancialDerivativesList, cftcList } from "./data/dataList.js";

/**
 * Converts JSON object into a list of lists.
 * @param {JSON} JSON Object, code, source
 * @returns {Array<{date, value}>} a list of {date, value}, code, and other configurations
 */
function getGraphInfo(
  jsonObject,
  code,
  source,
  assetType = "",
  frequency = ""
) {
  if (source == "FRED") {
    return new Promise((resolve, reject) => {
      try {
        const newGraphObj = {
          date: jsonObject.observations.map((data) =>
            data["date"].slice(0, 10)
          ),
          value: jsonObject.observations.map((data) => data["value"]),
          code: code,
          description: jsonObject.description,
          last_updated_time: jsonObject.realtime_end,
          units: "N/A", //@TODO - work on fred units as well - cheerio?
          output_type: jsonObject.output_type,
          transformation: jsonObject.transformation,
          frequency: jsonObject.frequency,
          aggregation: jsonObject.aggregation,
          source: source,
          assetType: assetType,
        };

        resolve(newGraphObj);
      } catch (error) {
        reject(error);
      }
    });
  } else if (source == "EIA") {
    return new Promise((resolve, reject) => {
      //special case

      if (code == "BigThreeProductStorage") {
        const newGraphObj = {
          date: jsonObject.date,
          value: jsonObject.value,
          code: code,
          frequency: "w",
          last_updated_time: jsonObject.date[jsonObject.date.length - 1], //this exists as 'realtime_end' in FRED dataset, basically both means the latest updated date.
          description: "Product Storage (Gasoline + Distillate + Jet Fuel)",
          units: "MBBL",
          output_type: "", //use this as a default value for all EIA dataset
          transformation: "lin", //use this as a default value for all EIA dataset
          aggregation: "avg", //use this as a default value for all EIA dataset
          source: source,
          assetType: assetType,
        };

        resolve(newGraphObj);
        return;
      }

      let size = Object.keys(jsonObject.data).length;

      try {
        const newGraphObj = {
          date:
            jsonObject.frequency === "monthly"
              ? jsonObject.data.map((data) =>
                  new Date(data["period"]).toISOString().slice(0, 10)
                )
              : jsonObject.frequency === "annual"
              ? jsonObject.data.map((data) =>
                  new Date(data["period"]).toISOString().slice(0, 10)
                )
              : jsonObject.data.map((data) => data["period"]), // yyyy-mm-dd, which is different from fred format.
          value: jsonObject.data.map((data) => data["value"]),
          code: code,
          frequency:
            jsonObject.frequency === "weekly"
              ? "w"
              : jsonObject.frequency === "four-week-average"
              ? "4wavg"
              : jsonObject.frequency === "monthly"
              ? "m"
              : jsonObject.frequency === "daily"
              ? "d"
              : jsonObject.frequency === "annual"
              ? "a"
              : null,
          last_updated_time: jsonObject.data[size - 1].period, //this exists as 'realtime_end' in FRED dataset, basically both means the latest updated date.
          description: jsonObject.data[0]["series-description"],
          units: jsonObject.data[0].units,
          output_type: "", //use this as a default value for all EIA dataset
          transformation: "lin", //use this as a default value for all EIA dataset
          aggregation: "avg", //use this as a default value for all EIA dataset
          source: source,
          assetType: assetType,
        };

        resolve(newGraphObj);
      } catch (error) {
        reject(error);
      }
    });
  } else if (source == "CFTC") {


    if(cftcList.includes(code)){
      return new Promise((resolve, reject) => {
        try {
          // console.log(jsonObject.data);\
  
          const newGraphObj = {
            date: jsonObject.map((data) => data["report_date_as_yyyy_mm_dd"]),
            value: [
              // jsonObject.map((data) => data["open_interest_all"]),
              // jsonObject.map((data) => data["m_money_positions_long_all"]),
              // jsonObject.map((data) => data["m_money_positions_short_all"]),
              // jsonObject.map((data) => data["change_in_m_money_long_all"]),
              // jsonObject.map((data) => data["change_in_m_money_short_all"]),
              jsonObject.map((data) => data["open_interest_all"]),
              jsonObject.map((data) => data["noncomm_positions_long_all"]),
              jsonObject.map((data) => data["noncomm_positions_short_all"]),
              jsonObject.map((data) => data["comm_positions_long_all"]),
              jsonObject.map((data) => data["comm_positions_short_all"]),
              jsonObject.map((data) => data["tot_rept_positions_long_all"]),
              jsonObject.map((data) => data["tot_rept_positions_short"]),
              jsonObject.map((data) => data["nonrept_positions_long_all"]),
              jsonObject.map((data) => data["nonrept_positions_short_all"]),
              jsonObject.map((data) => data["noncomm_positions_net"]),
              jsonObject.map((data) => data["comm_positions_net"]),
              jsonObject.map((data) => data["tot_rept_positions_net"]),
              jsonObject.map((data) => data["nonrept_positions_net"]),

              


            ],
            code: code,
            frequency:
              jsonObject.frequency === "weekly"
                ? "w"
                : jsonObject.frequency === "monthly"
                ? "m"
                : jsonObject.frequency === "daily"
                ? "d"
                : jsonObject.frequency === "annual"
                ? "a"
                : null,
            last_updated_time: jsonObject.last_updated_time, //this exists as 'realtime_end' in FRED dataset, basically both means the latest updated date.
            description: jsonObject.description,
            units: jsonObject.units,
            output_type: "", //use this as a default value for all cftc dataset
            transformation: "lin", //use this as a default value for all cftc dataset
            aggregation: "avg", //use this as a default value for all cftc dataset
            source: source,
            assetType: "commodity",
          };

       
          console.log(newGraphObj.value);
          resolve(newGraphObj);
        } catch (error) {
          reject(error);
        }
      });


    } else if(cftcFinancialDerivativesList.includes(code)){

      return new Promise((resolve, reject) => {
        try {
          const newGraphObj = {
            date: jsonObject.map((data) => data["report_date_as_yyyy_mm_dd"]),
            value: [
              jsonObject.map((data) => data["open_interest_all"]),
              jsonObject.map((data) => data["noncomm_positions_long_all"]),
              jsonObject.map((data) => data["noncomm_positions_short_all"]),
              jsonObject.map((data) => data["comm_positions_long_all"]),
              jsonObject.map((data) => data["comm_positions_short_all"]),
              jsonObject.map((data) => data["tot_rept_positions_long_all"]),
              jsonObject.map((data) => data["tot_rept_positions_short"]),
              jsonObject.map((data) => data["nonrept_positions_long_all"]),
              jsonObject.map((data) => data["nonrept_positions_short_all"]),
              jsonObject.map((data) => data["noncomm_positions_net"]),
              jsonObject.map((data) => data["comm_positions_net"]),
              jsonObject.map((data) => data["tot_rept_positions_net"]),
              jsonObject.map((data) => data["nonrept_positions_net"]),

            ],
            code: code,
            frequency:
              jsonObject.frequency === "weekly"
                ? "w"
                : jsonObject.frequency === "monthly"
                ? "m"
                : jsonObject.frequency === "daily"
                ? "d"
                : jsonObject.frequency === "annual"
                ? "a"
                : null,
            last_updated_time: jsonObject.last_updated_time, //this exists as 'realtime_end' in FRED dataset, basically both means the latest updated date.
            description: jsonObject.description,
            units: jsonObject.units,
            output_type: "", //use this as a default value for all cftc dataset
            transformation: "lin", //use this as a default value for all cftc dataset
            aggregation: "avg", //use this as a default value for all cftc dataset
            source: source,
            assetType: "derivative",
          };
  
          resolve(newGraphObj);
        } catch (error) {
          reject(error);
        }
      });
    }
  
    //Nasdaq Data Link
  } else if (source == "NDL") {
    let size = Object.keys(jsonObject.data).length;
    // console.log(jsonObject.data.date);
    // console.log("hi");
    return new Promise((resolve, reject) => {
      try {
        // console.log(jsonObject.data);
        const newGraphObj = {
          date: jsonObject.data.map((data) => data[0]), // yyyy-mm-dd, which is different from fred format.
          value: jsonObject.data.map((data) => data[1]),
          code: code,
          frequency:
            jsonObject.frequency === "weekly"
              ? "w"
              : jsonObject.frequency === "monthly"
              ? "m"
              : jsonObject.frequency === "daily"
              ? "d"
              : jsonObject.frequency === "annual"
              ? "a"
              : null,
          last_updated_time: jsonObject.newest_available_date, //this exists as 'realtime_end' in FRED dataset, basically both means the latest updated date.
          description: jsonObject.description,
          units: jsonObject.column_names[1], //[0]date, [1]USD ... GBP etc..
          output_type: "", //use this as a default value for all EIA dataset
          transformation: jsonObject.transform ?? "lin",
          aggregation: jsonObject.collapse ?? "avg", //use this as a default value for all EIA dataset
          source: source,
          assetType: assetType,
        };

        resolve(newGraphObj);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  } else if (source == "BOK") {
    //  console.log(jsonObject);
    let value = jsonObject.map((data) => data.DATA_VALUE);
    // let stat = jsonObject[0].STAT_NAME;

    let statName = jsonObject[0].STAT_NAME.replace(/[^a-zA-Z]/g, "");
    let statCode = jsonObject[0].STAT_CODE;
    let itemName = jsonObject[0].ITEM_NAME1;
    let itemCode = jsonObject[0].ITEM_CODE1;

    let unit = jsonObject[0].UNIT_NAME;
    let lastUpdatedTime = jsonObject[jsonObject.length - 1].TIME;
  
   

    return new Promise((resolve, reject) => {
      try {
        const newGraphObj = {
          value: jsonObject.map((data) => data.DATA_VALUE),
          date: jsonObject.map((data) => data.TIME),
          code: statCode + "_" + itemCode,
          description: statName + "_" + itemName,
          last_updated_time: lastUpdatedTime,
          units: unit,
          output_type: null,
          transformation: "lin",
          frequency: frequency,
          aggregation: "avg",
          source: source,
          assetType: assetType,
        };

        resolve(newGraphObj);
      } catch (error) {
        reject(error);
      }
    });
    // return new Promise((resolve, reject) => {
    //   try {
    //     const newGraphObj = {
    //       date: jsonObject.observations.map((data) =>
    //         data["date"].slice(0, 10)
    //       ),
    //       value: jsonObject.observations.map((data) => data["value"]),
    //       code: code,
    //       description: jsonObject.description,
    //       last_updated_time: jsonObject.realtime_end,
    //       units: "N/A", //@TODO - work on fred units as well - cheerio?
    //       output_type: jsonObject.output_type,
    //       transformation: jsonObject.transformation,
    //       frequency: jsonObject.frequency,
    //       aggregation: jsonObject.aggregation,
    //       source: source,
    //       assetType: assetType,
    //     };

    //     resolve(newGraphObj);
    //   } catch (error) {
    //     reject(error);
    //   }
    // });
  }
}

export default getGraphInfo;

//my original code lol
// var newGraphObj = {};
// console.log(code);
// newGraphObj.date = jsonObject.observations.map((data) => data["date"]);
// newGraphObj.value = jsonObject.observations.map((data) => data["value"]);
// newGraphObj.code = code;
// newGraphObj.output_type = jsonObject.output_type;
// newGraphObj.last_updated_time = jsonObject.realtime_end;
// newGraphObj.transformation = jsonObject.transformation;
// newGraphObj.frequency = jsonObject.frequency;
// newGraphObj.aggregation = jsonObject.aggregation;

//response from FRED

// realtime_start: '2023-04-01',
// realtime_end: '2023-04-01',
// observation_start: '1600-01-01',
// observation_end: '9999-12-31',
// units: 'lin',
// output_type: 1,
// file_type: 'json',
// order_by: 'observation_date',
// sort_order: 'asc',
// count: 15978,
// offset: 0,
// limit: 100000,
// observations: []

//response from NDL
// {
//   id: 11304240,
//   dataset_code: 'GOLD',
//   database_code: 'LBMA',
//   name: 'Gold Price: London Fixing',
//   description: "Gold Price: London Fixings, London Bullion Market Association (LBMA). Fixing levels are set per troy ounce. The London Gold Fixing Companies set the prices for gold that are globally considered as the international standard for pricing of gold. The Gold price in London is set twice a day by five LBMA Market Makers who comprise the London Gold Market Fixing Limited (LGMFL). The process starts with the announcement from the Chairman of the LGMFL to the other members of the LBMA Market Makers, then relayed to the dealing rooms where customers can express their interest as buyers or sellers and also the quantity they wish to trade. The gold fixing price is then set by collating bids and offers until the supply and demand are matched. At this point the price is announced as the 'Fixed' price for gold and all business is conducted on the basis of that price.",
//   refreshed_at: '2023-05-03T23:30:20.021Z',
//   newest_available_date: '2023-05-03',
//   oldest_available_date: '1968-01-02',
//   column_names: [
//     'Date',
//     'USD (AM)',
//     'USD (PM)',
//     'GBP (AM)',
//     'GBP (PM)',
//     'EURO (AM)',
//     'EURO (PM)'
//   ],
//   frequency: 'daily',
//   type: 'Time Series',
//   premium: false,
//   limit: null,
//   transform: null,
//   column_index: null,
//   start_date: '1968-01-02',
//   end_date: '2023-05-03',
//   data: [],
//   collapse: null,
//   order: null,
//   database_id: 139
// }
