//two kinds of data source : 
import Fred from 'node-fred';
const fred = new Fred(process.env.fredAPIKey);
import axios from 'axios';
import express from 'express';
import cheerio from 'cheerio';
// import te from 'tradingeconomics';
import {fredDataList } from '../../data/dataList.js';
const router = express.Router();
import url from 'url'
const data = fredDataList;

// Key-Value (Name, fredCode) pairs of data need on the main page.


/**
 * Modify this list for FRED data 
 * 
 * Runs only at midnight for data update
 * 
 * Close connection once done for overall database connection performance
 * 
 * @todo add other API functions.
 */

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });


var fetchedData = "";
/**
 * Sends a list of [date, value] and a fred tag mysqlRequst.js
 */ 
router.post('/apiRequest', (req, res) => {
    console.log("Listening a request from index.js at apiRequest Router");
    const query = req.body.data;
    //index given data name in a fredCodeList
    // console.log(fredDataTags[query]);
    getDataFromFRED(data[query]);
    res.send({ message: "Data fetched and added to the RDS." });
    // axios.get('https://api.stlouisfed.org/fred/series/observations', {
    // params: {
    //     series_id: 'DGS10',
    //     api_key: APIKeys.fredAPIKey,
    //     observation_start : "",
    //     observation_end : "",
    //     file_type: 'json'}
    // })
    // //If get() is successful, check if data exists in the database.
    // //If it exists but the same, exit.
    // //If it exists but data is different or does not exist, then update. -> not implemented yet.
    
    // .then(apiRes => {
    //   apiRes.data.code = 'DGS10';
    //   axios.post('http://localhost:3000/requests/mysqlRequest', apiRes.data)

    //   .then(response => {   
    //   })

    //   .catch(error => {
    //     console.error(error);
    //   });
    // })

    // .catch(error => {
    //     throw error;
    // });
})


/**
 * S&P500 uses NASDAQ DATA LINK, and the others use FRED.
 * 
 * @returns  {{data1: Array<{date: string, value: number}>, data2: Array<Array<{date: string, value: number}>>}}
 * 
 * S&P500 data series, and four different data series to compare with S&P500
 */
export async function refreshDataForMainPage(){
    // const snpData = await getSNPDataFromNASDAQ(); 
    // var dataList = getDataFromFRED(fredDataTags);
    // console.log(dataList);
  
    // return dataList;
    // return dataList;
    return;
}

/**
 * @returns {{data1: Array<{date: string, value: number}>}} a list of {date, value}
 * 
 * Uses NASDAQ Data Link for historical S&P 500 data dating back 100 years ago. FRED only provides from 2013.
 * 
 * Don't overuse this call - Free account limits 50 calls a day.
 */ 
export async function getSNPDataFromNASDAQ(){
   return await axios.get('https://data.nasdaq.com/api/v3/datasets/MULTPL/SP500_REAL_PRICE_MONTH.json?',
    {
        params : {
            API_KEY : process.env.nasdaqAPIKey,
        }
    })
    .then((response) => {
        //To access NASDAQ DATA LINK data, use response.data.dataset
        var name = response.dataset.name;
        var description = response.dataset.description;
        var data = response.dataset.data;
        // console.log(data);
        return data;
      })
      .catch((error) => {
       throw error;
    });
}

/**
 * @param {Array<{name: string, tag:string}>} fredDataTags 
 * 
 * @returns {Array<Array<{date: string, value: number}>>} list of series data
 * 
 * @todo modifying params of API call from the client side or using node-fred API
 * @todo fix this shit - async issue with foreach.
 */
export async function getDataFromFRED(fredDataTag){
    // let promises = [];
    // let datalist = {};
    // Object.entries(fredDataTags).forEach(([key, value]) => {  

    const urlString = 'http://api.stlouisfed.org/fred/series/observations';
    const urlObject = url.parse(urlString);
    
    console.log(urlObject);
    let data = await axios.get('http://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: fredDataTag,
                api_key: process.env.fredAPIKey,
                file_type: 'json'}
            })
            .then(async response =>{
                console.log('Got data from FRED and saving data to the AWS RDS');
                const temp = await response.data;
                const urlToFetchUnits = 'https://fred.stlouisfed.org/series/' + fredDataTag;
             

                await axios.get(urlToFetchUnits)
                .then(response => {
                    const $ = cheerio.load(response.data);
                    const unitsElement = $('p.series-meta-label:contains("Units:")').next('span.series-meta-value').find('span.series-meta-value-units');
                    const unit = unitsElement.text().trim();
                    console.log(unit);
             
                    temp.unit = unit;
                })
                .catch(error => {
                    // Handle errors
                    console.error(error);
                  });
               
                temp.code = fredDataTag;
               
                // console.log(temp);
                let mysqlRes = await axiosInstance.post('http://localhost:3000/mysqlRequest',temp);
            
            })
            .catch(error => {
              throw error;
                  // throw error;
            });
        // }) 
       
    return data;
        // console.log(data);
        // return dataList;
}



// Define an asynchronous function to retrieve data from all URLs in the list
// const fetchAllData = async () => {
//   const urls = Object.values(eiaDataList);
//   const results = await Promise.all(urls.map(fetchData));
//   return results;
// };


export function getDataFromEIA(){
  // const apiUrl = 'https://api.eia.gov/v2/';
  const apiKey = process.env.eiaAPIKey;
  // const id = 'eiaDataTag'
  // const seriesId = 'PET.RWTC.D';

//add '/data' at the end of API or else will return metadata of the request
// console.log(eiaDataList['U.S. Ending Stocks of Crude Oil in SPR (Thousand Barrels)']);
// const url = eiaDataList['U.S. Ending Stocks of Crude Oil in SPR (Thousand Barrels)'] + `&api_key=${apiKey}`;

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);

    let eiaTag = response.data.response.data[0]['series'];
    let description = response.data.response.data[0]['series-description'];
    let dates = response.data.response.data.map(obj => obj.period);
    let values = response.data.response.data.map(obj => obj.value);
    
  } catch (error) {
    console.error(error);
  }
};
}




export async function getDataFromTE(){
  te.login(process.env.teAPIKey);
  axios.get(`https://api.tradingeconomics.com/markets/historical-data/${indicatorCode}?c=${process.env.teAPIKey}`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
 
}

/**
 * 
 * @param {*} data 
 */
export function sendDataTomySql(data){
  console.log("1");
  router.post('/', (req, res) => {
    console.log(res);
  });
}



export default router;


//Things to consider : Should other functions be attributes to router or be separate?

