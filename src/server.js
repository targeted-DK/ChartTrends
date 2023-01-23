const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const url = "https://api.stlouisfed.org/fred/category?category_id=125&api_key=c4c4022663dafa850bc174cd583b0579&file_type=json";

// const url = "https://api.stlouisfed.org/fred/series/search?api_key=c4c4022663dafa850bc174cd583b0579&search_text=canada)";


app.use(express.static(path.join('/Users/dk/Documents/GitHub/ChartTrends/', 'public')));
//CORS configuration
app.use(cors({
  origin: '*'
}))

//Getting a request from the client to send axios.get() to the FRED API
app.get('/queryRequest', (req, res) => {
  console.log("Listening a request from index.js");
  axios.get(url)
      .then(response => {
          console.log(response.data);
          console.log(JSON.stringify(response.data));
          console.log("Data retrieved from the FED server.")
          res.json(JSON.stringify(response.data).name);
      })
      .catch(error => {
          console.log("Could not fetch data from Fred");
          console.log(error);
          res.sendStatus(500);
      });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000 using parcel');
});

