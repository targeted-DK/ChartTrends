// import "./config/env.mjs";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors' ;
import path from 'path';
import ejs from 'ejs';
import morgan from 'morgan';
import session from 'express-session';
import apiRouter from './routes/requests/apiRequest.js';
import mysqlRouter from './routes/requests/mysqlRequest.js';
import chartRouter from './routes/chart.js';
import thoughtRouter from './routes/thought.js';
// import database from './js/config/Database/serverConnection.js';
import * as mainPageData from './MainPageCharts/mainPageData.js';
import createChart from './MainPageCharts/drawCharts.js';

// import list from './public/static/mainDataList.js'
// import { getDataFromRDS } from './requests/mysqlRequest.js';
// import { refreshDataForMainPage } from './requests/apiRequest.js';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';


import logger from "./logger.js";
import cookieParser from 'cookie-parser';
const app = express();
const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// CORS Configurations
app.use(cors({
  origin: '*'
}))

// dotenv.config();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session ({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false,
  },
  name : 'session-cookie',
}));
//main page images
app.use(express.static('../public/static/images/'));
//js files
app.use(express.static('../js/'));
//src files
app.use(express.static('../js/MainPageCharts/'));
//router files
app.use(express.static('../js/routes/requests'));

//css middleware
// app.use('/css', express.static(path.join(__dirname, 'public/css'), { type: 'text/css' }));

//engine to run ejs files on client
app.set('views',  path.join(__dirname, 'views/'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//routers
app.use('/chart', chartRouter);
app.use('/thought', thoughtRouter);
app.post('/apiRequest', apiRouter); // for handling requests to the root path
app.post('/mysqlRequest', mysqlRouter);


//main page
app.get('/', function(req, res) {
  res.sendFile('/index.html', {root: path.join(__dirname, '..')});
});

//404 error
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
});


// app.get('/css/dashboard.css', function(req, res) {
//   res.type('text/css');
//   // res.sendFile(__dirname + '/pblic/css/dashboard.css');
// });

/**
 * This function runs whenever the webpage is loaded
 * 1) Gets data from mainPageData.js and loads charts on the main webpage using drawCharts.js
 */
function main(){
  console.log(__dirname);
  // console.log(chartRouter);
  // for (const kv in list) {
  //   let fredTag = list[kv];
  //   getDataFromRDS(fredTag)
  //   .then((sqlData)=> {
  //     createChart(sqlData);
  //   })
  //   .catch(error => {
  //     // console.error(error);
  //     return error;
  //   })
  // }
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
  console.log('Server listening on port 3000');
  main();
});

/**
 * Logs error while running program
 * @todo - FIX
 */
// process.on('uncaughtException', (error) => {
//   console.error('An uncaught exception occurred:', error);
// });

// process.on('unhandledRejection', (error) => {
//   console.error('An unhandled rejection occurred:', error);
// });

// process.on('warning', (warning) => {
//   console.warn('A warning occurred:', warning);
// });

