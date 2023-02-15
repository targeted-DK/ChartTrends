// const categoryFunctions = [getCategory, getCategoryChildren, getCategoryRelated, getCategoryTags, getCategoryRelatedTags];
// const releasesFunctions = [getRelease, getReleasesDates, getRelease, getReleaseDates, getReleaseSeries, getRelatedTags, getReleaseRelatedTags];
// const seriesFunctions = [getSeires, getSeriesCategories, getSeriesObservations, getSeriesRelease, getSeriesSearch, getSeriesSearchRelatedTags,
//                         getSeriesTags, getSeriesUpdates, getSeriesVintageDates];
// const sourcesFunctions = [getSources, getSource, getSourceReleases];
// const tagsFunctions = [getTags, getRelatedTags, getTagsSeries];
//two kinds of data source : 
import Fred from 'node-fred';
import APIKeys from '../config/APIs/APIkeys.js';
const fred = new Fred(APIKeys.fredAPIKey);
import axios from 'axios';
import express from 'express';
const router = express.Router();
const economic_data = {"10-Year Expected Inflation" : "EXPINF10YR"} 
// Key-Value (Name, fredCode) pairs of data need on the main page.
// import fredDataCodes from '../js/MainPageCharts/mainPageData.js';
// const seriesurl = "https://api.stlouisfed.org/fred/series?series_id=EXPINF10YR&api_key=c4c4022663dafa850bc174cd583b0579&file_type=json"
/**
 * Modify this list for FRED data 
 * 
 * Runs only at midnight for data update
 * 
 * Close connection once done for overall database connection performance
 * 
 * @todo add other API functions.
 */
export const fredDataTags = {
  "Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity, Quoted on an Investment Basis" : "DGS10",
  "Nominal Broad U.S. Dollar Index" : "DTWEXBGS",
  "Spot Crude Oil Price: West Texas Intermediate (WTI)" : "WTISPLC",
  "ICE BofA US High Yield Index Option-Adjusted Spread" : "BAMLH0A0HYM2",
  "Real M2 Money Stock" : "M2REAL",
  };


var fetchedData = "";
/**
 * Sends a list of [date, value] and a fred tag mysqlRequst.js
 */ 
router.get('/apiRequest', (req, routerRes) => {
    console.log("Listening a request from index.js at apiRequest Router");
    const query = req.query.data;
    
    //index given data name in a fredCodeList
    console.log(fredDataTags[query]);
    getDataFromFRED(fredDataTags[query]);
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
            API_KEY : APIKeys.nasdaqAPIKey ,
        }
    })
    .then((response) => {
        //To access NASDAQ DATA LINK data, use response.data.dataset
        var name = response.data.dataset.name;
        var description = response.data.dataset.description;
        var data = response.data.dataset.data;
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

    let data = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: fredDataTag,
                api_key: APIKeys.fredAPIKey,
                observation_start : "2022-08-01",
                observation_end : "2023-01-31",
                file_type: 'json'}
            })
            .then(async response =>{
              
                const temp = await response.data;
                temp.code = fredDataTag;

                let postreponse = await axios.post('http://localhost:3000/requests/mysqlRequest',temp);
                console.log(postreponse.data.message);
                // .then(response => {
                //   // console.log(response.data.message);
                //   console.log(response.data.message);
                //   console.log(fredDataTag + " is saved in RDS");
                // })
                // .catch(error => {
                //   console.error("POST request to mysqlRequest.js failed");
                // });
                // dataList[value] = temp;
            })
            .catch(error => {
              console.log("GET request from the client failed");
                  // throw error;
            });
        // }) 
         console.log("getDATAfromFRED() done")
    return data;
        // console.log(data);
        // return dataList;
}



export async function getDataFromTE(){


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



function getData(seriesName) {
  fred.series.getSeries(seriesName)
    .then((res) => {
      // console.log('test', res);
      // **** Compare the data with database / update ****
    //  console.log(res);
    console.log("Data From Fred");
    console.log(res);
      return res[0]
    })
    .catch((err) => {
      console.error('Error', err);
    });
}

export default router;


//Things to consider : Should other functions be attributes to router or be separate?