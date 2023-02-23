// import "./config/env.mjs";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors' ;
import path from 'path';
import ejs from 'ejs';
import morgan from 'morgan';
import session from 'express-session';
import apiRouter from './src/js/routes/requests/apiRequest.js';
import mysqlRouter from './src/js/routes/requests/mysqlRequest.js';
import chartRouter from './src/js/routes/chart.js';
import thoughtRouter from './src/js/routes/thought.js';
import * as mainPageData from './src/js/MainPageCharts/mainPageData.js';
import createChart from './src/js/MainPageCharts/createChart.js';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';
import logger from "./src/js/logger.js";
import cookieParser from 'cookie-parser';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//testing python on child process
import {spawn} from 'child_process';
import bodyParser from 'body-parser';
//testing python
// let data = [1, 2, 3, 4, 5];


// CORS Configurations
app.use(cors({
  origin: '*'
}))

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
//react
app.use(express.static(path.join(__dirname,'/react-app/build')));
//main page images
app.use(express.static('../public/static/'));
//js files
app.use(express.static('../js/'));
//src files
app.use(express.static('../js/MainPageCharts/'));
//router files
app.use(express.static('../js/routes/requests'));
//python files
app.use(express.static('../python'))

//css middleware
// app.use('/css', express.static(path.join(__dirname, 'public/css'), { type: 'text/css' }));

//engine to run ejs files on client
app.set('views',  path.join(__dirname, 'views/'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//routers
app.use('/chart', chartRouter);
app.use('/thought', thoughtRouter);
app.post('/apiRequest', apiRouter); 
app.post('/mysqlRequest', mysqlRouter);

app.post('/analyze', (req, res) => {
  // handle the POST request here
  res.send('POST request received');
});

//main page
app.get('/', function(req, res) {
console.log(process.env.DB_HOST);
  res.sendFile(path.join(__dirname,'/react-app/build/index.html'));
});

//404 error
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
});



/**
 * This function runs whenever the webpage is loaded
 * 1) Gets data from mainPageData.js and loads charts on the main webpage using drawCharts.js
 */
function main(){
  console.log(__dirname);
  // mainPageData.getTagsFromFRED();
  // mainPageData.getDataForMainPage();
  // mainPageData.createChartForMainPage();

};


/**
 * Timer for daily update
 */
function runAtTime(hour, minute, second, callback) {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);
  let delay = target - now;
  if (delay < 0) {
    delay += 24 * 60 * 60 * 1000;
  }
  setTimeout(() => {
    callback();
    setInterval(callback, 24 * 60 * 60 * 1000);
  }, delay);
}

runAtTime(24, 0, 0, () => {
  console.log("Running code at midnight");
  // mainPageData.refreshDataForMainPage();
});



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

