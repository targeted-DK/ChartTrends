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

const express = require('express');
// const app = express();
const router = express.Router();

const economic_data = {"10-Year Expected Inflation" : "EXPINF10YR"} 
// const seriesurl = "https://api.stlouisfed.org/fred/series?series_id=EXPINF10YR&api_key=c4c4022663dafa850bc174cd583b0579&file_type=json"


router.get('/apiRequest', (req, res) => {
    console.log("Listening a request from index.js at apiRequest Router");
    const query = req.query.data;
    // console.log(economic_data[query]);
    const result = getData(economic_data[query]);
    console.log(JSON.stringify(result));
    // console.log(result);
    // res.json(result);
    // res.send(JSON.stringify(getData(economic_data[query])));
});

function getData(seriesName) {
  fred.series.getSeries(seriesName)
    .then((res) => {
      // console.log('test', res);
      // **** Compare the data with database / update ****
    //  console.log(res);
      return res[0]
    })
    .catch((err) => {
      console.error('Error', err);
    });
}

module.exports = router;




