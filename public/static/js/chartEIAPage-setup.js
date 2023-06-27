// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here

const path = window.location.pathname;
const chartName = path.split("/").pop();
const eiatag = tag;
const subcategory = sub;


let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "EIA",
    //eia
    tag: eiatag,
    //special cases for duc, drilled, completed
    subcategory : subcategory
  })
  .then((response) => {
  
    if (subcategory == "DUC" || subcategory == "completed" || subcategory == "drilled") {
      const dataFromRds = response.data.values;
      const names = response.data.names;
      const eiaTag = response.data.tag;
      
      let index = 0;
      for (const dataArray of Object.values(dataFromRds)) {
        let convertedData = convertRDSDateFormatToFiveYearHighCharts(
          dataArray,
          eiaTag,
          subcategory
        );

     
        // convertedData.sort((a, b) => a[0] - b[0]);
        let regionName = names[index];
       
        regionName = (subcategory === 'drilled' ? 'Drilled Wells '  + regionName.substring(4)  : subcategory === 'completed' ? 'Completed Wells ' + regionName.substring(4) : 'DUC(Drilled but Uncompleted) ' +  regionName.substring(4));

        createHighcharts(convertedData, eiaTag, subcategory, regionName);
        index++;
      }
    } else {
     
    
      const dataFromRds = response.data.values;
      const names = response.data.names;
      const eiaTag = response.data.tag;
      const units = response.data.units;
    
  
      let count = 0;
      for (const dataArray of Object.values(dataFromRds)) {
        const tableName = names[count];
        const unit = units[count]
       
        const convertedData = convertRDSDateFormatToFiveYearHighCharts(dataArray, eiaTag, subcategory);
        createHighcharts(convertedData, eiaTag, subcategory, tableName, unit);
        count++;
      }
    }

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
export function convertRDSDateFormatToFiveYearHighCharts(
  dataFromRds,
  eiaTag = "",
  subcategory = "",
) {

let parsedData;

    if(subcategory == "DUC" || subcategory == "drilled" || subcategory == "completed"){
    
      parsedData = dataFromRds.map(item => ({
        time : new Date(item.date).toISOString().split('T')[0],
        value: item.DUC || item.drilled || item.completed
      }));
    } else if(subcategory == "demand" || subcategory == "export" || subcategory == "import" || subcategory == "stock" || subcategory == "production" || subcategory == "BigThreeProductStorage" || subcategory == "storage"){
 
    parsedData = dataFromRds.map(item => ({
      time : new Date(item.date).toISOString().split('T')[0],
      value: item.value
    }));

  }


let convertedData = {};

// console.log(parsedData);

// Split the data into separate arrays for each year
parsedData.forEach(data => {
  const { time, value } = data;
  const currentYear = new Date(time).getFullYear();
  
  if (convertedData.hasOwnProperty(currentYear)) {
    convertedData[currentYear].push(value);
  } else {
    convertedData[currentYear] = [value];
  }
});

  // console.log(convertedData);
  return convertedData;
}

/**
 * @param {Array<number, value>} array
 *
 * Creates highchart with given array
 */
//or subcategory is tableName
export function createHighcharts(convertedData, eiaTag, subcategory = "", tableName, unit = "count") {
  const container = document.getElementById("chart-container");
  var newChartContainer = document.createElement("div");
 

  newChartContainer.className = "chart-container-" + subcategory;
  newChartContainer.id = "chart-container-" + subcategory;
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "700px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

  container.appendChild(newChartContainer);

  //for DUC subcategory = only name
  // if (subcategory == "DUC" || subcategory == "completed" || subcategory == "drilled") {

     // Extract the data for the recent 5 years
    const currentYear = new Date().getFullYear();
    const numYearsToShow = 5;
    const recentFiveYearData = {};
    const yearList = Array.from({ length: numYearsToShow }, (_, index) => currentYear - numYearsToShow + 1 + index);

  
    let timeline = "";
    if(subcategory == "demand" || subcategory == "export" || subcategory == "import" || subcategory == "stock" || subcategory == "storage"){
      timeline =  Array.from({ length: 53 }, (_, index) => `Week ${index + 1}`);
    } else {
      //DUC, drilled, completed, field production
      timeline = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    

    for(let i = numYearsToShow; i  > 0; i--){
      let year = currentYear - i + 1;
      recentFiveYearData[year] = convertedData[year];
    }

  
      // Create the chart for the current year
      Highcharts.chart(newChartContainer, {
        chart: {
          type: 'line'
        },
        title: {
          text: tableName + ' 5-Year'
        },
        xAxis: {
          categories: timeline
        },
        yAxis: {
          title: {
            text: unit,
          }
        },
        series: Object.entries(recentFiveYearData).map(([year, values]) => ({
          name: year,
          // year: year.toString(),
          data: values,
          marker: {
            enabled: false // Disable the markers
          }
        })),

        tooltip: {
          labelFormatter: function() {


            return yearList[this.index];;
          },
            },
        legend: {
          labelFormatter: function() {


            return yearList[this.index];;
          },
          enabled: true, // Set enabled to true to show legends
        },
      });
      return;

      // {
        //       name: "Drilled",
        //       data: parsedData.map((row) => [row[0], row[1]]),
        //       yAxis: 0,
        //     },
    
  }

//   // console.log(convertedData);
//   Highcharts.stockChart(newChartContainer.className, {
//     rangeSelector: {
//       selected: 1,
//     },

//     title: {
//       text: subcategory,
//     },

//     yAxis: [
//       {
//         title: {
//           text: unit,
//         },
//         top: "15%",
//         height: "85%",
//       },
//       {
//         height: "15%",
//       },
//     ],

//     plotOptions: {
//       flags: {
//         accessibility: {
//           exposeAsGroupOnly: true,
//           description: "Flagged events.",
//         },
//       },
//     },

//     series: [
//       {
//         data: convertedData,
//         id: "dataseries",
//         tooltip: {
//           valueDecimals: 4,
//         },
//       },
//     ],
//   });
// }
