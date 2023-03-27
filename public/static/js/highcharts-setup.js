// import Highcharts from '/highcharts'
// import 'highcharts/modules/data';
// import 'highcharts/modules/exporting';
// import 'highcharts/modules/accessibility';
// import axios from 'axios';
// import units from '/units.js'

const path = window.location.pathname;
const chartName = path.split('/').pop();

let fredTag = tag;
// to use tag variable in python-setup.js
window.tag = tag;
let dataFromRds;
let unit;

axios.post('/mysqlRequest',
    {
        use : "highcharts",
        data : fredTag,
    }
)
.then(function(response) {
    dataFromRds = response.data;
    // console.log(dataFromRds);
    const convertedData = convertRDSDateFormatToHighCharts(dataFromRds);
    createHighcharts(convertedData);
    // unit = units[fredTag];
  })
  .catch(function(error) {
    console.error(error);
});

/**
 * @param {Array<{id: number, date: string, value: nubmer}>} array 
 * @return {Array<number, value>} array 
 * 
 * Drops id, and parameter names, and convert date into miliseconds.
 */
function convertRDSDateFormatToHighCharts(dataFromRds){
  
   
    const convertedData = dataFromRds.map((item) => {
        const milliseconds = Date.parse(item.date);
        
        return [milliseconds, item.value];
      });
      
      return convertedData;
}

// const tag = req.params.tag;
// var data;
// (async function() {
// data = await getDataFromRDS(tag);
// })();
/**
 * @param {Array<number, value>} array 
 * 
 * Creates highchart with given array
 */
function createHighcharts(convertedData) {
    // console.log(unit[0]);
//    console.log(convertedData[0]);
//     console.log(convertedData[0][0]);
//     console.log(convertedData[convertedData.length - 1][0]);
    // var lastDate = convertedData[convertedData.length - 1][0],  // Get year of last data point
    //     days = 24 * 36e5; // Milliseconds in a day

    // Create the chart
    Highcharts.stockChart('chart-container', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: fredTag
        },

        yAxis: [{
            title: {
                text: "percentage"
            },
            top: '15%',
            height: '85%'
        }, {
            height: '15%'
        }],

        plotOptions: {
            flags: {
                accessibility: {
                    exposeAsGroupOnly: true,
                    description: 'Flagged events.'
                }
            }
        },

        series: [{
            // name: unit,
            data: convertedData,
            id: 'dataseries',
            tooltip: {
                valueDecimals: 4
            }
        }]
    });
}