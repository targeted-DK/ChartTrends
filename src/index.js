const APIKEY = "c4c4022663dafa850bc174cd583b0579";
const url = "https://api.stlouisfed.org/fred/category?category_id=125?api_key=$c4c4022663dafa850bc174cd583b0579&file_type=$json)";
const backendURL = "http://localhost:3000/queryRequest"
import axios from 'axios';


export function sendRequestToServer(search){
  console.log("A query request is sent to the server.js");

  axios.get("http://localhost:3000/requests/apiRequest", 
  { 
    params: {
       data : "10-Year Expected Inflation",
       }}
    )
  .then((response) => {
    console.log("The requested query is executed.");
    const data = response.data;
    console.log(data);
    document.getElementById("response").innerHTML = data; 
    
  })
  .catch((err) => console.log(err));

}

document.getElementById("category").addEventListener("click", sendRequestToServer);
document.getElementById("releases").addEventListener("click",sendRequestToServer);
document.getElementById("series").addEventListener("click", sendRequestToServer);
document.getElementById("sources").addEventListener("click", sendRequestToServer);
document.getElementById("tags").addEventListener("click", sendRequestToServer);

 