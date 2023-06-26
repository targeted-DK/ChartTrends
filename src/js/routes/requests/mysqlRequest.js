// const database = require('../config/database');
import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
import lodash from "lodash";
import database from "../../config/Database/serverConnection.js";
import queries from "../../mysqlQueries.js";
import {
  chartCategoryList,
  EIAPetroleumExportList,
  EIAPetroleumExportTags,
  EIAPetroleumFourWeekAvgDemandList,
  EIAPetroleumFourWeekAvgDemandTags,
  EIAPetroleumImportList,
  EIAPetroleumImportTags,
  EIAPetroleumSubCategoryList,
} from "../../data/chartSubCategoryList.js";
import dataList, {
  cftcList,
  eiaDUCList,
  eiaDataNGTags,
  eiaDataOilTags,
  eiaDataPetroleumList,
  eiaDataPetroleumTags,
  fredDataList,
} from "../../data/dataList.js";
import featuredList from "../../data/featuredList.js";
import ratioList from "../../data/ratioList.js";
import bondsList from "../../data/bondsList.js";
import macroList from "../../data/macroList.js";
import bankList from "../../data/bankList.js";
import fedList from "../../data/fedList.js";

router.use(bodyParser.json());

//Request from the client-side : 1) create highcharts 2) show correlation between charts 3) TODO
router.post("/mysqlRequest", async (req, res) => {
  if (req.body.use == "FRED") {
    try {
      // console.log(req.body);

      const dataFromRds = await getDataFromRDS(req.body);
      // res.status(200).send({ data: dataFromRds, message: 'Data fetched from RDS' });
      // console.log(dataFromRds);

      res.status(200).send(dataFromRds);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "py_analysis") {
    try {
      const dataFromRds = await getDataFromRDS(req.body.data);
      // res.status(200).send({ data: dataFromRds, message: 'Data fetched from RDS' });
      res.status(200).send(dataFromRds);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }
  //EIA DATA - FIX IT
  if (req.body.use == "EIA") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "CFTC") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "econindicators") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "featured") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "ratio") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "bonds") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "macro") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "bank") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == "fed") {
    try {
      const results = await getDataFromRDS(req.body);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send({ message: "Error fetching data from RDS" });
    }
  }

  if (req.body.use == null) {
    // console.log((req.body));
    try {
      await sendDataToRDS(req.body);
      res.status(200).send({ message: "Fetched data inserted to RDS" });
    } catch (error) {
      res.status(500).send({ message: "Error sending data from RDS" });
    }
  }
});

/**
 *
 * @param {list} mappedDataForRds - includes a fred tag, and a list of [date, value]
 *
 */
