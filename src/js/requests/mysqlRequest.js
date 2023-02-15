
// const database = require('../config/database');
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import database from '../config/Database/serverConnection.js';
import json from 'express';
import lodash from 'lodash';
import { exit } from 'process';
router.use(bodyParser.json());

router.post('/mysqlRequest', (req, res) => {
  console.log("3");

  var mappedDataForRds = getGraphInfo(req.body);
  // console.log(mappedDataForRds);
  // console.log(mappedDataForRds);
  // console.log(req.body);
  // console.log(graphDataForRds);
  // console.log(mappedDataForRds.code);
  // Send a response
  sendDataToRDS(mappedDataForRds);

  res.send({ message: "POST request to mysqlRequest.js succeeded" });
});

router.get('/mysqlRequest', (req, res) => {
  var code = req.query.data;
  let data = getDataFromRDS(code);
  res.send(data);
  // getDataFromRDS(code)
  // .then(results => {
  // //  console.log(results);
  //   // console.log(JSON.stringify(parsedData[0]));
  //   const data = results;

  //   console.log("Data fetched from RDS");
  // // console.log(data);
  //   //  console.log(JSON.stringify(data));
  //    res.send(JSON.stringify(data));
  // })
  // .catch(error => {
  //   // console.log(error);
  //   throw error;

  // });
})


/**
 * 
 * @param {list} mappedDataForRds - includes a fred tag, and a list of [date, value]
 * 
 */
export async function sendDataToRDS(mappedDataForRds) {
  console.log("Sending data to RDS");

  // SQL statement for the UPSERT operation
  let table_name = mappedDataForRds.code;
  let dateData = mappedDataForRds.date;
  let valueData = mappedDataForRds.value;
  let originalDataSize = dateData.length;

  // var checkTableQuery = `CREATE TABLE IF NOT EXISTS TEST3 (date DATE, value DOUBLE)`;
  // var tuple = dateData.map((date, value) => [date, value[date]]);
  let tuples = lodash.zip(dateData, valueData);

  // var insertDataQuery = `INSERT INTO ${table_name} (date, value) VALUES ?;`
  // const checkAndUpdateTableSql = `CREATE TABLE IF NOT EXISTS ${table_name} (date DATE, value DOUBLE);` +
  // `SELECT COUNT(*) FROM ${table_name};`
  let createTableQuery = `CREATE TABLE IF NOT EXISTS ${table_name} (id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY, date DATE, value DOUBLE);`;
  let countQuery = `SELECT id FROM ${table_name} ORDER BY id DESC LIMIT 1`;
  let insertDataQuery = `INSERT INTO ${table_name} (date, value) VALUES ?`;
  
  let resetQuery = `TRUNCATE TABLE ${table_name}`
  if (database.authorized) {
    // Table does not exist
    database.query(resetQuery, function (err, result, fields) {
    database.query(createTableQuery, function (err, result, fields) {

      //If table does exist
      // console.log(result);
      // if (result.warningStatus != 0) {
       
      //   let count;
      //   database.query(countQuery, function (error, results, fields) {
      //     // console.log(result);
      //     console.log("count returned by query" + results[0].id);
      //     count = results[0].id;
      //     // console.log(count);
      //     // console.log('The last auto-incrementing ID is: ', results[0].id);
      //   });
      //   console.log("count in rds" + count);
      //   console.log("tuple length" + tuples.length);
      //   if (count == tuples.length) {
      //     console.log("Duplicate table exists");
      //     return;
      //   }
       
      // }
      //if there is some issue with the query OR table exists;
      console.log("Table created");
      database.query(insertDataQuery, [tuples], function (err, result, fields) {
  
        console.log("Data Inserted");
      });
    });
  });
    // if (err){
    //   console.log("Table is created but the data is not added to the RDS");
    // }



    // if (err) {
    //   console.log("Table already exists");
    //   exit();
    // }
    // console.log('Table created');
    // console.log('Data inserted into table');
    // database.query(insertDataQuery, [tuples], function(err, result) {
    //   if (err){
    //     console.log("Table is created but the data is not added to the RDS");
    //   }

    // });

      
  } else {
    console.log("Does not have access to database");
  }
  // database.end();
}



/**
 * 
 * @param {string} tag 
 * @returns {Array<{date, double}>} a list of (date, value)
 */
export function getDataFromRDS(fredTag) {
  return new Promise((resolve, reject) => {
    var fetchDataQuery = `SELECT * from ${fredTag}`;
    database.query(fetchDataQuery, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      if (!results) {
        reject(new Error("No results returned from the database query"));
        return;
      }
      results.tag = fredTag;
      resolve(results);
    });
  });
}

/**
 * Converts JSON object into a list of lists.
 * @param {JSON} JSON Object 
 * @returns {Array<{date, value}>} a list of {date, value}
 */

export function getGraphInfo(jsonObject) {
  var newGraphObj = {};
  newGraphObj.code = jsonObject.code;
  newGraphObj.date = jsonObject.observations.map(data => data["date"]);
  newGraphObj.value = jsonObject.observations.map(data => data["value"]);
  return newGraphObj;
}


// function checkDupInRds(graphData){

// }
export default router;