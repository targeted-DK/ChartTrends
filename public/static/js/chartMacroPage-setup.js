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
 
 
  //convert and sort
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
      // result[1] = null; //connectnulls in highcharts options
    }
    
    return result;
  });
  
  convertedData.sort((a, b) => a[0] - b[0]);

  return convertedData;
}

/**
 * @param {Array<json>} array
 *
 * Creates highchart with given array
 */
function createFeaturedHighcharts(jsonData) {
  let title = jsonData.title;
  let names = jsonData.names;
  let namesForTag = jsonData.namesForTag;
  let comparisonChartName = jsonData.comparisonChartName;
  let frequency = jsonData.frequency[0];
  let chartToCreate = jsonData.chartToCreate;
  let chartToCreateName = jsonData.chartToCreateName;
  let chartMethod = jsonData.chartMethod;
  let sources = jsonData.sources;
  let uniqueSources = [...new Set(sources)];
  let units = jsonData.units;
  let use = jsonData.use;
  let adjustYaxis = jsonData.adjustYaxis;
  let newUnits = jsonData.newUnits;
  let comparisonChartNameIndex =
    Object.values(names).indexOf(comparisonChartName);
  let desiredDay = "Wednesday"; //Used to align timestamp - some weekly data records on friday. Use Wendesday since its default value for many weekly indicators

  let alignedData = jsonData.values;
//@TODO - comparisonChartName still uses tag, not a real name
  // names = namesForTag;
  // comparisonChartName = namesForTag[comparisonChartNameIndex];


  //framework
  //1) For weekly data, match timestamp and adjust values by adjustment factor
  //2) case 1
  //  2-1)addition
  //  2-2)division
  //3) case 3, 4
      // 3-1) get rid of a first graph
      // 3-2) get rid of two graphs
  //4) case 5 : create new charts by division ex) cash assets/gdp and enumerate -> 5-4
  //5) chartoptions
  //  5-1) case 1
  //  5-2) case 2
  //  5-3) "compare" : compare two charts
        // 5-3-1 : use same y-axis
        // 5-3-2 : use two differnt y-axis
  //  5-4) "enumerate" :  compare multiple charts with same units


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

  //   else if(frequency == "d"){
  //     desiredDay = "";

  //     const intersection = new Set(jsonData.values[0].filter(entry => jsonData.values[1].map(e => e[0]).includes(entry[0])).map(entry => entry[0]));

  //      const array1 = jsonData.values[0].map(entry => {
  //        if (intersection.has(entry[0])) {
  //          return entry;
  //        }
  //      }).filter(entry => entry !== undefined);

  //      const array2 = jsonData.values[1].map(entry => {
  //        if (intersection.has(entry[0])) {
  //          return entry;
  //        }
  //      }).filter(entry => entry !== undefined);

  //    array1.sort((a, b) => a[0] - b[0]);
  //    array2.sort((a, b) => a[0] - b[0]);

  //     alignedData = [array1, array2]
  //  }

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
    if (use == "case1") {
      summedData = {};

      //making chart by addition or by division
      if (chartMethod == "Addition") {
        adjustedData.forEach((dataset) => {
          dataset.forEach(([timestamp, value]) => {
            if (summedData.hasOwnProperty(timestamp)) {
              summedData[timestamp] += value;
            } else {
              summedData[timestamp] = value;
            }
          });
        });
      } else if (chartMethod == "Division") {
      
        let firstDataset = Object.values(adjustedData[0]).sort(
          (a, b) => a[0] - b[0]
        );
        let secondDataset = Object.values(adjustedData[1]).sort(
          (a, b) => a[0] - b[0]
        );
        // console.log(firstDataset);

        //my original code
        // const dividedData = Object.entries(firstDataset).map(([key1, val1]) => {

        //   const correspondingEntry = Object.entries(secondDataset).find(([key2, val2]) => val1[0] === val2[0]);
        //   // console.log(correspondingEntry);
        //   if (correspondingEntry) {
        //     // console.log(val1);
        //     // console.log( correspondingEntry[1][1]);
        //     const dividedValue = val1[1] / correspondingEntry[1][1];
        //     return [val1[0], dividedValue];
        //   }

        //   return [val1[0] || Object.values(correspondingEntry[0]), null];
        // });

        const dividedData = [];
      
        for (const [timestamp, value] of firstDataset) {
          // console.log(timestamp);
          if (secondDataset.hasOwnProperty(timestamp)) {
            //  console.log(secondDataset[timestamp]);
            console.log(value);
            console.log(secondDataset[timestamp]);
            const dividedValue = value / secondDataset[timestamp];
            dividedData.push([timestamp, dividedValue]);
          } else {
            dividedData.push([timestamp, null]);
          }
        }

        summedData = dividedData;
        // console.log(summedData);
      }

      summedDataArray = Object.entries(summedData).map(([timestamp, value]) => [
        parseInt(timestamp),
        value,
      ]);

      //sort
      summedDataArray.sort((a, b) => a[0] - b[0]);

      //get rid of -
      adjustedData = adjustedData.map((arr, index) =>
        arr.map((innerArr) => [innerArr[0], Math.abs(innerArr[1])])
      );

      names.unshift(chartToCreateName);
      namesForTag.unshift(chartToCreateName);
      adjustedData.unshift(summedDataArray);
      units.unshift(units[0]);
      comparisonChartNameIndex++;
    } else if (use == "case3" || use == "case4" ) {
  
     
      
      const firstDataset = adjustedData[0];
      const secondDataset = adjustedData[1];

          
      summedData = [];
      firstDataset.forEach(([timestamp, value]) => {
        const correspondingValue = secondDataset.find(
          (data) => data[0] === timestamp
        )?.[1];

        if (correspondingValue !== undefined) {
       
          const dividedValue = value / correspondingValue;
      
          summedData.push([timestamp, dividedValue]);
        }
      });
   
    } else if(use == "case5"){

      let numberOfChartsToMake = adjustedData.length;
  
    
      let newCharts = [];

      for(let i = 0, j = 1; i < numberOfChartsToMake; i += 2, j += 2){
     
        let nominatorData = adjustedData[i];
        let denominatorData = adjustedData[j];

        let newChart = [];
        nominatorData.forEach(datapoint1 => {
          const timestamp1 = datapoint1[0];
          const value1 = datapoint1[1];

          const matchingDataPoint2 = denominatorData.find(datapoint2 => datapoint2[0] == timestamp1);
          if(matchingDataPoint2){
            const value2 = matchingDataPoint2[1];

            const result = value1 / value2;

            const newDataPoint = [timestamp1, result];
            

            newChart.push(newDataPoint);

          }

        })
        newCharts.push(newChart);

    }

    adjustedData = newCharts;
    units = newUnits;
    names = chartToCreateName;
    use = "enumerate";

  }
    
 
  }
 
  //if there is a comparison chart, extract it from orignal array if not, skip
  //this is due to different units

  if (comparisonChartName != null) {
    comparionChartData = adjustedData[comparisonChartNameIndex];
    adjustedData = adjustedData.slice(0, comparisonChartNameIndex);
    names = names.slice(0, comparisonChartNameIndex);
    comparionChartData.sort((a, b) => a[0] - b[0]);
  }


  if(use == "case3"){
    adjustedData.shift();
    units.shift();
    names.shift();
    namesForTag.shift();

    adjustedData.unshift(summedData);
    units.unshift("percent");
    names.unshift(chartToCreateName);
    namesForTag.unshift(chartToCreateName);
    use = "compare";

  } else if(use == "case4"){
    adjustedData.shift();
    units.shift();
    names.shift(); 
    namesForTag.shift();
    adjustedData.shift();
    units.shift();
    names.shift();
    namesForTag.shift();

    adjustedData.unshift(summedData);
    units.unshift("percent");
    names.unshift(chartToCreateName);
    namesForTag.unshift(chartToCreateName);
    use = "compare";
  } 

  //in case where first data is empty
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
  if (use == "case1") {
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
     
      },
    subtitle: {
      text: "Sources : " + uniqueSources
  },

      series: [
        ...adjustedData.map((dataset, index) => ({
          name: names[index],
          legendName : namesForTag[index],
          data: dataset,

          yAxis: 0,
        })),
        {
          name: comparisonChartName,
          data: comparionChartData,
          // Other properties for Series 1
          yAxis: 1,
          //  linkedTo: 0,
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
        {
          title: {
            text: units[comparisonChartNameIndex],
          },
          height: "100%",
          opposite: true, // Position on the right
        },
      ],

      tooltip: {
      
        xDateFormat: "%Y-%m-%d",
      },

      //   navigator: {
      //     enabled: false
      // },
      // scrollbar: {
      //     enabled: false
      // },
      rangeSelector: {
        selected: 4, // Set the default range (0 = first, 1 = second, etc.)
        buttons: [
          {
            type: "day",
            count: 1,
            text: "1d",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "year",
            count: 1,
            text: "2y",
          },
          {
            type: "year",
            count: 2,
            text: "5y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

      legend: {
        labelFormatter: function() {
          // Get the index of the series
          const seriesIndex = this.chart.series.indexOf(this);
          
          // Use the custom name if available, otherwise use the original series name
          const name = namesForTag[seriesIndex] || this.name;
          
          return name;
        },
        enabled: true, // Set enabled to true to show legends
      },
    };
  }
  // title: "Nominal Comparison of SP500, Oil, Gold",
  else if (use == "case2") {
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
     
      },
    subtitle: {
      text: "Sources : " + uniqueSources
  },
      series: [
        ...adjustedData.map((dataset, index) => ({
          name: names[index],
          data: dataset,

          yAxis: index === 0 ? 0 : 1, // Alternate between the two y-axes
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
        {
          title: {
            text: units[1],
          },
          height: "100%",
          opposite: true, // Position on the right
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
        labelFormatter: function() {
          // Get the index of the series
          const seriesIndex = this.chart.series.indexOf(this);
          
          // Use the custom name if available, otherwise use the original series name
          const name = namesForTag[seriesIndex] || this.name;
          
          return name;
        },
        enabled: true, // Set enabled to true to show legends
      },
    };
  }
  //"US Government Expenditure Interest Rate and % of GDP", -> same as compare tho
  else if (use == "compare") {
    //case for comparing two graphs with same y-axis
    if (!adjustYaxis) {
      chartOptions = {
        title: {
          text: title,
        },
        credits: {
          enabled: false,
       
        },
      subtitle: {
        text: "Sources : " + uniqueSources
    },
        series: [
          ...adjustedData.map((dataset, index) => ({
            name: names[index],
            data: dataset,

            yAxis: 0,
            // connectNulls: false
          })),
          {
            name: comparisonChartName,
            data: comparionChartData,
            // connectNulls: false
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
          labelFormatter: function() {
            // Get the index of the series
            const seriesIndex = this.chart.series.indexOf(this);
            
            // Use the custom name if available, otherwise use the original series name
            const name = namesForTag[seriesIndex] || this.name;
            
            return name;
          },
          enabled: true, // Set enabled to true to show legends
        },
      };
    } else {
    
      //case for comparing two graphs with different y-axis
      chartOptions = {
        title: {
          text: title,
        },
        credits: {
          enabled: false,
       
        },
      subtitle: {
        text: "Sources : " + uniqueSources
    },
        series: [
          ...adjustedData.map((dataset, index) => ({
            name: names[index],
            data: dataset,
            yAxis: index,
            // connectNulls: false
          })),
          {
            name: comparisonChartName,
            data: comparionChartData,
            yAxis: 1,
            // connectNulls: false
          },
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
          {
            title: {
              text: units[1],
            },
            // linkedTo : 0,
            height: "100%",
            // alignTicks : false,
            opposite: true, // Position on the left
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
        labelFormatter: function() {
          // Get the index of the series
          const seriesIndex = this.chart.series.indexOf(this);
          
          // Use the custom name if available, otherwise use the original series name
          const name = namesForTag[seriesIndex] || this.name;
          
          return name;
        },
        enabled: true, // Set enabled to true to show legends
      },
      };
    }
    //enumerate case
  }else if(use == "diff_format"){
  
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
     
      },
    subtitle: {
      text: "Sources : " + uniqueSources
  },
      series: [
        ...adjustedData.map((dataset, index) => ({
          name: names[index],
          data: dataset,
          yAxis: index,
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
        {
          title: {
            text: units[1],
          },
          // linkedTo : 0,
          height: "100%",
          // alignTicks : false,
          opposite: true, // Position on the left
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
        labelFormatter: function() {
          // Get the index of the series
          const seriesIndex = this.chart.series.indexOf(this);
          
          // Use the custom name if available, otherwise use the original series name
          const name = namesForTag[seriesIndex] || this.name;
          
          return name;
        },
        enabled: true, // Set enabled to true to show legends
      },
    };
  } else {
    //case for comparing two graphs with different y-axis(or same)
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
     
      },
    subtitle: {
      text: "Sources : " + uniqueSources
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
        selected: 3, // Set the default range (0 = first, 1 = second, etc.)
        buttons: [
          {
            type: "day",
            count: 10,
            text: "1d",
          },
          {
            type: "week",
            count: 10,
            text: "1w",
          },
          {
            type: "month",
            count: 10,
            text: "1m",
          },
          {
            type: "year",
            count: 5,
            text: "2y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

    
      legend: {
        labelFormatter: function() {
          // Get the index of the series
          const seriesIndex = this.chart.series.indexOf(this);
          
          // Use the custom name if available, otherwise use the original series name
          const name = namesForTag[seriesIndex] || this.name;
          
          return name;
        },
        enabled: true, // Set enabled to true to show legends
      },
    };
  }

  // Render the chart in the chart container element
  Highcharts.stockChart(newChartContainer, chartOptions);

  // chart.exportChart({
  //   filename: 'chart-preview',
  //   type: 'image/png',
  //   width: 800, // Specify the desired width for the preview
  //   height : 400,
  //   // scale: 4, // Adjust the s
  //   callback: function (base64) {
  //     // Create an <img> element to display the preview
  //     var img = document.createElement('img');
  //     img.src = base64;
  //     document.body.appendChild(img);
  //   }
  // });

  // const container = document.getElementById("chart-container");
  // var newChartContainer = document.createElement("div");
  // newChartContainer.className = "chart-container-" + eiaTableName;
  // newChartContainer.id = "chart-container-" + eiaTableName;
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "1000px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

  // let exportImage = Highcharts.chart(newChartContainer, chartOptions);
  // exportImage.exportChart();
}
