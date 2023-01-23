const APIKEY = "c4c4022663dafa850bc174cd583b0579";
const url = "https://api.stlouisfed.org/fred/category?category_id=125?api_key=$c4c4022663dafa850bc174cd583b0579&file_type=$json)";
const backendURL = "http://localhost:3000/queryRequest"
import axios from 'axios';
import { exit } from 'process';
// const https = require('https');
// import express, { Router } from 'express';
// const app = express();
// import { join } from 'path';
// const router = express.Router();
// import cors from 'cors';

// console.log("Test1");
// router.get('/',function(req,res){
//   res.sendFile(join('/Users/dk/Documents/GitHub/ChartTrends/index.html'));
//   //__dirname : It will resolve to your project folder.
// });


// app.use('/', router);
// app.listen(process.env.port || 1234);
// app.use(cors())

// console.log('Running at Port 1234');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/Users/dk/Documents/GitHub/ChartTrends/index.html', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.get('/index.js', function(req, res, next) {
//   // Handle the get for this route
//   console.log()
  
// });

// app.post('/', function(req, res, next) {
//  // Handle the post for this route
// });


  
// const config = {
//   headers: {
//   'Content-Type':  'application/json',
//   'Access-Control-Allow-Credentials' : 'true',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
//  }
// };


// const fetchData = async (symbol) => {
//   const response = await fetch(`http://localhost:8000/post-data`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ symbol: symbol })
//   });
//   const data = await response.json();
//   console.log(data);
// }
// fetchData('AAPL');


export function sendRequestToServer(search){
  console.log("A query request is sent to the server.js");
  axios.get("http://localhost:3000/queryRequest")
  .then((response) => {
    console.log("The requested query is executed.");
    // console.log(response.data.url);
    document.getElementById("response").innerHTML = response; 
    
  })
  .catch((err) => console.log(err));

}
 // document.getElementById(search).innerHTML = JSON.stringify(data.JSON);

document.getElementById("category").addEventListener("click", sendRequestToServer);
document.getElementById("releases").addEventListener("click",sendRequestToServer);
document.getElementById("series").addEventListener("click", sendRequestToServer);
document.getElementById("sources").addEventListener("click", sendRequestToServer);
document.getElementById("tags").addEventListener("click", sendRequestToServer);

 

// const response = await fetch(`http://localhost:3000/`, {
  
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ query: query })
     
//   });
 
//   const data = await response.json();
// const request = https.request(url, (response) => {
//   //  response.headers.origin = "*";
//   let data = '';
//     response.on('data', (chunk) => {
//         data = data + chunk.toString();
//     });
  
//     response.on('end', () => {
//         const body = JSON.parse(data);
//         console.log(body);
//     });
//     document.getElementById("response").innerHTML = response; 

    
// })
  
//   request.on('error', (error) => {
//       console.log('An error', error);
//   });
  
// request.end() 


// function getCategory() {
//   axios
//   .get(url)
//   .then((response) => {
//     console.log(response.data.url);
//     console.log(response.data.explanation);
//     displayOutput(response)
//   })
//   .catch((err) => console.log(err));
// }


// app.use(cors())
 
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })
 
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


// Make a request for a user with a given ID


  // axios.get(url,config)
  // .then((response) => {
  //   // handle success

  //   document.getElementById("response").innerHTML = response;
  //   console.log("fetching success");
  // })
  // .catch((error) => {
  //   // handle error
  //   console.error('Error', error);
  //   document.getElementById("response").innerHTML = "Error";

  // });

