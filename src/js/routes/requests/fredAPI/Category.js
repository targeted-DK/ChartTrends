import axios from 'axios';
import fredUrls from './fredUrls.js'

export class Category {
    
    constructor(categoryID) {
        this.categoryID = categoryID;
        this.childCategoryID = 0;
        this.relatedCategoryID = 0;
        this.seriesCategoryID = 0;
        this.relatedTag =0;
    }

   async getSeries() {
        let data = await axios.get(fredUrls.getCategory.replace("${categoryID}", this.categoryID),{
            params: {
                api_key: process.env.fredAPIKey,
                file_type: 'json'
            }
        })
        .then((response) => {
            console.log(reponse);
        }).catch((err) => {
            throw err;
        });
        return data;
   }

   async getChildCategory() {
        let data = await axios.get(fredUrls.getChildCategory.replace("${childCategoryID}", this.categoryID), {
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

   async getRelatedCategory() {
    let data = await axios.get(fredUrls.getRelatedCategory.replace("${relatedCategoryID". this.categoryID), {
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

   async getCategoryTag() {
        let data = await axios.get(fredUrls.getCategoryTag.replace("${categoryTag}", this.categoryID), {
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

