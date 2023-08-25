import connection from "../../../config/Database/serverConnection.js";
import { getDataFromOpenAI } from "./openaiAPICreator.js";
import queries from "../../../mysqlQueries.js";

let date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
month = (month < 10 ? "0" : "") + month;
day = (day < 10 ? "0" : "") + day;
let currentDate = `${year}-${month}-${day}`;

date.setMonth(date.getMonth() - 1);
let yearAgo = date.getFullYear();
let monthAgo = date.getMonth() + 1;
let dayAgo = date.getDate();
monthAgo = (monthAgo < 10 ? "0" : "") + monthAgo;
dayAgo = (dayAgo < 10 ? "0" : "") + dayAgo;
let oneMonthAgo = `${yearAgo}-${monthAgo}-${dayAgo}`;

let dataFromDB = "";

export async function sendOpenAIDataToDBAndFetch(promptQuestion, tableName_) {
  let tableName = tableName_;
  // console.log(tableName);
  if (!connection.authorized) {
    console.log("not authorized");
    return;
  }

  return new Promise((resolve, reject) => {
    console.log("Fetching openAI response from database...");
    let DATABASE_NAME = "OPENAIRESULT";

    connection.query(queries.CREATE_DATABASE, [DATABASE_NAME]),
      function (err, result) {
        if (err) {
          reject(err);
          return;
        }
      };

    connection.query(
      queries.CHECK_OPENAI_TABLE_IF_EXISTS,
      [DATABASE_NAME, tableName],
      function (err, result) {
        if (err) {
          //if table does not exist
          connection.query(
            queries.CREATE_OPENAI_TABLE,
            [DATABASE_NAME, tableName],
            async function (err, result) {
              if (err) {
                reject(err);
                return;
              }

              console.log("Fetching data from openai API");

              let openaiResponse = await getDataFromOpenAI(
                promptQuestion,
                tableName
              );
              dataFromDB = [{"openai_response" : openaiResponse, "last_updated_time" : currentDate}];

              connection.query(
                queries.INSERT_DATA_TO_OPENAIRESULT_TABLE,
                [DATABASE_NAME, tableName, openaiResponse, currentDate],
                function (err, result) {
                  if (err) {
                    reject(err);
                    return;
                  }
                }
              );

              console.log(
                "New openAI response table is created and data has been fetched and inserted to the table"
              );
              
              resolve(dataFromDB);
              return;
            }
            
          );
        } else {
        console.log("table exists, so checking how old data is");

        if (result.length > 0) {
          connection.query(
            queries.CHECK_IF_OPENAI_RESPONSE_OLDER_THAN_A_MONTH,
            [DATABASE_NAME, tableName, oneMonthAgo],
            async function (err, result) {
              if (err) {
                reject(err);
                return;
              }

              if (result.length > 0) {
                connection.query(
                  queries.DROP_OPENAI_TABLE,
                  [DATABASE_NAME, tableName],
                  async function (err, result) {
                    if (err) {
                      reject(err);
                      return;
                    }

                    console.log(
                      "table exists and response is old so fetching new data from openAI"
                    );
                    let openaiResponse = await getDataFromOpenAI(
                      promptQuestion,
                      tableName
                    );

                    dataFromDB = [{"openai_response" : openaiResponse, "last_updated_time" : currentDate}];

                    connection.query(
                      queries.UPDATE_OPENAIRESULT_TABLE,
                      [DATABASE_NAME, tableName, openaiResponse, currentDate],
                      function (err, result) {
                        if (err) {
                          reject(err);
                          return;
                        } else {
                          console.log("UPDATE_OPENAIRESULT_TABLE executed");
                        }
                      }
                    );

                    resolve(dataFromDB);
                    return;
                  }
                );

                //if data is not older than 1 month, fetch from database
              } else {
                resolve(await getDataFromTable(tableName));
                return;
              }
            }
          );
        }
    }
      }
    );
  });
}

async function getDataFromTable(tableName) {
  return new Promise((resolve, reject) => {
    connection.query(
      queries.SELECT_OPENAIRESULT_TABLE_TEXT,
      [tableName],
      function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        console.log("SELECT_OPENAIRESULT_TABLE_TEXT executed");
       
        resolve(result);
      }
    );
  });
}

export default sendOpenAIDataToDBAndFetch;
