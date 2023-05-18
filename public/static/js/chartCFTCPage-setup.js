// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here

const path = window.location.pathname;
const chartName = path.split("/").pop();
const assetType = tag;

let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "CFTC",
    //eia
    tag: assetType,
  })
  .then((response) => {
    // console.log(response);
    const indicators = response.data.indicators;
    const dataFromRds = response.data.jsonCFTCDataArrays;
    const tagsInIndicators = indicators.map((item) => item.tag);
    const tableNames = Object.keys(dataFromRds);
    let count = 0;

    for (const dataArray of Object.values(dataFromRds)) {
      const CFTCTableName = tableNames[count];
      const tagIndexInIndicators = tagsInIndicators.indexOf(CFTCTableName);

      if (tagIndexInIndicators == -1) {
        count++;
        continue;
      }

      const catalog = indicators[tagIndexInIndicators];

      const convertedData = convertCFTCDateFormatToHighCharts(dataArray);

      let graphnames = Object.keys(convertedData[1]);
      graphnames.pop();
      graphnames.shift();
     
      // let arrays = convertedData.map(obj => properties.map(prop => obj[prop]));
      // ['date', 'open_interest_all', 'm_money_positions_long_all', 'm_money_positions_short_all', 'change_in_m_money_long_all', 'change_in_m_money_short_all']
      const timestamps = convertedData.map((obj) => obj.date);
      const values1 = convertedData.map((obj) => obj.open_interest_all);
      const values2 = convertedData.map((obj) => obj.m_money_positions_long_all);
      const values3 = convertedData.map((obj) => obj.m_money_positions_short_all);
      const values4 = convertedData.map((obj) => obj.change_in_m_money_long_all);
      const values5 = convertedData.map((obj) => obj.change_in_m_money_short_all);
     
    
      let seriesData = [];
      seriesData.push(timestamps)
      seriesData.push(values1)
      seriesData.push(values2)
      seriesData.push(values3)
      seriesData.push(values4)
      seriesData.push(values5)
     
  
      createHighcharts(seriesData, graphnames, CFTCTableName, catalog);
      count++;
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
export function convertCFTCDateFormatToHighCharts(dataFromRds) {
  const convertedData = dataFromRds.map((item) => {
    const milliseconds = Date.parse(item.date);
    item.date = milliseconds;

    return item;
  });
  //   console.log(convertedData);
  convertedData.sort((a, b) => a.date - b.date);
  return convertedData;
}

/**
 * @param {Array<number, value>} array
 *
 * Creates highchart with given array
 */
export function createHighcharts(
  seriesData,
  graphnames,
  cftcTableName,
  catalog
) {
  const container = document.getElementById("chart-container");
  var newChartContainer = document.createElement("div");
  newChartContainer.className = "chart-container-" + cftcTableName;
  newChartContainer.id = "chart-container-" + cftcTableName;
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "600px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

  container.appendChild(newChartContainer);

  const date = seriesData[0];
  seriesData.shift();
  graphnames.shift();

  console.log(seriesData);
  Highcharts.stockChart(newChartContainer.className, {
    

    title: {
      text: catalog.description,
    },

    xAxis: {
      type: "datetime",
    },
    yAxis: [
      {
        title: {
          text: catalog.units,
        },
        top: "15%",
        height: "85%",
      },
      {
        height: "15%",
      },
    ],

    plotOptions: {
      flags: {
        accessibility: {
          exposeAsGroupOnly: true,
          description: "Flagged events.",
        },
      },
    },

    series: [
      ...seriesData.map((dataset, index) => ({
        name: graphnames[index],
       
        data: dataset.map((value, i) => ({
          x: date[i], // Add the date for each data point
          y: value, // The corresponding value
        }))

        // yAxis: index === 0 ? 0 : 1, // Alternate between the two y-axes
      })),
    ],

    tooltip: {
      xDateFormat: "%Y-%m-%d",
    },

    rangeSelector: {
      selected: 3, // Set the default range (0 = first, 1 = second, etc.)
      buttons: [
        {
          type: "day",
          count: 30,
          text: "1d",
        },
        {
          type: "week",
          count: 10,
          text: "1w",
        },
        {
          type: "month",
          count: 6,
          text: "1m",
        },
        {
          type: "year",
          count: 5,
          text: "1y",
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
  });
}
