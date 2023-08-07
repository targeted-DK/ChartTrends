import moment from "moment";

export function parseDataForHighChart(json) {
  // let jsonData = Object.assign({}, json.data);
 
  let convertedDataList = [];

  //extract cftc data that graphs requires
  let cftcIndices = json.sources.map((item, i) => item.includes("CFTC") ? i : '').filter(String);
  //dynamic property access  
  let cftcColumnName = cftcIndices.map(index => {
    let columnName = json.columnsToUse[index];
    
    return columnName
  });

  for(let i = 0; i < cftcColumnName.length; i++){
    console.log(cftcColumnName[i]);
    cftcColumnName[i].push("date");
  }
   
  cftcIndices.forEach(index__ => {
    json.names[index__]  = json.names[index__] + " " + cftcColumnName[0][0];
    json.namesForTag[index__]  = json.namesForTag[index__] + " " + cftcColumnName[0][0];


    let item = json.values[index__];
    let extractedData = [];
    item.forEach((obj, index_) => {

     
      let transformedObj = {};
  
      // cftcColumnName is contained in an array, so destruct array by [0]
      cftcColumnName[0].forEach((col, index) => {
        if(col != "date"){
          transformedObj["value"] = obj[col];
        } else {
          transformedObj[col] = obj[col];
        }
        transformedObj["id"] = index_
       
      });
      extractedData.push(transformedObj);
    
    });

    extractedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    json.values[index__] = extractedData
  })


  for (let data of json.values) {
    let convertedData = convertRDSDateFormatToHighCharts(data,  cftcColumnName[0]);

    convertedDataList.push(convertedData);
  }

  json.values = convertedDataList;
  let chartOptions = createHighChartsOptions(json);

  return chartOptions;
}

export default parseDataForHighChart;

