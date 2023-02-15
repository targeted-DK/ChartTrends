const APIKEY = "c4c4022663dafa850bc174cd583b0579";
const url = "https://api.stlouisfed.org/fred/category?category_id=125?api_key=$c4c4022663dafa850bc174cd583b0579&file_type=$json)";
const backendURL = "http://localhost:3000/queryRequest"
import axios from 'axios';
import { get } from 'lodash';
import mainDataFromFred from '../static/mainDataList.js';
//  loadMainPageData = require('./js/MainPageCharts/mainPageData');


/**
 * 
 * @param {string} code 
 * Send a request to the backend with a FRED tag 
 */
function sendRequestToServer(key){
  console.log("A query request is sent to the server.js");

  axios.get("http://localhost:3000/requests/apiRequest", 
  { 
    params: {
       data :  key,
       }}
    )
  .then((response) => {
    console.log("The requested query is executed.");
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
function fetchDatafromDatabase() {
    console.log("Fetching Data from the RDS database");
    axios.get("http://localhost:3000/requests/mysqlRequest",
    {
      params : {
        data : "DGS10",
      }
    })
    .then(response =>{
      console.log("last");
      console.log(response);
      document.getElementById("fetchDataFromRDS").textContent = response;

    })
    .catch((err) => console.log(err));
    console.log("GET request finished");
}

function downloadData(){
    let list = mainDataFromFred;
    for(const key in list){
      sendRequestToServer(key);
    }

}

document.getElementById("download").addEventListener("click", downloadData);
document.getElementById("category").addEventListener("click", sendRequestToServer);
document.getElementById("releases").addEventListener("click",fetchDatafromDatabase);
document.getElementById("series").addEventListener("click", sendRequestToServer);
document.getElementById("sources").addEventListener("click", sendRequestToServer);
document.getElementById("tags").addEventListener("click", sendRequestToServer);


