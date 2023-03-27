
import * as mainPageData from './processData.js';
import axios from 'axios';
/** @TODO - user ID, categorized request based upon data type , such as TE, nasdaq, fred, etc */

/**
 * 
 * @param {string} key 
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


/**
 * 
 * * @param {string} tag 
 *Retrieves data from the RDS AWS.
 */
 function fetchDatafromDatabase(tag) {
    console.log("Fetching Data from the RDS database");
   axios.post("/mysqlRequest",
    {
      params : {
        data : tag,
      }
    })
    .then(response =>{
      console.log(response);
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

// document.getElementById("download").addEventListener("click", testpython);
// document.getElementById("category").addEventListener("click", function(event) {
//   // event.preventDefault(); // Prevent the default behavior of the link
//   console.log("test");
//   fetch('/chart')
//     .then(response => response.text())
//     .then(data => document.body.innerHTML = data)
//     .catch(error => console.error(error));
// });


// const myButton = document.getElementById('releases');
// document.getElementById("releases").addEventListener("click",fetchDatafromDatabase);
// document.getElementById("series").addEventListener("click", sendRequestToServer);
// document.getElementById("sources").addEventListener("click", sendRequestToServer);
// document.getElementById("tags").addEventListener("click", sendRequestToServer);


export default {sendRequestToServer, fetchDatafromDatabase};