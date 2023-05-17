// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here
// import moment from 'moment'

const path = window.location.pathname;
// const chartName = path.split("/").pop();
const macroSubject = tag;

// let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "macro",
    //eia
    tag: macroSubject,
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

  console.log(alignedData);

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

  let summedData;
  let summedDataArray;
  let comparionChartData;
  if (chartToCreate) {
    //if there is a chart to make, combine it
    summedData = {};
    adjustedData.forEach((dataset) => {
      dataset.forEach(([timestamp, value]) => {
        if (summedData.hasOwnProperty(timestamp)) {
          summedData[timestamp] += value;
        } else {
          summedData[timestamp] = value;
        }
      });
    });

    summedDataArray = Object.entries(summedData).map(([timestamp, value]) => [
      parseInt(timestamp),
      value,
    ]);

    //get rid of -
    adjustedData = adjustedData.map((arr, index) =>
      arr.map((innerArr) => [innerArr[0], Math.abs(innerArr[1])])
    );

    //add newly created chart to array
    names.unshift(title);
    adjustedData.unshift(summedDataArray);
    units.unshift("Million USD");
    comparisonChartIndex++;
  
  }

  //if there is a comparison chart, extract it from orignal array if not, skip
  if(comparisonChart != null){
    comparionChartData = adjustedData[comparisonChartIndex];
    adjustedData = adjustedData.slice(0, comparisonChartIndex);
    names = names.slice(0, comparisonChartIndex);
  }


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
  
  let chartOptions;
 //special case 1 : SP500_domestic_liquidity_indicator
if (use == "compare") {
     //case for comparing two graphs with same y-axis
    if (!adjustYaxis) {
      chartOptions = {
        title: {
          text: title,
        },
        series: [
          ...adjustedData.map((dataset, index) => ({
            name: names[index],
            data: dataset,

            yAxis: 0,
          })),
          {
            name: comparisonChart,
            data: comparionChartData,
          },
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
          enabled: true, // Set enabled to true to show legends
        },

        events: {
          load: function () {
            // After the chart is loaded, export it as an image
            this.exportChart({
              type: 'image/png',
              filename: '../images/' + title,
              width: 800 // Set the desired width of the exported image
            });
          }
        }
      };
}} 

//case for comparing two graphs with different y-axis
chartOptions = {
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
  // alignTicks: true,
  yAxis: [
    {
      title: {
        text: units[0],
      },
      // alignTicks: false,
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
  events: {
    load: function () {
      // After the chart is loaded, export it as an image
      this.exportChart({
        type: 'image/png',
        filename: '../images/' + title,
        width: 800 // Set the desired width of the exported image
      });
    }
  },
  exporting: {
   
    
}
  }

  // Render the chart in the chart container element
  Highcharts.stockChart(newChartContainer, chartOptions);
  

  // let exportImage = Highcharts.chart(newChartContainer, chartOptions);
  // exportImage.exportChart();

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
