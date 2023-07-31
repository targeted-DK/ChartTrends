import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import axios from "axios";
import sendOpenAIDataToDB from "./sendOpenAIDataToDB.js";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json());

dotenv.config();

router.post("/openaiRequest", async (req, res) => {
  try {
    const tableName = req.body.tableName;
    let dataFromDB = await checkAndAddOpenAIResponseToDB(tableName);
    res.send(dataFromDB);
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

export default { getDataFromOpenAI, checkAndAddOpenAIResponseToDB, router };
