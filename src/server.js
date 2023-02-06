import express from 'express';
import cors from 'cors' ;
import path from 'path';
const app = express();
const router = express.Router();
import apiRouter from './requests/apiRequest.js';
import mysqlRouter from './requests/mysqlRequest.js';
import database from './js/config/Database/serverConnection.js';
import { setTimeout } from 'timers/promises';
import * as refreshData from './js/MainPageCharts/mainPageData.js';
import readline from 'readline';
// import loadMainPageData from './js/MainPageCharts/mainPageData

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
  console.log("Running code at midnight");
  var result = refreshData.refreshDataForMainPage();
  // console.log(result);
}

/**
 * Timer for daily update
 */
setInterval(function(){
  console.log("Running code at midnight");
  var result = refreshData.refreshDataForMainPage();
  console.log(result);
}, nextMidnight);



/**
 * Client Connection
 */
app.listen(3000, () => {
  console.log('Server listening on port 3000 using parcel');
  refreshMainPageEveryMidnight();

});


