// import axios from "axios";
// import '../config/env.mjs'
import axios from "axios";
import Series from "./routes/requests/fredAPI/Series.js";
import getGraphInfo from "./filterDataForRDS.js";
import createChart from "./charts/createChart.js";
import cheerio from 'cheerio';
import { getDataFromRDS } from "./routes/requests/mysqlRequest.js";
import { fredDataList } from "./data/dataList.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

/**
 * Modify this list for FRED data on the main page
 *
 * Runs only at midnight for data update
 *
 * Close connection once done for overall database connection performance
 *
 * @todo - add other API functions.
 * @todo - saving unit in mysql
 */
const data = fredDataList;

export async function updateFredDataset() {


  Object.entries(data).forEach(([key, value]) => {  
    const fredRequestInstance = new Series(value);
        fredRequestInstance.getSeriesObservations(value)
        .then(response => {
            let data = response.data.observations;
            data.code = value;
            let filteredData = getGraphInfo(data);
          
            axiosInstance.post('/mysqlRequest', filteredData)
            .then(response =>{
                console.log(value + " " + response.data);
                
            })
            .catch(err => {
                throw err;
            });       
        })  
    });
  }
      //finds a unit for dataset from datatag 
      // const urlToFetchUnits = 'https://fred.stlouisfed.org/series/' + value;
      // await axios.get(urlToFetchUnits)
      // .then(response => {
      //     const $ = cheerio.load(response.data);
      //     const unitsElement = $('p.series-meta-label:contains("Units:")').next('span.series-meta-value').find('span.series-meta-value-units');
      //     const unit = unitsElement.text().trim();
      //     if(!(unit in units)){
      //       units[value] = unit;
      //     }
       
      // })
      // .catch(error => {
      //     // Handle errors
      //     console.error(error);
      // })
      // .then(()=>{
      //   return getGraphInfo(data);
      // })
      
 


export async function createChartForMainPage() {
  Object.entries(data).forEach(async ([key, value]) => {
    await getDataFromRDS(value)
      .then((data) => {
        createChart(data);
      })
      .catch((err) => {
        throw err;
      });
  });
}

export async function getDataFromFred() {
  // let promises = [];
  // let datalist = {};
  // Object.entries(fredDataTags).forEach(([key, value]) => {
  let apiKey = process.env.fredAPIKey;
  let data = await axios
    .get("https://api.stlouisfed.org/fred/releases?api_key=" + apiKey, {
      params: {
        file_type: "json",
      },
    })
    .then(async (response) => {
      console.log("Got data from FRED and saving data to the AWS RDS");
      // console.log(response);
      console.log(response.data.releases[0].data);
    })
    .catch((error) => {
      throw error;
      // throw error;
    });
  // console.log(data);
}

export async function getDataFromTE() {}

// export default fredDataTags;
