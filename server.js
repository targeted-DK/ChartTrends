// import "./config/env.mjs";
import dotenv from 'dotenv';
import express from 'express' 
import cors from 'cors' ;
import path from 'path';
import ejs from 'ejs';
import morgan from 'morgan';
import session from 'express-session';
import { PythonShell } from 'python-shell';
import apiRouter, { getDataFromEIA, getDataFromFRED } from './src/js/routes/requests/apiRequest.js';
import mysqlRouter from './src/js/routes/requests/mysqlRequest.js';
import chartRouter from './src/js/routes/chart.js';
import articleRouter from './src/js/routes/articleList.js';
import saveArticleRouter from './src/js/routes/saveArticle.js';
import articleListRouter from './src/js/routes/articleList.js';
import runPythonRouter from  './src/js/routes/runPython.js'
import * as processData from './src/js/processData.js';
import createChart from './src/js/charts/createChart.js';
import { setTimeout } from 'timers/promises';
import { fileURLToPath } from 'url';
import logger from "./src/js/logger.js";
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

//testing python on child process
import {spawn} from 'child_process';
import bodyParser from 'body-parser';
import makeRequest from './src/js/makeRequest.js';
import Series from './src/js/routes/requests/fredAPI/Series.js';
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
// app.use(express.static(path.join(__dirname,'/react-app/build')));
//main page images
app.use(express.static('./public/'));
app.use(express.static('./public/static/js/'));
app.use(express.static('./public/static/images/'));
app.use(express.static('./dist/'))



// //js files
// app.use(express.static('./src/js'));
// //src files
app.use(express.static('./src/js'));
app.use(express.static('./src/css'));
// //router files
app.use(express.static('./src/js/routes'));
app.use(express.static('./src/js/data'));
// //python files
// app.use(express.static('./src/python'))

//css middleware
// app.use('/css', express.static(path.join(__dirname, 'public/css'), { type: 'text/css' }));

//engine to run ejs files on client
app.set('views',  path.join(__dirname, './public/static/views/'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//routers
app.use('/chart', chartRouter);
app.use('/article', articleRouter);
app.use('/saveArticle', saveArticleRouter);
app.use('/articleList', articleListRouter);
app.post('/mysqlRequest', mysqlRouter);
app.get('/mysqlRequest', mysqlRouter);
app.post('/apiRequest', apiRouter); 
app.use('/runPython', runPythonRouter);

app.post('/analyze', (req, res) => {
  // handle the POST request here
  res.send('POST request received');
});

//main page
app.get('/', function(req, res) {
console.log(process.env.DB_HOST);
res.sendFile(path.join(__dirname,'src/index.html'));
main();
});

//404 error
app.get('*',function(req, res, next){
  res.status(404).render(path.join(__dirname, './public/static/views/404.ejs'));
});


/**
 * This function runs whenever the webpage is loaded
 * 1) Gets data from mainPageData.js and loads charts on the main webpage using drawCharts.js
 */
async function main(){
  // updateEntireDatabase();
  // processData.getDUCDataset();
  // processData.updateFredDatasettemp();
  // processData.updateNDLDataset();
  // processData.getShillerDataset();
  // processData.getBakerHughesDataset();
  // await processData.updateFredDataset();
  // await processData.updateEIADataset();
  // let test = new Series('RRPONTSYD', 'lin', 'd', 'avg');
  // console.log(test);
  // await processData.updateCFTCDataset();
  // const apiKey = process.env.eiaAPIKey;
  // console.log(apiKey);
  // axios.get(`https://api.eia.gov/v2/petroleum/crd/drill/data/?frequency=monthly&data[0]=value&facets[series][]=E_ERTRRO_XR0_NUS_C&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000&api_key=${apiKey}`)
  // .then(response => {
  //   console.log(response.data.response);
  // });
  
  // let dd =   await test.getSeriesObservations()
  // console.log(dd);
  // runPython();


  // processData.updateFredSeriesObservations();
  // processData.createChartForMainPage();
  // getDataFromFRED('DGS10');
};

async function updateEntireDatabase(){
  await processData.getDUCDataset();
  // await processData.updateFredDatasettemp();
  await processData.updateNDLDataset();
  await processData.getShillerDataset();
  // await processData.getBakerHughesDataset();
  await processData.updateFredDataset();
  await processData.updateEIADataset();
}


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
 
});



/**
 * Client Connection
 */
app.listen(3000, () => {
  console.log('Server listening on port 3000');
  main();
  // mainPageData.refreshDataForMainPage();
  // app.get('/apiRequest')
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

