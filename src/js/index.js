
import axios from 'axios'
// import cors from "cors"
// import express from "express"
// const app = new express()
const APIKEY = "c4c4022663dafa850bc174cd583b0579";
const url = "https://api.stlouisfed.org/fred/category?category_id=125&api_key=$c4c4022663dafa850bc174cd583b0579&file_type=$json)";
const https = require('https');
  
const config = {
  headers: {
  'Content-Type':  'application/json',
  'Access-Control-Allow-Credentials' : 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
 }
};

function getCategory(){
const request = https.request(url, (response) => {
  //  response.headers.origin = "*";
  let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });
  
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
    document.getElementById("response").innerHTML = response; 

    
})
  
  request.on('error', (error) => {
      console.log('An error', error);
  });
  
request.end() 
}

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



document.getElementById("category").addEventListener("click", getCategory);
document.getElementById("releases").addEventListener("click", getCategory);
document.getElementById("series").addEventListener("click", getCategory);
document.getElementById("sources").addEventListener("click", getCategory);
document.getElementById("tags").addEventListener("click", getCategory);
