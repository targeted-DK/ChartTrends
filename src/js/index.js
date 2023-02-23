// const APIKEY = "c4c4022663dafa850bc174cd583b0579";
// const url = "https://api.stlouisfed.org/fred/category?category_id=125?api_key=$c4c4022663dafa850bc174cd583b0579&file_type=$json)";
// const backendURL = "http://localhost:3000/queryRequest"
// import axios from 'axios';
// const axios = require('axios');
import * as mainPageData from './MainPageCharts/mainPageData.js';

// //  loadMainPageData = require('./js/MainPageCharts/mainPageData');
// const response = await window.axios.get('https://api.example.com/data');

/**
 * 
 * @param {string} code 
 * Send a request to the backend with a FRED tag 
 */
function sendRequestToServer(key){
  console.log("A query request is sent to the server.js");
  axios.post("/apiRequest", 
  { 
       data : key,
       }
    )
  .then((response) => {
   console.log(response);
    // const data = response.data;
    // console.log(data);
    // document.getElementById("response").innerHTML = data; 
    
  })
  .catch((err) => console.log(err));
}

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }


/**
 * Retrieves data from the RDS AWS.
 */
function fetchDatafromDatabase(value) {
    console.log("Fetching Data from the RDS database");
   axios.post("/mysqlRequest",
    {
      params : {
        data : value,
      }
    })
    .then(response =>{
      console.log(response);
      // document.getElementById("fetchDataFromRDS").textContent = response;
      console.log("GET request finished");
    })
    .catch((err) => console.log(err));
    
}

function downloadData(){
    let list = mainPageData.fredDataTags;
    for(const key in list){
      sendRequestToServer(key);
    }

}

// document.getElementById("chart-button").addEventListener("click", function(event) {
//   event.preventDefault(); // Prevent the default behavior of the link
//   console.log("test");
//   fetch('/chart')
//     .then(response => response.text())
//     .then(data => document.body.innerHTML = data)
//     .catch(error => console.error(error));
// });


let data = [1, 2, 3, 4, 5];

function testpython(){
  axios.post("/analyze",
    {
      // headers: { 'Content-Type': 'application/json' },
      params : {
        data :data,
      }
    })
  .then(response => response.json())
  .catch(err => console.log(err))
  .then(result => {
    console.log(result); // { mean: 3 }
  });
  
}



document.getElementById("download").addEventListener("click", testpython);
document.getElementById("category").addEventListener("click", function(event) {
  // event.preventDefault(); // Prevent the default behavior of the link
  console.log("test");
  fetch('/chart')
    .then(response => response.text())
    .then(data => document.body.innerHTML = data)
    .catch(error => console.error(error));
});


const myButton = document.getElementById('releases');

document.getElementById("releases").addEventListener("click",fetchDatafromDatabase);
document.getElementById("series").addEventListener("click", sendRequestToServer);
document.getElementById("sources").addEventListener("click", sendRequestToServer);
document.getElementById("tags").addEventListener("click", sendRequestToServer);

