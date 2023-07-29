import connection from "../../../config/Database/serverConnection.js";
import {getDataFromOpenAI} from "./openaiAPICreator.js";
import queries from "../../../mysqlQueries.js";
let date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1; // getMonth() starts from 0
let day = date.getDate();
month = (month < 10 ? "0" : "") + month;
day = (day < 10 ? "0" : "") + day;


let currentDate = `${year}-${month}-${day}`;
let monthago = month - 1;
let oneMonthAgo = `${year}-${monthago}-${day}`;

export async function sendOpenAIDataToDB(promptQuestion, tableName_) {
   
    let tableName = tableName_;
    
    if(connection.authorized){
        console.log("Fetching openAI response from database...");
        let DATABASE_NAME = "OPENAIRESULT";

        connection.query(queries.CREATE_DATABASE, [DATABASE_NAME]), function (err, result) {
            if (err) {
                console.error(`ERROR EXECUTING CREATE_DATABASE ${DATABASE_NAME}`, err);
            }}

        connection.query(queries.CHECK_OPENAI_TABLE_IF_EXISTS, [DATABASE_NAME, tableName], function (err, result) {
            if (err) {
                //if table does not exist
              

                connection.query(queries.CREATE_OPENAI_TABLE, [DATABASE_NAME, tableName], async function (err, result) {
                    if (err) {
                      console.error("ERROR EXECUTING CREATE_OPENAI_TABLE", err);
                      return;
                    }

                    console.log("Fetching data from openai API");
                    let openaiResponse = await getDataFromOpenAI(promptQuestion,tableName);
                    console.log("----------------");
                    // console.log(data);
                    // let tuples = [data, currentDate]
                   
                    connection.query(queries.INSERT_DATA_TO_OPENAIRESULT_TABLE, [DATABASE_NAME, tableName, openaiResponse, currentDate], function (err, result) {
                    if (err) {
                      console.error("ERROR EXECUTING INSERT_DATA_TO_OPENAIRESULT_TABLE", err);
                      return;
                    }})

                    // Insert your new data here
                    console.log("New openAI response table is created and data has been fetched and inserted to the table")

                  });

              return;
            }
            console.log("table exists, so checking how old data is");
        
            if (result.length > 0) {
                connection.query(queries.CHECK_IF_OPENAI_RESPONSE_OLDER_THAN_A_MONTH, [DATABASE_NAME, tableName, oneMonthAgo], function (err, result) {
                if (err) {
                  console.error("ERROR EXECUTING CHECK_IF_OLDER_THAN_ONE_MONTH_QUERY", err);
                  return;
                }
          

                if (result.length > 0) {
                    connection.query(queries.DROP_OPENAI_TABLE, [DATABASE_NAME, tableName],async function (err, result) {
                    if (err) {
                      console.error("ERROR EXECUTING DROP_TABLE_QUERY", err);
                      return;
                    }

              
                    console.log("table exists and response is old so fetching new data from openAI");
                      let data = await getDataFromOpenAI(promptQuestion,tableName);

                      connection.query(queries.UPDATE_OPENAIRESULT_TABLE,[DATABASE_NAME, tableName, data, currentDate ],function (err, result) {
                        if (err) {
                          console.error("ERROR EXECUTING UPDATE_OPENAIRESULT_TABLE", err);
                          return;

                        } else {

                            console.log("UPDATE_OPENAIRESULT_TABLE executed");
                        }})
                      // Insert your new data here
                 
                  });
                }
              });
            } 
          });

    } else {
        console.log("not authorized");

    }


}


export default sendOpenAIDataToDB;