export async function sendDataToRDS(mappedDataForRds) {
  console.log("Sending data to RDS");
  //warning : DUC uses different format : data - region - date:values
  let tag = mappedDataForRds.code;
  let dateData = mappedDataForRds.date;
  let valueData = mappedDataForRds.value;
  let outputType = mappedDataForRds.output_type;
  let lastUpdatedTime = mappedDataForRds.last_updated_time;
  let description = mappedDataForRds.description;
  let units = mappedDataForRds.units;
  let DATABASE_NAME = mappedDataForRds.source; //this equals to the source of data as well.
  let transformation = mappedDataForRds.transformation;
  let frequency = mappedDataForRds.frequency;
  let aggregation = mappedDataForRds.aggregation;
  let assetType = mappedDataForRds.assetType;
  // console.log(DATABASE_NAME);

  // console.log(dateData);
  // console.log(valueData);

  // TODO : get units and graph description from fred web using cheerio
  if (database.authorized) {
    console.log("Database Accessed");

    //DATABASE SET UPS
    //create catalog database if not exists
    database.query(
      queries.CREATE_DATABASE,
      "catalog",
      function (err, result, field) {
        if (err) {
          console.error("ERROR EXECUTING CREATE_DATABASE catalog", err);
          return;
        } else {
          console.log("CREATE_DATABSE catalog executed");
        }
      }
    );
    //create database if not exists
    database.query(
      queries.CREATE_DATABASE,
      DATABASE_NAME,
      function (err, result, field) {
        if (err) {
          console.error(
            `ERROR EXECUTING CREATE_DATABASE ${DATABASE_NAME}`,
            err
          );
          return;
        } else {
          console.log(`CRAETE_DATABASE ${DATABASE_NAME} executed`);
        }
      }
    );

    //CATALOG SET UP
    database.query(
      queries.CHECK_INDICATOR_TABLE_IF_EXISTS,
      DATABASE_NAME,
      function (err, result, field) {
        if (err) {
          console.error("ERROR EXECUTING CHECK_INDICATOR_TABLE_IF_EXISTS", err);
          return;
        } else {
          console.log("CHECK_INDICATOR_TABLE_IF_EXISTS executed");
        }
      }
    );

    //SPECIAL CASE FOR DUC EXCEL FILE. FOR OTHER DATA MYSQL REQUEST, GO TO LINE 295
    if (DATABASE_NAME == "EIA" && tag == "DUC") {
      let dataset = mappedDataForRds.data;
      let regions = Object.keys(dataset);

      regions.forEach((region) => {
        let newTableName = "DUC" + "_" + region;

        database.query(
          queries.FIND_DUPLICATE_IN_INDICATOR_TABLE,
          [
            DATABASE_NAME,
            newTableName,
            description,
            frequency,
            transformation,
            aggregation,
            units,
            lastUpdatedTime,
            assetType,
          ],
          function (err, catalogQueryResult, field) {
            if (err) {
              console.error(
                "ERROR EXECUTING FIND_DUPLICATE_IN_INDICATOR_TABLE",
                err
              );
              return;
            } else {
              console.log("FIND_DUPLICATE_IN_INDICATOR_TABLE executed");

              if (catalogQueryResult[0] == null) {
                database.query(
                  queries.ADD_INDICATOR_TO_TABLE,
                  //newTableName for DUC but tag for other data
                  [
                    DATABASE_NAME,
                    newTableName,
                    description,
                    frequency,
                    transformation,
                    aggregation,
                    units,
                    lastUpdatedTime,
                    assetType,
                  ],

                  function (err, result, field) {
                    if (err) {
                      console.error(
                        "ERROR EXECUTING ADD_INDICATOR_TO_TABLE QUERY",
                        err
                      );
                      return;
                    }

                    let indicator_id = result.insertId;

                    let data = dataset[region];
                    let dateData = Object.keys(data);
                    let values = Object.values(data);
                    let drilledData = values.map((item) =>
                      item.drilled == "--" ? 0 : item.drilled
                    );
                    let completedData = values.map((item) =>
                      item.completed == "--" ? 0 : item.completed
                    );
                    let DUCData = values.map((item) =>
                      item.DUC == "--" ? 0 : item.DUC
                    );

                    let tuples = lodash
                      .zip(dateData, drilledData, completedData, DUCData)
                      .map((row) => [
                        row[0],
                        row[1],
                        row[2],
                        row[3],
                        indicator_id,
                      ]);
                    console.log(tuples);
                    database.query(
                      queries.CREATE_DATA_TABLE_DUC,
                      [DATABASE_NAME, newTableName, DATABASE_NAME],
                      function (err, result, field) {
                        if (err) {
                          console.error(
                            "ERROR EXECUTING CREATE_DATA_TABLE_DUC",
                            err
                          );
                          return;
                        }

                        database.query(
                          queries.INSERT_DATA_TO_TABLE_DUC,
                          [DATABASE_NAME, newTableName, tuples],
                          function (err, result, field) {
                            if (err) {
                              console.error(
                                "ERROR EXECUTING INSERT_DATA_TO_TABLE_DUC",
                                err
                              );
                              return;
                            } else {
                              console.log("CREATE_DATA_TABLE_DUC executed");
                              console.log("INSERT_DATA_TO_TABLE_DUC executed");
                            }
                          }
                        );
                      }
                    );
                  }
                );
              }
            }
          }
        );

        //IF DATA DOES NOT EXIST IN CATALOG and , ADD NEW ROW IN CATALOG AND CREATE NEW TABLE
      });
      return;
    }

    //CHECK IF DATA ALREADY EXISTS BY LOOKING AT THE CATALOG.INDICATOR
    let newTableName;
    if (DATABASE_NAME == "CFTC") {
      newTableName = tag;
    } else {
      newTableName =
        tag + "_" + frequency + "_" + transformation + "_" + aggregation;
    }

    let newCatalog = [
      tag,
      frequency,
      description,
      units,
      transformation,
      DATABASE_NAME,
      lastUpdatedTime,
      aggregation,
      // source, source is not a column in row but a table name
      assetType,
    ];

    database.query(
      queries.FIND_DUPLICATE_IN_INDICATOR_TABLE,
      [DATABASE_NAME, tag, frequency, transformation, aggregation, assetType],
      function (err, catalogQueryResult, field) {
        if (err) {
          console.error(
            "ERROR EXECUTING FIND_DUPLICATE_IN_INDICATOR_TABLE",
            err
          );
          return;
        } else {
          console.log("FIND_DUPLICATE_IN_INDICATOR_TABLE executed");
        }

        //IF DATA DOES NOT EXIST IN CATALOG and , ADD NEW ROW IN CATALOG AND CREATE NEW TABLE
        if (catalogQueryResult[0] == null) {
          database.query(
            queries.ADD_INDICATOR_TO_TABLE,
            [
              DATABASE_NAME,
              tag,
              description,
              frequency,
              transformation,
              aggregation,
              units,
              lastUpdatedTime,
              assetType,
            ],
            function (err, result, field) {
              if (err) {
                console.error(
                  "ERROR EXECUTING ADD_INDICATOR_TO_TABLE QUERY",
                  err
                );
                return;
              }
              // console.log(result);
              //result returns this - indicator_id is "insertId"
              // ResultSetHeader {
              //   fieldCount: 0,
              //   affectedRows: 1,
              //   insertId: 7,
              //   info: '',
              //   serverStatus: 2,
              //   warningStatus: 1
              // }
              let indicator_id = result.insertId;

              if (DATABASE_NAME == "CFTC") {
                database.query(
                  queries.CREATE_DATA_TABLE_CFTC,
                  [DATABASE_NAME, newTableName, DATABASE_NAME],
                  function (err, result, field) {
                    if (err) {
                      console.error("ERROR EXECUTING CREATE_DATA_TABLE", err);
                      return;
                    }

                    const open_interest_all = valueData[0];
                    const m_money_positions_long_all = valueData[1];
                    const m_money_positions_short_all = valueData[2];
                    const change_in_m_money_long_all = valueData[3];
                    const change_in_m_money_short_all = valueData[4];

                    let tuples = lodash
                      .zip(
                        dateData,
                        open_interest_all,
                        m_money_positions_long_all,
                        m_money_positions_short_all,
                        change_in_m_money_long_all,
                        change_in_m_money_short_all
                      )
                      .map((row) => [
                        row[0],
                        row[1],
                        row[2],
                        row[3],
                        row[4],
                        row[5],
                        indicator_id,
                      ]);

                    database.query(
                      queries.INSERT_DATA_TO_TABLE_CFTC,
                      [DATABASE_NAME, newTableName, tuples],
                      function (err, result, field) {
                        if (err) {
                          console.error(
                            "ERROR EXECUTING INSERT_DATA_TO_TABLE_CFTC",
                            err
                          );
                          return;
                        } else {
                          console.log("CREATE_DATA_TABLE executed");
                          console.log("INSERT_DATA_TO_TABLE executed");
                        }
                      }
                    );
                  }
                );
              } else {
                database.query(
                  queries.CREATE_DATA_TABLE,
                  [DATABASE_NAME, newTableName, DATABASE_NAME],
                  function (err, result, field) {
                    if (err) {
                      console.error("ERROR EXECUTING CREATE_DATA_TABLE", err);
                      return;
                    }

                    let tuples = lodash
                      .zip(dateData, valueData)
                      .map((row) => [row[0], row[1], indicator_id]);

                    // console.log(tuples);

                    database.query(
                      queries.INSERT_DATA_TO_TABLE,
                      [DATABASE_NAME, newTableName, tuples],
                      function (err, result, field) {
                        if (err) {
                          console.error(
                            "ERROR EXECUTING INSERT_DATA_TO_TABLE",
                            err
                          );
                          return;
                        } else {
                          console.log("CREATE_DATA_TABLE executed");
                          console.log("INSERT_DATA_TO_TABLE executed");
                        }
                      }
                    );
                  }
                );
              }
            }
          );
          //IF EXISTS CHECK UPDATE TIME AND IF NOT MATCH ADD
          //result[0][4] returns lastUpdatedTime in the existing catalog
        } else {
          // console.log("Last Updated :" + catalogQueryResult[0].last_updated_time);
          // console.log("Today : " +  lastUpdatedTime);

          if (catalogQueryResult[0].last_updated_time != lastUpdatedTime) {
            database.query(
              queries.UPDATE_CATALOG,
              [
                DATABASE_NAME,
                lastUpdatedTime,
                catalogQueryResult[0].indicator_id,
              ],
              function (err, result, field) {
                if (err) {
                  console.error("ERRER executing UPDATE_CATALOG", err);
                  return;
                } else {
                  console.log("A DUPLICATE DATA EXISTS AND CATALOG IS UPDATED");
                  database.query(
                    queries.TRUNCATE_TABLE,
                    [DATABASE_NAME, newTableName],
                    function (err, result, field) {
                      if (err) {
                        console.error("ERRER executing TRUNCATE_TABLE", err);
                        return;
                      } else {
                        console.log(
                          "A TABLE IS TRUNCATED AND ADDING NEW TABLE"
                        );

                        let tuples = lodash
                          .zip(dateData, valueData)
                          .map((row) => [
                            row[0],
                            row[1],
                            catalogQueryResult[0].indicator_id,
                          ]);

                        database.query(
                          queries.INSERT_DATA_TO_TABLE,
                          [DATABASE_NAME, newTableName, tuples],
                          function (err, result, field) {
                            if (err) {
                              console.error(
                                "ERROR executing INSERT_DATA_TO_TABLE",
                                err
                              );
                              return;
                            } else {
                              console.log("DATA UPDATED");
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  } else {
    console.log("Does not have access to database");
  }
}

export function sendEiaDataToRds() {}

/**
 *
 * @param {string} tag
 * @returns {Array<{date, double}>} a list of (date, value)
 */

export function getDataFromRDS(json) {
  // const fredTagsArray = Object.values(fredDataList);
  //Modify this code everytime you add source
  const source = json.use;
  const tag = json.tag;
  //this may or may not exist depending on routes
  const subcategory = json.subcategory;

  // /chart/featured, ratio, bonds, bank, fed case
  // 'eia', 'cftc category is different
  if (chartCategoryList.includes(source)) {
    let list = [];

    if (source == "featured") {
      list = featuredList;
    } else if (source == "ratio") {
      list = ratioList;
    } else if (source == "bonds") {
      list = bondsList;
    } else if (source == "macro") {
      list = macroList;
    } else if (source == "bank") {
      list = bankList;
    } else if (source == "fed") {
      list = fedList;
    }

    return new Promise((resolve, reject) => {
      // for (let feature of list) {

      const feature = list.filter(({ urlendpoint }) => urlendpoint === tag)[0];

      let title = feature.title;
      let tags = feature.tag;
      let use = feature.use;
      let source = feature.source;
      let adjustment = feature.adjustment;
      let chartToCreate = feature.chartToCreate;
      let chartToCreateName = feature.chartToCreateName;
      let frequency = feature.frequency;
      let transformation = feature.transformation;
      let aggregation = feature.aggregation;
      let chartMethod = feature.chartMethod;
      let units = feature.units;
      let newUnits = feature.newUnits;
      let adjustYaxis = feature.adjustYaxis;
      let comparisonChartName = feature.comparisonChartName;
      let chartNames = [];
      let promises = []; // Array to store the promises
      let result = {};

      for (let i = 0; i < Object.keys(frequency).length; i++) {
        //When you use same data but with different format etc,
        // tag object in list.js does not allow duplicate

        let j = i;
        // if(Object.keys(tags).length < Object.keys(frequency).length){
        //   j = 0;
        // }
        let tag_instance = tags[i];

        let source_instance = source[i];
        let frequency_instance = frequency[i];
        let transformation_instance = transformation[i];
        let aggregation_instance = aggregation[i];

        let tableName;

        //CFTC data does not use "w_lin_avg format"
        if (source_instance != "CFTC") {
          tableName =
            tag_instance +
            "_" +
            frequency_instance +
            "_" +
            transformation_instance +
            "_" +
            aggregation_instance;
        } else {
          tableName = tag_instance;
        }

        chartNames.push(tag_instance);

        let promise = new Promise((resolve, reject) => {
          database.query(
            queries.SELECT_ALL_ROWS_FROM_TABLE,
            [source_instance, tableName],
            (error, results) => {
              if (error) {
                console.log(error);
                reject(error.stack);
              } else {
                resolve(results);
              }
            }
          );
        });

        promises.push(promise); // Add the promise to the array
      }

      let namesForTag = [];
      for (let i = 0; i < tags.length; i++) {
        if (source[i] == "FRED") {
          let tag = tags[i];

          const nameForTag = Object.entries(fredDataList).filter(
            ([key, value]) => value === tag
          );

          namesForTag.push(nameForTag[0][0]);
        } else {
          namesForTag.push(tags[i]);
        }
      }
      // Await the resolution of all promises using Promise.all()
      Promise.all(promises)
        .then((chain) => {
          //for some reason result.data returns [] on the client side

          result.values = chain;
          result.title = title;
          result.use = use;
          // result.names = chartNames;
          result.names = tags;
          result.namesForTag = namesForTag;
          result.chartToCreateName = chartToCreateName;
          result.chartMethod = chartMethod;
          result.adjustYaxis = adjustYaxis;
          result.frequency = frequency;
          result.transformation = transformation;
          result.aggregation = aggregation;
          result.chartToCreate = chartToCreate;
          result.adjustment = adjustment;
          result.units = units;
          result.newUnits = newUnits;
          result.comparisonChartName = comparisonChartName;

          // Here, you have an array of resolved results from all the promises
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //if client is looking for oil page(which needs to fetch all graphs under EIA)
  //@TODO - fix source in mysqlrequest where it is name is database_name or fix this
  else if (source == "EIA") {
    //edge case for DUC, since it has unusual table name in mysql database

    if (
      subcategory == "DUC" ||
      subcategory == "completed" ||
      subcategory == "drilled"
    ) {
      return new Promise((resolve, reject) => {
        // let jsonDUCDataArrays = [];

        // Create an array of promises that fetch the data for each region
        let promises = eiaDUCList.map((region) => {
          let tableName = region;

          return new Promise((resolve, reject) => {
            database.query(
              queries.SELECT_ALL_ROWS_FROM_TABLE,
              [source, tableName],
              (err, rows) => {
                if (err) {
                  console.log(
                    `Error fetching rows from ${tableName}: ${err.stack}`
                  );
                  reject(err);
                  return;
                }
                //rather than putting it in array just return as a promise
                resolve(rows);
              }
            );
          });
        });

        // Wait for all promises to resolve before resolving the overall promise
        Promise.all(promises)
          .then((promise) => {
            let result = {};
            result.values = promise;
            result.names = eiaDUCList;
            result.tag = tag;
            
            resolve(result);
          })
          .catch((error) => {
            console.log(`Error fetching data: ${error.stack}`);
            reject(error);
          });
      });
    }

    //@TODO - automate process of choosing weekly/4weekavg. For now, defualt value is 4weekavg.
    
    else if (EIAPetroleumSubCategoryList.includes(subcategory)) {

      let frequency = (subcategory == "demand") ? "4wavg" : "w";
      let transformation = "lin";
      let aggregation = "avg";
      let units = [];
      let EIAPetroleumTag = (subcategory == "demand") ? EIAPetroleumFourWeekAvgDemandTags 
      : (subcategory == "export") ? EIAPetroleumExportTags 
      : (subcategory == "import") ? EIAPetroleumImportTags
      : null; 
      let EIAPetroleumList = (subcategory == "demand") ? EIAPetroleumFourWeekAvgDemandList
      : (subcategory == "export") ? EIAPetroleumExportList
      : (subcategory == "import") ? EIAPetroleumImportList
      : null;
      

      return new Promise((resolve, reject) => {
        let promises = EIAPetroleumTag.map(
          (tag) => {

            let tableName =
              tag +
              "_" +
              frequency +
              "_" +
              transformation +
              "_" +
              aggregation;
          
            database.query(
              queries.SELECT_UNITS_FROM_CATALOG,
              [source, tag, frequency, transformation, aggregation],
              (error, results) => {
                
                if (error) {
                  console.log(error.stack);
                }
              
                //result returns [ { units: 'MBBL/D' } 
                units.push(results[0].units);
               
              }
            );

            return new Promise((resolve, reject) => {
              database.query(
                queries.SELECT_ALL_ROWS_FROM_TABLE,
                [source, tableName],
                (err, rows) => {
                  if (err) {
                    console.log(
                      `Error fetching rows from ${tableName}: ${err.stack}`
                    );
                    reject(err);
                    return;
                  }
                  //rather than putting it in array just return as a promise
                  resolve(rows);
                }
              );
            });
          }
        );

        Promise.all(promises)
          .then((promise) => {
            let result = {};
            result.values = promise;
            result.names = EIAPetroleumList;
            result.tag = tag;
            result.units = units;

            resolve(result);
          })
          .catch((error) => {
            console.log(`Error fetching data: ${error.stack}`);
            reject(error);
          });
      });
    }

    // return new Promise((resolve, reject) => {
    //   let indicators;
    //   let assetType = tag;
    //   let jsonOilDataArrays = {};
      // database.query(
      //   queries.SELECT_ALL_INDICATOR_ROWS_BY_ASSET_TYPE,
      //   [source, assetType],
      //   (error, results) => {
      //     if (error) {
      //       console.log(error.stack);
      //     }
      //     indicators = results;
      //     // console.log(indicators);
      //   }
      // );

    //   database.query(queries.SHOW_ALL_TABLES, source, (error, tables) => {
    //     if (error) {
    //       console.error("Error fetching tables: " + error.stack);
    //       reject(error);
    //       return;
    //     }
    //     const promises = tables.map((table) => {
    //       const tableName = table["Tables_in_EIA"];

    //       return new Promise((resolve, reject) => {
    //         database.query(
    //           queries.SELECT_ALL_ROWS_FROM_TABLE,
    //           [source, tableName],
    //           (err, rows) => {
    //             if (err) {
    //               console.log(
    //                 `Error fetching rows from ${tableName}: ${err.stack}`
    //               );
    //               reject(err);
    //               return;
    //             }

    //             // Add the rows data to the jsonOilDataArrays object
    //             jsonOilDataArrays[tableName.split("_")[0]] = rows;
    //             resolve();
    //           }
    //         );
    //       });
    //     });

    //     Promise.all(promises)
    //       .then(() => {
    //         resolve({ jsonOilDataArrays, indicators });
    //       })
    //       .catch((error) => {
    //         console.log(`Error fetching data: ${error.stack}`);
    //         reject(error);
    //       });
    //   });
    // });
  } else if (source == "CFTC") {
    return new Promise((resolve, reject) => {
      let indicators;
      let assetType = tag;

      let jsonCFTCDataArrays = {};

      database.query(
        queries.SELECT_ALL_INDICATOR_ROWS_FROM_SOURCE,
        source,
        (error, results) => {
          if (error) {
            console.log(error.stack);
          }
          indicators = results;
        }
      );

      database.query(queries.SHOW_ALL_TABLES, source, (error, tables) => {
        if (error) {
          console.error("Error fetching tables: " + error.stack);
          reject(error);
          return;
        }

        const promises = tables.map((table) => {
          const tableName = table["Tables_in_CFTC"];

          return new Promise((resolve, reject) => {
            database.query(
              queries.SELECT_ALL_ROWS_FROM_TABLE,
              [source, tableName],
              (err, rows) => {
                if (err) {
                  console.log(
                    `Error fetching rows from ${tableName}: ${err.stack}`
                  );
                  reject(err);
                  return;
                }

                // Add the rows data to the jsonCFTCDataArrays object
                jsonCFTCDataArrays[tableName.split("_")[0]] = rows;
                resolve();
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            resolve({ jsonCFTCDataArrays, indicators });
          })
          .catch((error) => {
            console.log(`Error fetching data: ${error.stack}`);
            reject(error);
          });
      });
    });
  }
  //or else just fetch one graph

  return new Promise((resolve, reject) => {
    database.query(
      `SELECT COUNT(*) FROM catalog.${source} WHERE tag = '${json.tag}' AND  frequency = '${json.frequency}' AND transformation = '${json.transformation}' AND aggregation = '${json.aggregation}';`,
      function (err, result, field) {
        if (err) {
          return;
        }

        if (result[0]["COUNT(*)"] == 1) {
          var fetchDataQuery = `SELECT * from FRED.${json.tag}_${json.frequency}_${json.transformation}_${json.aggregation}`;
          database.query(fetchDataQuery, (err, results) => {
            if (err) {
              reject(err);
              return;
            }

            resolve(results);
          });
        } else {
          reject(new Error("Data does not exists in Catalog table."));
        }
      }
    );
  });
}

export default router;
