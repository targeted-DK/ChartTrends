const API_KEY = "c4c4022663dafa850bc174cd583b0579";

import axios from "axios";
const url = "https://api.stlouisfed.org/fred/"

class Query{
    constructor(queryType){
        this.url = "https://api.stlouisfed.org/fred/" + queryType + "?" + "&file_type=json";
        // this.dataType = 'json';
    }

   
}
