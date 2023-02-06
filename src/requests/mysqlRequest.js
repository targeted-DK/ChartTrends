
// const database = require('../config/database');
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import database from'../js/config/Database/serverConnection.js';
import json from 'express';
import lodash from 'lodash';
router.use(bodyParser.json());

router.post('/mysqlRequest', (req, res) => {
    console.log("Making a mysql request");
    mappedDataForRds = getGraphInfo(req.body);
    // console.log(req.body);
    // console.log(graphDataForRds);
    // console.log(mappedDataForRds.code);
    // Send a response
    // res.send({ message: 'Data received' });
    sendDataToRDS(mappedDataForRds);


});

router.get('/mysqlRequest', (req, res)=>{
    var code = req.query.data;
    console.log("Making a mysql request");
    var data; 
    getDataFromRDS(code)
    .then(results => {
    //  console.log(results);
      // console.log(JSON.stringify(parsedData[0]));
      const data = results;

      console.log("Data fetched from RDS");
    // console.log(data);
      //  console.log(JSON.stringify(data));
       res.send(JSON.stringify(data));
    })
    .catch(error => {
      // console.log(error);
      throw error;
     
    });
   
   
    // fetchData = req

})
/**
 * 
 * @param {list} mappedDataForRds - includes a fred tag, and a list of [date, value]
 * 
 */
export function sendDataToRDS(mappedDataForRds){
  console.log("Sending data to RDS");

  // SQL statement for the UPSERT operation
  var table_name = mappedDataForRds.code;
  const dateData = mappedDataForRds.date;
  const valueData = mappedDataForRds.value;
  const originalDataSize = dateData.length;
 
  // var checkTableQuery = `CREATE TABLE IF NOT EXISTS TEST3 (date DATE, value DOUBLE)`;
  // var tuple = dateData.map((date, value) => [date, value[date]]);
  const tuples = lodash.zip(dateData, valueData);
 
  // var insertDataQuery = `INSERT INTO ${table_name} (date, value) VALUES ?;`
  // const checkAndUpdateTableSql = `CREATE TABLE IF NOT EXISTS ${table_name} (date DATE, value DOUBLE);` +
  // `SELECT COUNT(*) FROM ${table_name};`
  let createTableQuery = `CREATE TABLE IF NOT EXISTS ${table_name} (date DATE, value DOUBLE)`;
  let checkTableQuery = `SELECT * FROM ${table_name}`;
  let insertDataQuery = `INSERT INTO ${table_name} (date, value) VALUES ?`;
  if (database.authorized) {
    //   database.query(createTableQuery, function (err, results, fields) {
    //     // Table exists
    //     let countRows = `SELECT COUNT(*) AS numRows FROM ${table_name}`;
    //     database.query(countRows, function(err, result) {
    //       if (err) throw err;
  
    //       if (result[0].numRows < originalDataSize) {
    //         // Update new data into table
    //         console.log("number of rows in the original data is " + result[0].numRows);
    //         database.query(insertDataQuery, tuples, function(err, result) {
    //           if (err) throw err;
    //           console.log('Data is updated to the table');
    //         });
    //       } else {
    //         console.log('The Data is already up-to-date');
    //       }
    //     });
       

    // });

     // Table does not exist
     database.query(createTableQuery, function(err, result) {
      if (err) throw err;
      console.log('Table created');
      database.query(insertDataQuery, [tuples], function(err, result) {
        if (err) throw err;
        console.log('Data inserted into table');
      });
      console.log('data exists in database');
    });
  

  }
}

// connection.end();
/**
 * 
 * @param {string} tag 
 * @returns {Array<{date, double}>} a list of (date, value)
 */
export function getDataFromRDS(tag){

  return new Promise((resolve, reject) =>{
    var fetchDataQuery = `SELECT * from ${tag}`;
    database.query(fetchDataQuery, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  
}

/**
 * Converts JSON object into a list of lists.
 * @param {JSON} JSON Object 
 * @returns {Array<{date, value}>} a list of {date, value}
 */

export function getGraphInfo(jsonObject){

    var newGraphObj = {};
    newGraphObj.code = jsonObject.code;
    newGraphObj.date = jsonObject.observations.map(data => data["date"]);
    newGraphObj.value = jsonObject.observations.map(data => data["value"]);

    return newGraphObj;
}


// function checkDupInRds(graphData){

// }
export default router;