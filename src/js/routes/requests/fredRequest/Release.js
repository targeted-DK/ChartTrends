import axios from 'axios';
import fredUrls from './fredUrls.js';

class Release {
    constructor(releaseID){
        this.releaseID = releaseID;
    }  

    async getRelease() {
        let data = await axios.get(fredUrls.getRelease.replace("${releaseID}", this.releaseID), {
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

    async getReleases() {
        let data = await axios.get(fredUrls.getReleases, {
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

    async getReleaseDate() {
        let data = await axios.get(fredUrls.getReleaseDate.replace("${releaseID}", this.releaseID), {
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

    async getReleaseDates() {
        let data = await axios.get(fredUrls.getReleaseDates, {
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

    async getReleaseSeries(){
        let data = await axios.get(fredUrls.getReleaseSeries, {
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

    async getReleaseSource() {
        let data = await axios.get(fredUrls.getReleaseSource, {
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
    async getReleaseTag() {
        let data = await axios.get(fredUrls.getReleaseDates, {
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

    async getReleaseTable() {
        let data = await axios.get(fredUrls.getReleaseTable, {
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

export default Release;