// const { spawn } = require('child_process');
import express from "express";
import child_process from "child_process";
import axios from "axios";
import PythonShell from "python-shell";
import path from "path";
import fredDataList from "../data/dataList.js";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { getDataFromRDS } from "./requests/mysqlRequest.js";
import { TIMEOUT } from "dns";

var router = express.Router();
var tag;
var secondaryData = fredDataList;
var jsonData = [];

//find directory and env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const grandparentDir = path.dirname(path.dirname(path.dirname(__dirname)));
const envPath = path.join(grandparentDir, ".");

router.use("/", async function (req, res) {
  // const entries = Object.entries(secondaryData);
  tag = req.body.data;
  //forEach prevents async.

  for (const [key, value] of Object.entries(secondaryData)) {
    const json = await getDataFromRDS(value);
    jsonData.push(json);
  }

  sendToPyshell(tag, jsonData);
  // await new Promise((resolve, reject) => {});
  //  res.status(200).send(jsonData);

  //send data to python
});

function sendToPyshell(tag, jsonData) {
  const jsonDataString = JSON.stringify(jsonData);

  //activate python venv

  //run pyshell on activsated python venv
  // const envPath = path.join(grandparentDir, ".venv");
  // const activate = spawn("zsh", ["-c", `source ${envPath}/bin/activate`]);
  const condaPath = "/Users/dk/opt/anaconda3/envs/myenv/bin/python";

  var options = {
    mode: "text",
    // pythonPath : '/usr/bin/python3',
    // pythonPath : '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3',
    pythonPath: 'python3',
    pythonOptions: ["-u"],
    scriptPath: "./src/python/",
    // args : [tag, jsonDataString],
    // stdin: process.stdin,
    // stdout: process.stdout,
    // timeout: 5000 ,
  };

   var pyshell = new PythonShell.PythonShell("analysis.py", options);

  pyshell.send(tag).send(jsonDataString);

  pyshell.on('error', (err) => {
    console.error('Error occurred during Python script execution:', err);
  });
  
  pyshell.on('message', (message) => {
    console.log(message);
  });
  


// const python = spawn(`python3`, ['/Users/dk/Documents/GitHub/ChartTrends/src/python/analysis.py']);
//remember to run below after source path.
// const python = spawn('python3', ['./src/python/analysis.py']);
// python.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// python.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// python.on('close', (code) => {
//   console.log(`Python script exited with code ${code}`);
// });

// // Send data to the Python script
// const dataToSend = 'Hello from Node.js';
// python.stdin.write(dataToSend);
// python.stdin.write(tag);

// python.stdin.end();

 
  
}


//child_process version
//launch venv 
//you dont need fullpath, just python3 is enough

// const python = spawn(`python3`, ['/Users/dk/Documents/GitHub/ChartTrends/src/python/analysis.py']);
//remember to run below after source path.
// const python = spawn('python3', ['./src/python/analysis.py']);
// python.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// python.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// python.on('close', (code) => {
//   console.log(`Python script exited with code ${code}`);
// });

// // Send data to the Python script
// const dataToSend = 'Hello from Node.js';
// python.stdin.write(dataToSend);
// python.stdin.write(tag);

// python.stdin.end();

 

export default router;
