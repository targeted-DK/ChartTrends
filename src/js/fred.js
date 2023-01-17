import axios from "axios";
import cors from "cors"
const APIKEY = "c4c4022663dafa850bc174cd583b0579";
const FILE_TYPE = "json";
const proxy = "https://cryptic-headland-94862.herokuapp.com/";
axios.defaults.withCredentials = true; 
import Fred from 'node-fred'




const fred = new Fred(APIKEY);


const config =  new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin' : '*',
  'withCredentials' : 'true',
}); 

// let response = await fetch('https://api.stlouisfed.org/fred/category?category_id=125&api_key=${APIKEY}&file_type=${FILE_TYPE})', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//     'API-Key': 'secret'
//   }
// });

function getCategory(categoryID) {
 
  fetch('https://api.stlouisfed.org/fred/category?category_id=125&api_key=${APIKEY}&file_type=${FILE_TYPE})', {config})
  .then((res) =>{
    console.log('Category', res);
    document.getElementById("response").innerHTML = JSON.stringify(res);
  })
  // .then((res) => console.log(res))
  .catch((err) => {
      console.error('Error', err);
    });
}




// //Get request

// // axios.get('http://webcode.me').then(resp => {

// //     console.log(resp.data);
// // })
// axios.use(cors({
//   origin: "http://localhost:1234",
//   credentials: true,
// }));
// var axiosInstance = axios.create();
// const URL = `https://api.stlouisfed.org/fred/category?category_id=125&api_key=${APIKEY}&file_type=${FILE_TYPE}`;
// const config ={
//   "Access-Control-Allow-Headers" : "Content-Type",
//   "Access-Control-Allow-Origin": url,
//   "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
// };
// // res.header('Access-Control-Allow-Origin', '*');
// //  axios.head("Access-Control-Allow-Origin", "*");
// function buildQuery(API_KEY, data_type = 'json', category_id){

//   // axiosInstance.post(URL, headers)
//   // .catch((err) => console.log(err));

//   axiosInstance.get(`https://api.stlouisfed.org/fred/category?category_id=125&api_key=${APIKEY}&file_type=${FILE_TYPE}`, config)
//       .then(response => {
//         console.log(response.data);
//         document.getElementById("response").innerHTML = JSON.stringify(response);
//         })
//       .catch((err) => console.log(err));

// }
//   // // axios.head('Access-Control-Allow-Origin', '*');
  
//   // axios
//   // .get("https://api.stlouisfed.org/fred/category?category_id=125&api_key="+API_KEY + "&file_type=json")
//   // .then((response) => {
    

//   //   console.log(response.data.url);
//   //   console.log(response.data.explanation);
//   //   displayOutput(response)
//   // })
//   // .catch((err) => console.log(err));



// //https://api.stlouisfed.org/fred/category?category_id=125&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json

// //  https://api.stlouisfed.org/fred/releases?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json
// //https://api.stlouisfed.org/fred/series?series_id=GNPCA&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json
// //https://api.stlouisfed.org/fred/sources?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json
// //https://api.stlouisfed.org/fred/related_tags?tag_names=monetary+aggregates;weekly&api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json



document.getElementById("category").addEventListener("click", getCategory);
document.getElementById("releases").addEventListener("click", getCategory);
document.getElementById("series").addEventListener("click", getCategory);
document.getElementById("sources").addEventListener("click", getCategory);
document.getElementById("tags").addEventListener("click", getCategory);

// function postUser(){

// axios.post(`https://api.stlouisfed.org/fred/category?category_id=125&api_key=${APIKEY}&file_type=${FILE_TYPE}`, {},
// {
// 	withCredentials: true // 쿠키 cors 통신 설정
// }).then(response => {
// 	console.log(response);
// });
// }

// function concurrentRequests(){

// }
