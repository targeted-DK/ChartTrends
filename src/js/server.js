import express from 'express';
import cors from 'cors' ;
import path from 'path';
import apiRouter from './requests/apiRequest.js';
import mysqlRouter from './requests/mysqlRequest.js';
// import database from './js/config/Database/serverConnection.js';
import * as mainPageData from './MainPageCharts/mainPageData.js';
import createChart from './MainPageCharts/drawCharts.js';
const app = express();
const router = express.Router();
import list from '../static/mainDataList.js'
import { getDataFromRDS } from './requests/mysqlRequest.js';
import { refreshDataForMainPage } from './requests/apiRequest.js';
import { setTimeout } from 'timers/promises';
// your other modules
import logger from "./logger.js";

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

app.get('/:id', function(req, res) {
  // Render the product page with the specified ID
  res.render('product', { id: req.params.id });
});

/**
 * This function runs whenever the webpage is loaded
 * 1) Gets data from mainPageData.js and loads charts on the main webpage using drawCharts.js
 */
function main(){

  for (const kv in list) {
    let fredTag = list[kv];
    getDataFromRDS(fredTag)
    .then((sqlData)=> {
      createChart(sqlData);
    })
    .catch(error => {
      // console.error(error);
      return error;
    })
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

/**
 * Logs error while running program
 * @todo - FIX
 */
process.on('uncaughtException', (error) => {
  console.error('An uncaught exception occurred:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('An unhandled rejection occurred:', error);
});

process.on('warning', (warning) => {
  console.warn('A warning occurred:', warning);
});

