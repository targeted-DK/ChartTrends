// import axios from "axios";
// import '../config/env.mjs'
import axios from 'axios';
import Series from '../routes/requests/fredRequest/Series.js'
import getGraphInfo from '../filterDataForRDS.js';
import createChart from './createChart.js';
import { getDataFromRDS } from '../routes/requests/mysqlRequest.js';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

/**
 * Modify this list for FRED data on the main page
 * 
 * Runs only at midnight for data update
 * 
 * Close connection once done for overall database connection performance
 * 
 * @todo add other API functions.
 */
export const fredDataTags = {
    // "Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity, Quoted on an Investment Basis" : "DGS10",
    // "Market Yield on U.S. Treasury Securities at 10-/Year Constant Maturity, Quoted on an Investment Basis, Inflation-Indexed" : "DFII10",
    // "Nominal Broad U.S. Dollar Index" : "DTWEXBGS",
    // "Spot Crude Oil Price: West Texas Intermediate (WTI)" : "WTISPLC",
    "ICE BofA US High Yield Index Option-Adjusted Spread" : "BAMLH0A0HYM2",
    // "Assets: Total Assets: Total Assets: Wednesday Level" : "RESPPANWW",
    // "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations" : "RRPONTSYD",
    // "Liabilities and Capital: Liabilities: Deposits with F.R. Banks, Other Than Reserve Balances: U.S. Treasury, General Account: Week Average" : "WTREGEN"
    };


export async function getDataForMainPage() {

  Object.entries(fredDataTags).forEach(([key, value]) => {  
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

export async function createChartForMainPage(){
    Object.entries(fredDataTags).forEach(async ([key, value]) => {
        await getDataFromRDS(value)
        .then(data => {
            createChart(data);
            console.log(data);
        })
        .catch(err => {
            throw err;
        });
    });
}


    export async function getTagsFromFRED(){
        // let promises = [];
        // let datalist = {};
        // Object.entries(fredDataTags).forEach(([key, value]) => {  
        let apiKey = process.env.fredAPIKey;
        let data = await axios.get('https://api.stlouisfed.org/fred/releases?api_key=' + apiKey ,{
            params: {
                file_type: 'json'}
            })
                .then(async response =>{
                    console.log('Got data from FRED and saving data to the AWS RDS');
                    // console.log(response);
                    console.log(response.data.releases[0].data);
                })
                .catch(error => {
                  throw error;
                      // throw error;
                });
                // console.log(data);
    }




export async function getDataFromTE(){


}


// export default fredDataTags;