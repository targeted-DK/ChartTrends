import axios from 'axios';
import fredUrls from './fredUrls.js';

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
        let response = await axios.get(fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID), {
            params : {
                api_key : process.env.fredAPIKey,
                file_type : 'json'
            }
        })
        // .then((response) => {
        // //    console.log(response);
        // })
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