// import "./config/env.mjs";
import dotenv from 'dotenv';
import express from 'express' 
import cors from 'cors' ;
import path from 'path';
import ejs from 'ejs';
import morgan from 'morgan';
import session from 'express-session';
import apiRouter, { getDataFromEIA, getDataFromFRED } from './src/js/routes/requests/apiRequest.js';
import mysqlRouter from './src/js/routes/requests/mysqlRequest.js';
import chartRouter from './src/js/routes/chart.js';
import articleRouter from './src/js/routes/articleList.js';
import saveArticleRouter from './src/js/routes/saveArticle.js';
import articleListRouter from './src/js/routes/articleList.js';
import runPythonRouter from  './src/js/routes/runPython.js'
import * as processData from './src/js/processData.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import schedule from 'node-schedule'
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

//testing python on child process
import {spawn} from 'child_process';
import bodyParser from 'body-parser';
import bondsList from './src/js/data/bondsList.js';
import ratioList from './src/js/data/ratioList.js';
import macroList from './src/js/data/macroList.js';
import dataList, { cftcList, eiaDUCList, eiaDataNGList, eiaDataOilList, eiaDataPetroleumList, fredDataList } from './src/js/data/dataList.js';
import bankList from './src/js/data/bankList.js';
import featuredList from './src/js/data/featuredList.js';


//disable cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

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

//cache

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

app.use(express.static('public'));

app.post('/saveImage', (req, res) => {
  console.log("client side")
  const imageData = req.body.imageData.replace(/^data:image\/png;base64,/, '');
  fs.writeFile('./public/static/images/chart.png', imageData, 'base64', (err) => {
      if (err) {
          console.log('Error: ', err);
          res.sendStatus(500);
      } else {
          console.log('Successfully saved image');
          res.sendStatus(200);
      }
  });
});

app.get('/getSearchBarList', (req, res) => {
  console.log("getting data from backend");

  const filteredNames = {
    fredDataList: dataList.fredDataList,
    featuredList : featuredList.map(({ title, urlendpoint }) => ({ title, urlendpoint })),
    macroList : macroList.map(({ title, urlendpoint }) => ({ title, urlendpoint })),
    ratioList :ratioList.map(({ title, urlendpoint }) => ({ title, urlendpoint })),
    bondsList : bondsList.map(({ title, urlendpoint }) => ({ title, urlendpoint })),
    bankList : bankList.map(({ title, urlendpoint }) => ({ title, urlendpoint })),
}
  
  res.status(200).send(filteredNames);


})


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
  const job = schedule.scheduleJob('0 0 0,12 * *', updateEntireDatabase);
  updateEntireDatabase();
  // processData.convertCopperCSVToJson();
// await processData.updateFredDatasettemp();

};

async function updateEntireDatabase(){
  // await processData.getDUCDataset();
  // await processData.updateFredDatasettemp();
  // await processData.updateNDLDataset();
  // // await processData.getShillerDataset();
  // // await processData.getBakerHughesDataset();
  // await processData.convertCopperCSVToJson();
  await processData.updateFredDataset();
  // await processData.updateCFTCDataset();
  // await processData.updateEIADataset();
}


/**
 * Client Connection
 */

const IP_ADDRESS = '0.0.0.0'; // Listen on all IP addresses
const PORT = 3000; // Port number
app.listen(PORT, IP_ADDRESS, () => {
  console.log('Server listening on port ' + PORT);
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