function convertRDSDateFormatToHighCharts(dataFromRds, cftcColumnName) {
  if (dataFromRds == []) {
    return [];
  }


 
  //convert and sort
  const convertedData = dataFromRds.map((item, index) => {
    const milliseconds = Date.parse(item.date);
      
    let result;
    // if(item.value == null){
    //   result = [milliseconds, item[cftcColumnName]];
    //   // console.log( item[cftcColumnName]);
    // } else {
      result = [milliseconds, item.value];
    // }
   

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
function createHighChartsOptions(jsonData) {
 
  let title = jsonData.title;
  let names = [...jsonData.names];
  let namesForTag = [...jsonData.namesForTag];
  let comparisonChartName = jsonData.comparisonChartName;
  let frequency = jsonData.frequency[0];
  let chartToCreate = jsonData.chartToCreate;
  let chartToCreateName = jsonData.chartToCreateName;
  let numChartToCreate = jsonData.numChartToCreate;
  let chartMethod = jsonData.chartMethod;
  let yaxistype = jsonData.yaxistype;
  let sources = [...jsonData.sources];
  let uniqueSources = [...new Set(sources)];
  let units = [...jsonData.units];
  let use = jsonData.use;
  let adjustYaxis = jsonData.adjustYaxis;
  let newUnits = jsonData.newUnits;
  let colors = jsonData.colors;
  let comparisonChartNameIndex =
    Object.values(names).indexOf(comparisonChartName) !==
    Object.values(names).lastIndexOf(comparisonChartName)
      ? Object.values(names).lastIndexOf(comparisonChartName)
      : Object.values(names).indexOf(comparisonChartName);
  let desiredDay = "Wednesday"; //Used to align timestamp - some weekly data records on friday. Use Wendesday since its default value for many weekly indicators

  let alignedData = jsonData.values;
  //this variable is later used in case4 to create new array of chart data after creating new ones.
  let totalChartsUsed = 0;

  //@TODO - comparisonChartName still uses tag, not a real name
  // names = namesForTag;
  // comparisonChartName = namesForTag[comparisonChartNameIndex];
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
      } else if (chartMethod == "Subtraction") {
        adjustedData.forEach((dataset) => {
          dataset.forEach(([timestamp, value]) => {
            if (summedData.hasOwnProperty(timestamp)) {
              summedData[timestamp] -= value;
            } else {
              summedData[timestamp] = -value;
            }
          });
        });
      } else if (chartMethod == "Multiplication") {
        let firstDataset = Object.values(adjustedData[0]).sort(
          (a, b) => a[0] - b[0]
        );
        let secondDataset = Object.values(adjustedData[1]).sort(
          (a, b) => a[0] - b[0]
        );

        const multipliedData = [];

        for (const [timestamp, value] of firstDataset) {
          if (secondDataset.hasOwnProperty(timestamp)) {
            const multipliedValue = value * secondDataset[timestamp];
            multipliedData.push([timestamp, multipliedValue]);
          } else {
            multipliedData.push([timestamp, null]);
          }
        }

        summedData = multipliedData;
      } else if (chartMethod == "Division") {
        let firstDataset = Object.values(adjustedData[0]).sort(
          (a, b) => a[0] - b[0]
        );
        let secondDataset = Object.values(adjustedData[1]).sort(
          (a, b) => a[0] - b[0]
        );

        const dividedData = [];

        for (const [timestamp, value] of firstDataset) {
          // console.log(timestamp);
          if (secondDataset.hasOwnProperty(timestamp)) {
            //  console.log(secondDataset[timestamp]);

            const dividedValue = value / secondDataset[timestamp];
            dividedData.push([timestamp, dividedValue]);
          } else {
            dividedData.push([timestamp, null]);
          }
        }

        summedData = dividedData;
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
    } else if (use == "case3" || use == "case4") {
      summedData = [];

    

      // console.log(lastElements);
   
      for (let i = 0; i < numChartToCreate; i++) {
        
        let numberOfOperations = chartMethod[i].length;
        // let numberOfPreviousOperations;
        // if( i > 0){
        //   numberOfPreviousOperations = chartMethod[i-1].length
        //   console.log(numberOfPreviousOperations);
        // }
        totalChartsUsed += (numberOfOperations+1);
          let chartNum;
        if(i == 0){
          chartNum = 0 + i * (numberOfOperations + 1); 
        } else {
        chartNum = 0 + i * (chartMethod[i-1].length + 1); 
        }
       
       
        let previousDataset = adjustedData[chartNum];
        let temp = [];
    
        for (let j = 0; j < chartMethod[i].length; j++) {
          let currentOperation = chartMethod[i][j];
          let currentDataset = adjustedData[chartNum + j + 1];
          // console.log(currentOperation);
          //   console.log(chartNum + j + 1);
          let calculatedDataset = [];
         
          previousDataset.forEach(([timestamp, value]) => {
            const correspondingValue = currentDataset.find(
              (data) => data[0] === timestamp
            )?.[1];
           
          
            let calculatedValue;
            if (correspondingValue !== undefined) {
              
              if (currentOperation == "Division") {
                calculatedValue = value / correspondingValue;
              } else if (currentOperation == "Addition") {
                calculatedValue = value + correspondingValue;
              } else if (currentOperation == "Subtraction") {
                calculatedValue = value - correspondingValue;
              } else if (currentOperation == "Multiplication") {
                calculatedValue = value * correspondingValue;
              }

              calculatedDataset.push([timestamp, calculatedValue]);
            }
          });
        
          previousDataset = calculatedDataset;
          temp = calculatedDataset; 

       
        }
        summedData.push(temp);
        
      }

      
    } else if (use == "case5") {
      let newCharts = [];

      for (let i = 0; i < numChartToCreate; i++) {
        let chartNum = i * 2;
        let nominatorData = adjustedData[chartNum];
        let denominatorData = adjustedData[chartNum + 1];

        let newChart = [];
        nominatorData.forEach((datapoint1) => {
          const timestamp1 = datapoint1[0];
          const value1 = datapoint1[1];

          const matchingDataPoint2 = denominatorData.find(
            (datapoint2) => datapoint2[0] == timestamp1
          );
          if (matchingDataPoint2) {
            const value2 = matchingDataPoint2[1];

            const result = value1 / value2;

            if (result != Infinity) {
              const newDataPoint = [timestamp1, result];
              newChart.push(newDataPoint);
            }
          }
        });
        newCharts.push(newChart);
      }

      adjustedData = newCharts;
      units = newUnits;
      names = chartToCreateName;
      use = "enumerate";
    } else if(use == "case6"){
      
    }
  }

  //final data consolidation
  //if there is a comparison chart, extract it from orignal array if not, skip
  //this is due to different units
  if (comparisonChartName != null) {
    comparionChartData = adjustedData[comparisonChartNameIndex];
    comparisonChartName = namesForTag[comparisonChartNameIndex];

    adjustedData = adjustedData.slice(0, comparisonChartNameIndex);
    names = names.slice(0, comparisonChartNameIndex);
    // namesForTag = namesForTag.slice(0, comparisonChartNameIndex)
    comparionChartData.sort((a, b) => a[0] - b[0]);
  }

 
  // console.log(names);
  if (use == "case3") {
    adjustedData.pop();
    units.pop();
    names.pop();
    namesForTag.pop();

    // adjustedData.push(summedData);

    // names.push(chartToCreateName);
    // namesForTag.push(chartToCreateName);
    units.push("percent");
    comparionChartData = summedData;
    comparisonChartName = chartToCreateName;
    use = "compare";
  } else if (use == "case4") {
    //delete data that are used to create new charts
   
    // for (let i = 0; i < numChartToCreate * 2; i++) {
    //   adjustedData.shift();
    //   names.shift();
    //   namesForTag.shift();
    // }

    //put new data back
    let finalData = [];
    let finalNames = [];
    let finalNamesForTag = [];
    
    //add created charts
    for (let i = 0; i < numChartToCreate; i++) {
    
      finalData.push(summedData[i]);
      finalNames.push(chartToCreateName[i]);
      finalNamesForTag.push(chartToCreateName[i]);
    }
    //add normal charts
    for(let i = totalChartsUsed; i < adjustedData.length; i++){
    
      finalData.push(adjustedData[i]);
      finalNames.push(names[i]);
      finalNamesForTag.push(namesForTag[i]);
    }

  
    adjustedData = finalData;
    names = finalNames;
    namesForTag = finalNamesForTag;
    // console.log(adjustedData);
    // console.log(names);
    // console.log(namesForTag);
    //이름 같은경우엔 names, chartToCreateName
    //레전드같은 경우엔 namesForTag에 다 포함

    comparisonChartNameIndex = numChartToCreate;

   
    use = "compare";
  }

  let chartOptions = "";
  //special case 1 : SP500_domestic_liquidity_indicator
  if (use == "case1") {
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
        // text: 'Data source: www.example.com',
        // href: 'https://www.example.com'
      },
      subtitle: {
        text: "Sources : " + uniqueSources,
      },
      series: [
        ...adjustedData.map((dataset, index) => ({
          name: names[index],

          // legendName : namesForTag[index],
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
            count: 60,
            text: "1d",
          },
          {
            type: "month",
            count: 6,
            text: "1m",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "year",
            count: 5,
            text: "5y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

      legend: {
        enabled: true, // Set enabled to true to show legends
        legendTags: namesForTag,
        // labelFormatter:
        // function() {
        //   // Get the index of the series

        //   const seriesIndex = this.chart.series.indexOf(this);

        //   // Use the custom name if available, otherwise use the original series name
        //   const name = namesForTag[seriesIndex] || this.name;

        //   return name;
        // },
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
        // text: 'Data source: www.example.com',
        // href: 'https://www.example.com'
      },
      subtitle: {
        text: "Sources : " + uniqueSources,
      },
      series: [
        ...adjustedData.map((dataset, index) => ({
          name: names[index],
          data: dataset,

          yAxis: yaxistype[index],
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
        selected: 4, // Set the default range (0 = first, 1 = second, etc.)
        buttons: [
          {
            type: "day",
            count: 20,
            text: "1d",
          },
          {
            type: "month",
            count: 6,
            text: "1m",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "year",
            count: 5,
            text: "5y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

      legend: {
        legendTags: namesForTag,
        // labelFormatter: function() {
        //   // Get the index of the series
        //   const seriesIndex = this.chart.series.indexOf(this);

        //   // Use the custom name if available, otherwise use the original series name
        //   const name = namesForTag[seriesIndex] || this.name;

        //   return name;
        // },
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
          // text: 'Data source: www.example.com',
          // href: 'https://www.example.com'
        },
        subtitle: {
          text: "Sources : " + uniqueSources,
        },
        series: [
          ...adjustedData.map((dataset, index) => ({
            name: names[index],
            data: dataset,
            yAxis: yaxistype[index],
            // connectNulls: false
          })),
          {
            name: comparisonChartName,
            data: comparionChartData,
            yAxis: yaxistype[comparisonChartNameIndex],
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
          selected: 4, // Set the default range (0 = first, 1 = second, etc.)
          buttons: [
            {
              type: "day",
              count: 20,
              text: "1d",
            },
            {
              type: "month",
              count: 6,
              text: "1m",
            },
            {
              type: "year",
              count: 1,
              text: "1y",
            },
            {
              type: "year",
              count: 5,
              text: "5y",
            },
            {
              type: "all",
              text: "All",
            },
          ],
        },
        colors: colors,

        legend: {
          // labelFormatter: function() {
          //   // Get the index of the series
          //   const seriesIndex = this.chart.series.indexOf(this);

          //   // Use the custom name if available, otherwise use the original series name
          //   const name = namesForTag[seriesIndex] || this.name;

          //   return name;
          // },
          legendTags: namesForTag,
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
          // text: 'Data source: www.example.com',
          // href: 'https://www.example.com'
        },
        subtitle: {
          text: "Sources : " + uniqueSources,
        },
        series: [
          ...adjustedData.map((dataset, index) => ({
            name: names[index],
            data: dataset,
            yAxis: yaxistype[index],
            // connectNulls: false
          })),
          {
            name: comparisonChartName,
            data: comparionChartData,
            yAxis: yaxistype[comparisonChartNameIndex],
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
          selected: 4, // Set the default range (0 = first, 1 = second, etc.)
          buttons: [
            {
              type: "day",
              count: 20,
              text: "1d",
            },
            {
              type: "month",
              count: 6,
              text: "1m",
            },
            {
              type: "year",
              count: 1,
              text: "1y",
            },
            {
              type: "year",
              count: 5,
              text: "5y",
            },
            {
              type: "all",
              text: "All",
            },
          ],
        },
        colors: colors,
        legend: {
          // labelFormatter:

          // function() {
          //   // Get the index of the series
          //   const seriesIndex = 1;

          //   // Use the custom name if available, otherwise use the original series name
          //   const name = namesForTag[seriesIndex] || this.name;

          //   return name;
          // },
          legendTags: namesForTag,
          enabled: true, // Set enabled to true to show legends
        },
      };
    }
    //enumerate case
  } else if (use == "diff_format") {
    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
      },
      subtitle: {
        text: "Sources : " + uniqueSources,
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
        selected: 4, // Set the default range (0 = first, 1 = second, etc.)
        buttons: [
          {
            type: "day",
            count: 20,
            text: "1d",
          },
          {
            type: "month",
            count: 6,
            text: "1m",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "year",
            count: 5,
            text: "5y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

      colors: colors,
      legend: {
        // labelFormatter: function() {
        //   // Get the index of the series
        //   const seriesIndex = this.chart.series.indexOf(this);

        //   // Use the custom name if available, otherwise use the original series name
        //   const name = namesForTag[seriesIndex] || this.name;

        //   return name;
        // },
        legendTags: namesForTag,
        enabled: true, // Set enabled to true to show legends
      },
    };
  } else {
    //case for comparing two graphs with different y-axis(or same)
    //enumerate case

    chartOptions = {
      title: {
        text: title,
      },
      credits: {
        enabled: false,
        // text: 'Data source: www.example.com',
        // href: 'https://www.example.com'
      },
      subtitle: {
        text: "Sources : " + uniqueSources,
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
            count: 20,
            text: "1d",
          },
          {
            type: "month",
            count: 6,
            text: "1m",
          },
          {
            type: "year",
            count: 1,
            text: "1y",
          },
          {
            type: "year",
            count: 5,
            text: "5y",
          },
          {
            type: "all",
            text: "All",
          },
        ],
      },

      colors: colors,

      legend: {
        // labelFormatter: function() {
        //   // Get the index of the series

        //   const seriesIndex = this.chart.index;

        //   // Use the custom name if available, otherwise use the original series name
        //   const name = namesForTag[seriesIndex] || this.name;

        //   return name;
        // },
        legendTags: namesForTag,
        enabled: true, // Set enabled to true to show legends
      },
    };
  }
  return chartOptions;
}
