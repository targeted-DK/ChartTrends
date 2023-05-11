import axios from 'axios';


export class Route {

    static baseEIAv2Url = "https://api.eia/gov/v2/";

    constructor(eiaTag, frequency, startTime, endTime, ) {
      
    }


    async getCoal() {

    }

    async getCrudeOilImports() {


    }

    async getElectricity(){


    }

    async getInternational(){

    }

    async getNaturalGas(){
        
    }

    async getNuclearOutages(){

    }

    async getPetroleum() {

    }
   

    async getSEDS(){


    }

    async getSTEO(){

    }

    async getDensifiedBiomass(){

    }

    async getTotalEnergy() {

    }

    async getAnnualEnergyOutlook() {

    }

    async getInternationalEnergyOutlook(){

    }

    async getStateCO2Emission(){


    }
   async getCategorySeries() {
        let data = await axios.get(fredUrls.getCategorySeries.replace("${seriesCategoryID}", this.categoryID),{
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

