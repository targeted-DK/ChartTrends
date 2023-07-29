
import mysql from 'mysql2';
// import '../env.mjs';
// import { db_host } from '../environment.js';
// import { db_host, db_user , db_pass , db_name , nasdaqAPIKey, fredAPIKey,teAPIKEY } from "../environment.js";
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // datebase: process.env.DB_NAME_TWO,
  // connectTimeout : 10000000
});

// Database Connection

//GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;

const grantPrivilegesSQL = `GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'admin'`;
const grantPrivilegesCATALOG = `GRANT ALL PRIVILEGES ON catalog.* TO 'admin'`;

const test = `GRANT CREATE, UPDATE, DELETE, INSERT ON *.* TO 'admin'`;

connection.query(grantPrivilegesSQL, function (error, results, fields) {
  if (error) throw error;
  console.log("Privileges to acesss all datasbase granted successfully");
});

connection.connect(function(error) {
  if (error) throw error;
 
  
  console.log("Connected to RDS Database on AWS");
});


// connection.query(grantPrivilegesTEST, function (error, results, fields) {
//   if (error) throw error;
//   console.log("Privileges to access catalog granted successfully");
// });

export default connection;