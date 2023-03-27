import axios from 'axios';
import fredUrls from './fredUrls.js';
import { URL } from 'url';
import nodeFetch from 'node-fetch'

export default class Series {
    constructor(seriesID){
        this.seriesID = seriesID;
        // this.searchString = searchString;
    }

    async getSeries(){
        let data = await axios.get(fredUrls.getSeries.replace("${seriesID}", this.seriesID), {
            params : {  
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }

    async getSeriesCategory(){
   
        let data = await axios.get(fredUrls.getSeriesCategory.replace("${seriesID}", this.seriesID), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }

    async getSeriesObservations(){
        // console.log(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID));
        // const newlink = new URL(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID));
       
        // const parsedUrl = new URL(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID));
        // console.log(typeof(parsedUrl));
        // const baseUrl = 'https://api.stlouisfed.org/fred/series/observations';
        // const queryParams = `?series_id=${this.seriesID}&api_key=${process.env.fredAPIKey}&file_type=json`;
        // const url = `${baseUrl}${queryParams}`;
        // console.log(url);
       
        // console.log( Object.prototype.toString.call(new URL(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID))));
        // var url = new URL(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID));
        // var params = new URLSearchParams({
         
        //         api_key : process.env.fredAPIKey,
        //         file_type : 'json'
            
        // });
        // const response = await nodeFetch(url, { searchParams: params });
        // const data = await response.json();
        // console.log(data);


        var response = await axios.get(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
           console.log(response);
        })
        .catch((err) => {
            throw err;
        });

        return response;
       
    }

    async getSeriesRelease() {
        let data = await axios.get(fredUrls.getSeriesRelease.replace("${seriesID}", this.seriesID), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }

    async getSeriesUsingText() {
        let data = await axios.get(fredUrls.getSeriesTagUsingText.replace("${searchString}", this.searchString), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }

    async getSeriesTags() {
        let data = await axios.get(fredUrls.getSeriesTags.replace("${seriesID}", this.seriesID), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }

    async getSeriesUpdates() {
        let data = await axios.get(fredUrls.getSeriesUpdates, {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            throw err;
        });
        return data;
    }
}