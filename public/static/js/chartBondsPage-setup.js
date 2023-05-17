// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here
// import moment from 'moment'

const path = window.location.pathname;
// const chartName = path.split("/").pop();
const bondsSubject = tag;
let chart;

// let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "bonds",
    //eia
    tag: bondsSubject,
  })
  .then((response) => {
    
    let jsonData = Object.assign({}, response.data);

    let convertedDataList = [];

    for (let data of jsonData.values) {
      let convertedData = convertRDSDateFormatToHighCharts(data);
      convertedDataList.push(convertedData);
    }

    jsonData.values = convertedDataList;
    createFeaturedHighcharts(jsonData);

    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch(function (error) {
    console.error(error);
  });

/**
 * @param {Array<{id: number, date: string, value: nubmer}>} array
 * @return {Array<number, value>} array
 *
 * Drops id, and parameter names, and convert date into miliseconds.
 */
function convertRDSDateFormatToHighCharts(dataFromRds) {
  if (dataFromRds == []) {
    return [];
  }
  const convertedData = dataFromRds.map((item, index) => {
    const milliseconds = Date.parse(item.date);
    let result = [milliseconds, item.value];
  
    if (item.value === 0) {
      let sum = 0;
      let count = 0;
      for (let i = index - 2; i <= index + 2; i++) {
        if (i >= 0 && i < dataFromRds.length && dataFromRds[i].value !== 0) {
          sum += dataFromRds[i].value;
          count++;
        }
      }
      result[1] = count > 0 ? sum / count : null;
    }
  
    return result;
  });
  //   console.log(convertedData);
  convertedData.sort((a, b) => a[0] - b[0]);

  return convertedData;
}

/**
 * @param {Array<json>} array
 *
 * Creates highchart with given array
 */
function createFeaturedHighcharts(jsonData) {
  console.log(jsonData);
  let title = jsonData.title;
  let names = jsonData.names;
  let comparisonChart = jsonData.comparisonChart;
  let frequency = jsonData.frequency;
  let chartToCreate = jsonData.chartToCreate;
  let units = jsonData.units;
  let use = jsonData.use;
  let adjustYaxis = jsonData.adjustYaxis;
  let comparisonChartIndex = Object.values(names).indexOf(comparisonChart);
  const desiredDay = "Wednesday"; //Used to align timestamp - some weekly data records on friday. Use Wendesday since its default value for many weekly indicators
 
  let alignedData = jsonData.values;

  

  //match timestamp for weeklydata
  if (frequency == "w") {
    alignedData = jsonData.values.map((dataset) => {
      return dataset.map(([timestamp, value]) => {
        const adjustedTimestamp = moment(timestamp)
          .isoWeekday(desiredDay)
          .valueOf();

        return [adjustedTimestamp, value];
      });
    });
  }

  //multiply values by adjustment factor
  let adjustedData = alignedData.map((arr, index) =>
    arr.map((innerArr) => [
      innerArr[0],
      innerArr[1] * jsonData.adjustment[index],
    ])
  );

  

  //in case where first data is empty
  // console.log(title);
  const container = document.getElementById("chart-container");
  var newChartContainer = document.createElement("div");
  newChartContainer.className = "chart-container-featured";
  newChartContainer.id = "chart-container-featured";
  // newChartContainer.style.width = "70%";
  // newChartContainer.style.height = "400px";
  // newChartContainer.style.position = "relative";
  // newChartContainer.style.right = "20%";
  // newChartContainer.style.left = "20%";

  container.appendChild(newChartContainer);
  
  let chartOptions = 
  {
    title: {
      text: title,
    },
    series: [
      ...adjustedData.map((dataset, index) => ({
        name: names[index],
        data: dataset,

        yAxis: 0,
      })),
     
    ],

    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: units[0],
        },

        height: "100%",
        opposite: false, // Position on the left
      },
    ],
    tooltip: {
      xDateFormat: "%Y-%m-%d",
    },

    rangeSelector: {
      selected: 4, // Set the default range (0 = first, 1 = second, etc.)
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "year",
          count: 2,
          text: "2y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },

    legend: {
      enabled: true, // Set enabled to true to show legends
    },
  //   events: {
  //     events: {
  //       load: function() {
  //         this.exportChartLocal({
  //           type: 'image/png',
  //           filename: 'chart.png',
  //           width: 800, // Set the desired width of the exported image
  //           callback: function() {
  //             console.log('Chart saved successfully.');
  //           }
  //         });
  //       }
  //     }
  // }
}

 

  chart = Highcharts.chart(newChartContainer, chartOptions);


  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "1000px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";
}


// document.addEventListener('DOMContentLoaded', function () {
  

//   var exportChartInterval = setInterval(function() {
//     if (chart) {
//       clearInterval(exportChartInterval);
//       function () {
//         // Callback function to handle the image data.
//         // This function can be used to save the image data to your server.
      
//         const imageData = this.dataURL;
//         console.log(imageData);
//         axios.post('/saveImage', {
       
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             imageData: imageData
//           })
//         }).then(function (response) {
//           if (response.ok) {
//             console.log('Image saved successfully');
//           } else {
//             console.error('Error saving image');
//           }
//         });
      
//     }
//   }, 1000); // Check every second
// });