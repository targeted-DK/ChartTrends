import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import axios from "axios";
import sendOpenAIDataToDB from "./sendOpenAIDataToDB.js";
import express from "express";
import bodyParser from "body-parser";
import featuredList from "../../../data/featuredList.js";
import bankList from "../../../data/bankList.js";
import bondsList from "../../../data/bondsList.js";
import usgovList from "../../../data/usgovList.js";
import fedList from "../../../data/fedList.js";
import macroList from "../../../data/macroList.js";
const router = express.Router();

router.use(bodyParser.json());

dotenv.config();

router.post("/openaiRequest", async (req, res) => {
  try {
    const tableName = req.body.tableName;
    getPromptRelatedInfoFromDataListJS(tableName);
    // let dataFromDB = await checkAndAddOpenAIResponseToDB(tableName);
    // res.send(dataFromDB);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error while fetching openAI response" }); // Sending a general server error message
  }
});

async function checkAndAddOpenAIResponseToDB(tableName) {
  try {
    let promptQuestion = `Imagine yourself as an financial expert. You are trying to make a chart named ${tableName}. Explain how they are related and interpreted in stock market in a concise but professional manner. Use less than 200 tokens.`;
    let dataFromDB = await sendOpenAIDataToDB(promptQuestion, tableName);
    return dataFromDB;
  } catch (error) {
    console.error("Error in checkAndAddOpenAIResponseToDB: ", error);
    throw error; // Re-throw the error if you want calling functions to be able to catch it as well
  }
}

export async function getDataFromOpenAI(promptQuestion) {
  const configuration = new Configuration({
    organization: process.env.openaiOrganizationID,
    apiKey: process.env.openaiAPIKey,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: promptQuestion }],
  });

  return response.data.choices[0].message.content;
}

async function getPromptRelatedInfoFromDataListJS(urlendpoint){

    // let list = [];
    // list.push(featuredList.map(item => item.urlendpoint));
    // list.push(bankList.map(item => item.urlendpoint));
    // list.push(bondsList.map(item => item.urlendpoint));
    // list.push(macroList.map(item => item.urlendpoint));
    // list.push(usgovList.map(item => item.urlendpoint));
    // list.push(fedList.map(item => item.urlendpoint));

    // let info = list[String(urlendpoint)];
    //ratio, data, oil ? 

    // console.log(info);
    let hashMap = {};

    // Combine all lists into a hash map for quick lookups
    [...featuredList, ...bankList, ...bondsList, ...macroList, ...usgovList, ...fedList].forEach(item => {
        hashMap[item.urlendpoint] = item;
    });
    
    // Look up info in constant time
    console.log(hashMap);
    


}

export default { getDataFromOpenAI, checkAndAddOpenAIResponseToDB, router };
