//******************************************************
//This setup file is different from other *-setup files.
//******************************************************
//@TODO - later combine all setup files into one

const path = window.location.pathname;
// const chartName = path.split("/").pop();
const ratioSubject = tag;

// let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "ratio",
    //eia
    tag: ratioSubject,
  })
  .then((response) => {
   
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
  let comparisonChartName = jsonData.comparisonChartName;
  let frequency  = jsonData.frequency[0];
  let use = jsonData.use;
  // let comparisonChartIndex = Object.values(names).indexOf(comparisonChart);
  let desiredDay;
  let alignedData;

  console.log(jsonData);
  
  console.log("here");
  //if weekly, match end date, if daily, find intersection of dates of dataset
  if(frequency == "w"){
     desiredDay = "Wednesday"; 

     alignedData = jsonData.values.map((dataset) => {
      return dataset.map(([timestamp, value]) => {
  
        const adjustedTimestamp = moment(timestamp)
          .isoWeekday(desiredDay)
          .valueOf();
  
        return [adjustedTimestamp, value];
      });
    });

    
  } else if(frequency == "d"){
     desiredDay = "";

     console.log(jsonData);
     
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
      
  
    array1.sort((a, b) => a[0] - b[0]);
    array2.sort((a, b) => a[0] - b[0]);


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
