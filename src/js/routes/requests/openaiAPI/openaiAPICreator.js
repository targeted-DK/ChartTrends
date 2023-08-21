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
import { fredDataList } from "../../../data/dataList.js";
const router = express.Router();

router.use(bodyParser.json());

dotenv.config();

router.post("/openaiRequest", async (req, res) => {
  try {
    const urlendpoint = req.body.urlendpoint;
   
    let [chartName, chatgptPromptInputs] = await getPromptRelatedInfoFromDataListJS(urlendpoint);
  
    let dataFromDB = await checkAndAddOpenAIResponseToDB(urlendpoint, chartName, chatgptPromptInputs);
    res.send(dataFromDB);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error while fetching openAI response" }); // Sending a general server error message
  }
});

async function checkAndAddOpenAIResponseToDB(urlendpoint, chartName, chatgptPromptInputs) {
  
  try {
    let promptQuestion = `Imagine yourself as an financial expert. You are trying to make a chart named ${chartName}. This chart contains following graphs : ${chatgptPromptInputs}. Explain how they are related and interpreted in stock market in a concise but professional manner. Use less than 200 tokens.`;
    let dataFromDB = await sendOpenAIDataToDB(promptQuestion, urlendpoint);
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

    let list = [];
    list.push(featuredList.map(item => item.urlendpoint));
    list.push(bankList.map(item => item.urlendpoint));
    list.push(bondsList.map(item => item.urlendpoint));
    list.push(macroList.map(item => item.urlendpoint));
    list.push(usgovList.map(item => item.urlendpoint));
    list.push(fedList.map(item => item.urlendpoint));

    // let info = list[String(urlendpoint)];
    // ratio, data, oil ? 

   
    let hashMap = {};

    // Combine all lists into a hash map for quick lookups
    [...featuredList, ...bankList, ...bondsList, ...macroList, ...usgovList, ...fedList].forEach(item => {
        hashMap[item.urlendpoint] = item;
    });
    
    // Look up info in constant time

    let chartDetails = hashMap[urlendpoint];
    let chartName = chartDetails.title;
    let use = chartDetails.use;
    //if use == compare, fetch realnames from dataList.js or other files
    //if it is other cases, such as custom charts, use chatgptPrompts in the object.
    let chatgptPromptInputs;

  
    if(use != "compare"){
      chatgptPromptInputs = chartDetails.chatgptPromptInput;
    } else {
      chatgptPromptInputs = [];

      let tags = chartDetails.tag;
      let sources = chartDetails.source;
      
      for(let num in sources){
        
        if(sources[num] == "FRED"){
          // console.log(fredDataList);
          for (const [key, val] of Object.entries(fredDataList)) {
            if (val === tags[num]) {
              chatgptPromptInputs.push(key);
            } 
          }
         
        }
      }
    }
    
    return [chartName, chatgptPromptInputs];
}

function findKeyByValue(obj, value) {
  for (const [key, val] of Object.entries(obj)) {
    if (val === value) {
      return key;
    }
  }
  return null; // If value is not found
}

export default { getDataFromOpenAI, checkAndAddOpenAIResponseToDB, router };
