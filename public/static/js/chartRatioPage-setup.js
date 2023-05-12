// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here
// import moment from 'moment'

const path = window.location.pathname;
// const chartName = path.split("/").pop();
const featuredSubject = tag;

// let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "ratio",
    //eia
    tag: featuredSubject,
  })
  .then((response) => {
    // console.log(response);
    // console.log(response);
    // let dataList = jsonData.names;
    let jsonData = Object.assign({}, response.data);
    let convertedDataList = [];

    for (let data of jsonData.values) {
     
      let convertedData = convertRDSDateFormatToHighCharts(data);
      convertedDataList.push(convertedData);
    }

    jsonData.values = convertedDataList;
    createRatioHighCharts(jsonData);

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
  const convertedData = dataFromRds.map((item) => {
    const milliseconds = Date.parse(item.date);

    return [milliseconds, item.value];
  });
  //   console.log(convertedData);
  
  return convertedData;
}

/**
 * @param {Array<json>} array
 *
 * Creates highchart with given array
 */
function createRatioHighCharts(jsonData) {
  
  let title = jsonData.title;
  let names = jsonData.names;
  let comparisonChart = jsonData.comparisonChart;
  let use = jsonData.use;
  let comparisonChartIndex = Object.values(names).indexOf(comparisonChart);
  let desiredDay;
  let alignedData;

  //if weekly, match end date, if daily, find intersection of dates of dataset
  if(jsonData.frequency == "w"){
     desiredDay = "Wednesday"; 

     alignedData = jsonData.values.map((dataset) => {
      return dataset.map(([timestamp, value]) => {
  
        const adjustedTimestamp = moment(timestamp)
          .isoWeekday(desiredDay)
          .valueOf();
  
        return [adjustedTimestamp, value];
      });
    });

    
  } else if(jsonData.frequency == "d"){
     desiredDay = "";

     const intersection = new Set(jsonData.values[0].filter(entry => jsonData.values[1].map(e => e[0]).includes(entry[0])).map(entry => entry[0]));
     
      const array1 = jsonData.values[0].map(entry => {
        if (intersection.has(entry[0])) {
          return entry;
        }
      }).filter(entry => entry !== undefined);

      const array2 = jsonData.values[1].map(entry => {
        if (intersection.has(entry[0])) {
          return entry;
        }
      }).filter(entry => entry !== undefined);
      
    //  const filteredDataset1 = array1.map(entry => [entry[0], entry[1]]);
    //  const filteredDataset2 = array2.map(entry => [entry[0], entry[1]]);

 
     alignedData = [array1, array2]

    
  }

  //multiply values by adjustment factor
  let adjustedData = alignedData.map((arr, index) =>
    arr.map((innerArr) => [
      innerArr[0],
      innerArr[1] * jsonData.adjustment[index],
    ])
  );
  //if there is a chart to compare to extract it 
  let ratioData = adjustedData[0].map((_, index) => [alignedData[0][index][0], alignedData[0][index][1] / alignedData[1][index][1]]);
  ratioData.sort((a, b) => a[0] - b[0]);

  console.log(ratioData);
  // if (use === "ratio") {
  //   let ratioData = alignedData[0].map((_, index) => [alignedData[0][index][0], alignedData[0][index][1] / alignedData[1][index][1]]);
   
  // }
  

  // let comparisonChartData = adjustedData[comparisonChartIndex];
  // adjustedData = adjustedData.slice(0, comparisonChartIndex);
  // names = names.slice(0, comparisonChartIndex);

  // //if there is a chart to make, combine it
  // const summedData = {};
  // adjustedData.forEach((dataset) => {
  //   dataset.forEach(([timestamp, value]) => {
  //     if (summedData.hasOwnProperty(timestamp)) {
  //       summedData[timestamp] += value;
  //     } else {
  //       summedData[timestamp] = value;
  //     }
  //   });
  // });


 
  // // Convert the mapping object to an array of arrays
  // let summedDataArray = Object.entries(summedData).map(([timestamp, value]) => [
  //   parseInt(timestamp),
  //   value,
  // ]);

  // //get rid of -
  // adjustedData = adjustedData.map((arr, index) =>
  //   arr.map((innerArr) => [innerArr[0], Math.abs(innerArr[1])])
  // );

  // //sort custom-made chart by timestamp
  // summedDataArray.sort((a, b) => a[0] - b[0]);

  // names.unshift(title);
  // adjustedData.unshift(summedDataArray)

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
  // Create a new Highcharts chart object
  console.log(ratioData);
  const chartOptions = {
    title: {
      text: title,
    },

    series: [
       {
        name: title,
        data: ratioData,
        // yAxis: 0, 
        tooltip: {
          valueDecimals: 4
      },
     }
    ],
  
   
    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: title,
        },
     
        height: "100%",
        opposite: false, // Position on the left
      },
      // {
      //   title: {
      //     text: "points",
      //   },
      //   height: "100%",
      //   opposite: true, // Position on the right
      // },
    ],
    
   
    tooltip: {
      xDateFormat: '%Y-%m-%d'
    },
    
    rangeSelector: {
      selected: 3, // Set the default range (0 = first, 1 = second, etc.)
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
      enabled: true // Set enabled to true to show legends
    }
  };

  // Render the chart in the chart container element
  Highcharts.stockChart(newChartContainer, chartOptions);
  // }

  // const container = document.getElementById("chart-container");
  // var newChartContainer = document.createElement("div");
  // newChartContainer.className = "chart-container-" + eiaTableName;
  // newChartContainer.id = "chart-container-" + eiaTableName;
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "1000px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

}