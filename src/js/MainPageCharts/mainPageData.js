import axios from "axios";
import forEach from "lodash";
import APIKeys from '../config/APIs/APIkeys.js'

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
    "ICE BofA US High Yield Index Option-Adjusted Spread" : "BAMLH0A0HYM2"
    };

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
export async function getDataFromFRED(fredDataTags){
    let promises = [];
    let dataList = {};
    Object.entries(fredDataTags).forEach(([key, value]) => {  
        
        dataList[value] = axios.get('https://api.stlouisfed.org/fred/series/observations', {
            params: {
                series_id: value,
                api_key: APIKeys.fredAPIKey,
                observation_start : "",
                observation_end : "",
                file_type: 'json'}
            })
            .then(async response =>{
                // return response.data.observations;
                const temp = await response.data;

                axios.post('http://localhost:3000/requests/mysqlRequest',temp)
                .catch(error => {
                  console.error(error);
                });
                dataList[value] = temp;
            })
            .catch(error => {
                  console.error(error);
            });
        }) 

        // console.log(dataList);
        return dataList;
}



export async function getDataFromTE(){


}
