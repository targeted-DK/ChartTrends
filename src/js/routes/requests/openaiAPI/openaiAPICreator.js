import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import axios from "axios";
import sendOpenAIDataToDB from "./sendOpenAIDataToDB.js";
import connection from "../../../config/Database/serverConnection.js"

dotenv.config();

const configuration = new Configuration({
    organization: process.env.openaiOrganizationID,
    apiKey: process.env.openaiAPIKey,
});

const openai = new OpenAIApi(configuration);


async function checkAndAddOpenAIResponseToDB(promptQuestion, tableName){
    console.log(connection.authorized);
    sendOpenAIDataToDB("Tell me how 10year treasury yield and cpi are related", "table");
}

export async function getDataFromOpenAI(prompt){

    let engineType = "davinci";
    let openAIurl = `https://api.openai.com/v1/engines/${engineType}/completions`;
    let openAIRequestContent = {
        "prompt" :"Hi, I am testing if openAPI works on my node.js program",
        "max_tokens" :30
    }

   return await axios.post(openAIurl, openAIRequestContent,{
    headers: { 'Authorization': 'Bearer ' + configuration.apiKey }
    
    })
   .then((response) => {
         let promptResponse = response.data.choices[0].text;
      
         return promptResponse;

    })
    .catch((error) => {
        console.error(error);
    });

}



export default {getDataFromOpenAI, checkAndAddOpenAIResponseToDB};