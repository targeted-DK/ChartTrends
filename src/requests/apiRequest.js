// const categoryFunctions = [getCategory, getCategoryChildren, getCategoryRelated, getCategoryTags, getCategoryRelatedTags];
// const releasesFunctions = [getRelease, getReleasesDates, getRelease, getReleaseDates, getReleaseSeries, getRelatedTags, getReleaseRelatedTags];
// const seriesFunctions = [getSeires, getSeriesCategories, getSeriesObservations, getSeriesRelease, getSeriesSearch, getSeriesSearchRelatedTags,
//                         getSeriesTags, getSeriesUpdates, getSeriesVintageDates];
// const sourcesFunctions = [getSources, getSource, getSourceReleases];
// const tagsFunctions = [getTags, getRelatedTags, getTagsSeries];
//two kinds of data source : 
const Fred = require('node-fred');
const API_KEY = 'c4c4022663dafa850bc174cd583b0579';
const fred = new Fred(API_KEY);
const axios = require('axios');
const express = require('express');
const router = express.Router();
const economic_data = {"10-Year Expected Inflation" : "EXPINF10YR"} 
// const seriesurl = "https://api.stlouisfed.org/fred/series?series_id=EXPINF10YR&api_key=c4c4022663dafa850bc174cd583b0579&file_type=json"


var fetchedData = "";

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
// router.get('/', (req, res) => {
//   res.send('Birds home page')
// })
// define the about route
// router.get('/about', (req, res) => {
//   res.send('About birds')
// })


router.get('/apiRequest', (req, routerRes) => {
    console.log("Listening a request from index.js at apiRequest Router");
    const query = req.query.data;

    axios.get('https://api.stlouisfed.org/fred/series/observations', {
    params: {
        series_id: 'DGS10',
        api_key: API_KEY,
        observation_start : "2021-01-01",
        observation_end : "2021-02-01",
        file_type: 'json'}
    })
    //If get() is successful, check if data exists in the database.
    //If it exists but the same, exit.
    //If it exists but data is different or does not exist, then update. -> not implemented yet.
    .then(apiRes => {
      // fetchedData.data = apiRes.data;
      
      // routerRes.send(apiRes.data);
      // console.log()
      axios.post('http://localhost:3000/requests/mysqlRequest', apiRes.data.observations)
      .then(response => {


        // console.log(response);
        
      })
      .catch(error => {
        console.error(error);
        console.log("ere");
      });
      
      // next();
      // axios.post('http://localhost:3000/mysqlRequest', apiRes.data)
        // .then(response => {
        //   // routerRes.send(apiRes.data);
        // });
      //  axios.post('http://localhost:3000/mysqlRequest',);

      // router.post('/apiRequest', (req, res) => {
    })
    .catch(error => {
        // console.log(error);
    });

   
    // next();
})


function sendDataTomySql(data){
  console.log("1");
  router.post('/', (req, res) => {
    console.log(res);
  });
}



function getData(seriesName) {
  fred.series.getSeries(seriesName)
    .then((res) => {
      // console.log('test', res);
      // **** Compare the data with database / update ****
    //  console.log(res);
    console.log("Data From Fred");
    console.log(res);
      return res[0]
    })
    .catch((err) => {
      console.error('Error', err);
    });
}

module.exports = router;




