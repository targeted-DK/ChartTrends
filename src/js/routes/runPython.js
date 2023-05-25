// const { spawn } = require('child_process');
import express from "express";
import PythonShell from "python-shell";
import path from "path";
import {fredDataList} from "../data/dataList.js";
import { fileURLToPath } from "url";
import { getDataFromRDS } from "./requests/mysqlRequest.js";


let router = express.Router();
let tag;
// let primaryDataParams;
let secondaryData = fredDataList;
let secondaryDataTagArray = [];
let jsonSecondaryDataArray = [];

//find directory and env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const grandparentDir = path.dirname(path.dirname(path.dirname(__dirname)));
const envPath = path.join(grandparentDir, ".");

//format from ~setup -> mysqlRequest
//{
//   use: 'highcharts',
//   tag: 'DGS10',
//   transformation: 'lin',
//   frequency: 'a',
//   aggregation: 'avg'
// }

router.use("/", async function (req, res) {
  //forEach prevents async.
  //이거 쓰는 이유가 모종의 이유로 secondary data의 마지막 tag가 자꾸 primary data tag를 overwrite하는 경우가 생김. 강제 할당하는 방법임.
  const format = Object.assign({}, req.body);


  //this is json of primary data in /chart/tag
  //all the request to fetch data MUST HAVE SAME frequency, transformation, and aggregation for proper comparison in analysis.py
  try {
  
    for (const [key, value] of Object.entries(fredDataList)) {
      //copy format
      
      
      let jsonSecondaryDataParams = req.body;
      jsonSecondaryDataParams.tag = value;
     
      try {
        const jsonData = await getDataFromRDS(jsonSecondaryDataParams);
     
        secondaryDataTagArray.push(value);
        jsonSecondaryDataArray.push(jsonData);
      } catch (error) {
        console.log(value + " : " + error);
      }
    }
  
    const primaryDataParams = format;
  
    //first parameter is a main data, and second & third parameters are arrays of data and will be compared to main data individually in analysis.py
    var dataFromPython = await sendToPyshell(
      primaryDataParams,
      secondaryDataTagArray,
      jsonSecondaryDataArray
    );

    //Note that this is sent to the client-side, so check logs there
    res.status(200).send(dataFromPython);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//Problem with stringify - removes .tag attribute in jsonData after JSON.stringify();
function sendToPyshell(
  primaryDataParams,
  secondaryDataTagArray,
  jsonSecondaryDataArray
) {
  return new Promise((resolve, reject) => {
    //array, not object literal for indexing
    var jsonTags = [];

    const jsonPrimaryDataParamsString = JSON.stringify(primaryDataParams);
    const jsonSecondaryTagString = JSON.stringify(secondaryDataTagArray);
    const jsonSecondaryDataArrayString = JSON.stringify(jsonSecondaryDataArray);

    //run pyshell on activsated python venv
    // const envPath = path.join(grandparentDir, ".venv");
    // const activate = spawn("zsh", ["-c", `source ${envPath}/bin/activate`]);
    const condaPath = "/Users/dk/opt/anaconda3/envs/myenv/bin/python";

    var options = {
      mode: "text",
      // pythonPath : '/usr/bin/python3',
      // pythonPath : '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3',
      pythonPath: "./myenv/bin/python3",
      pythonOptions: ["-u"],
      scriptPath: "./src/python/",
      // args : [tag, jsonDataString],
    };

    const pyshell = new PythonShell.PythonShell("analysis.py", options);
    pyshell
      .send(jsonPrimaryDataParamsString)
      .send(jsonSecondaryTagString)
      .send(jsonSecondaryDataArrayString);

    //created promise because pyshell.end() runs before correlation = message
    var correlations;
    let correlationsPromise = new Promise((resolve) => {
      pyshell.on("message", (message) => {
        correlations = message;
        //If you want to check python print messages on js console, un-comment below line :
        // console.log(message);
        resolve(correlations);
      });
    });

    pyshell.on("stderr", (stderr) => {
      console.error(stderr);
    });
    pyshell.on("error", (err) => {
      console.error("Error occurred during Python script execution:", err);
      reject(err);
    });

    pyshell.end((err) => {
      if (err) {
        console.error("Error occurred while ending the Python shell:", err);
        reject(err);
      } else {
        console.log("Python script finished successfully");
        // console.log(correlationsPromise);
        resolve(correlationsPromise);
      }
    });
  });
}

function sendBackToClient(result) {}

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
