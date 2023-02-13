import express from 'express';
import cors from 'cors' ;
import path from 'path';
import apiRouter from './js/requests/apiRequest.js';
import mysqlRouter from './js/requests/mysqlRequest.js';
import database from './js/config/Database/serverConnection.js';
import * as mainPageData from './js/MainPageCharts/mainPageData.js';
import drawCharts from './js/MainPageCharts/drawCharts.js';
const app = express();
const router = express.Router();
import list from './static/mainDataList.js'
import { getDataFromRDS } from './js/requests/mysqlRequest.js';
import { refreshDataForMainPage } from './js/requests/apiRequest.js';
import { setTimeout } from 'timers/promises';

// CORS Configurations
app.use(cors({
  origin: '*'
}))

// Route Configurations
app.use(express.static(path.join('/Users/dk/Documents/GitHub/ChartTrends/', 'public')));
// Data Size Limit
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/requests', apiRouter); // for handling requests to the root path
// app.route('/').get(dataSentFromAPI);
app.use('/requests', mysqlRouter);

/**
 * This function runs whenever the webpage is loaded
 * 1) Gets data from mainPageData.js and loads charts on the main webpage using drawCharts.js
 */
function main(){

  for (const kv in list) {
    let fredTag = list[kv];

    getDataFromRDS(fredTag)
    .then((sqlData)=> 
      // drawCharts(sqlData)
      console.log(sqlData)
    )
    .catch(error => {
      console.error(error);
      return error;
    })
    

  
    //draw chart
    // drawCharts.createChart(sqlData);


    //save as image;
    // Do something with obj
  }

};
  
  // refreshDataForMainPage();
  

// Refresh data in the main page every midnight
var currentDate = new Date();
var nextMidnight = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 1,
  0, 0, 0
) - currentDate;


/**
 * Runs every midnight to update data on the main page.
 */
function refreshMainPageEveryMidnight(){
  // console.log("Running code at midnight");
  // var result = mainPageData.refreshDataForMainPage();
  // console.log("test");
  // console.log(result);

}

/**
 * Timer for daily update
 */
setInterval(function(){
  console.log("Running code at midnight");
  var result = mainPageData.refreshDataForMainPage();
  console.log(result);
}, nextMidnight);



/**
 * Client Connection
 */
app.listen(3000, () => {
  console.log('Server listening on port 3000 using parcel');
  main();

});


// 