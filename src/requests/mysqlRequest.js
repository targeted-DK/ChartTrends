
// const database = require('../config/database');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { nextTick } = require('process');

router.use(bodyParser.json());

// config.js
var mysql = require('mysql2');

// const dbConfig = {
//     host: 'rdsdbchartweb.cabtxszlvlkn.ap-northeast-2.rds.amazonaws.com',
//     port: '3306',
//     user: 'admin',
//     password: 'kim76050162',
//     database: 'rdsdbchartweb'
//   };
 
// Database Configurations
// const pool = mysql.createPool(config);
// Used pool.end() to close connections


// router.get('/mysqlRequest', (req, res) => {
//     console.log("test");
// });
var graphDataForRds;
    

router.post('/mysqlRequest', (req, res) => {
    console.log("in mysql freqile");
    graphDataForRds = getGraphInfo(req.body);

    // sendDataToRDS(graphDataForRds);
    // Send a response
    // res.send({ message: 'Data received' });

   
});

function sendDataToRDS(graphDataForRds){
    const connection = mysql.createConnection(dbConfig);
    connection.on();
    connection.query(
        'INSERT INTO Test SET ?',
        graphDataForRds,
        (error, results) => {
            if (error) throw error;
            console.log("failed");
          }
        );
    
        connection.end();
}




function getGraphInfo(jsonStringObject){

    var newGraphObj = {};
    newGraphObj.date = jsonStringObject.date;
    newGraphObj.value = jsonStringObject.value;
    return newGraphObj;
}

function checkDupInRds(graphData){

}


// connection.connect((err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('Connected to RDS database.');
//   });
  




module.exports = router;
