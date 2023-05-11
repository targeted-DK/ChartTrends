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
    console.log(response);
    const indicators = response.data.indicators;
    const dataFromRds = response.data.jsonOilDataArrays;
    const tagsInIndicators = indicators.map((item) => item.tag);
    const tableNames = Object.keys(dataFromRds);
    let count = 0;

    for (const dataArray of Object.values(dataFromRds)) {
      const eiaTableName = tableNames[count];
      const tagIndexInIndicators = tagsInIndicators.indexOf(eiaTableName);

      if (tagIndexInIndicators == -1) {
        count++;
        continue;
      }

      const catalog = indicators[tagIndexInIndicators];

      const convertedData = convertRDSDateFormatToHighCharts(dataArray);
      createHighcharts(convertedData, eiaTableName, catalog);
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
export function convertRDSDateFormatToHighCharts(dataFromRds) {
  const convertedData = dataFromRds.map((item) => {
    const milliseconds = Date.parse(item.date);

    return [milliseconds, item.value];
  });
  //   console.log(convertedData);

  return convertedData;
}


/**
 * @param {Array<number, value>} array
 *
 * Creates highchart with given array
 */
export function createHighcharts(convertedData, eiaTableName, catalog) {
  const container = document.getElementById("chart-container");
  var newChartContainer = document.createElement("div");
  newChartContainer.className = "chart-container-" + eiaTableName;
  newChartContainer.id = "chart-container-" + eiaTableName;
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "400px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

  container.appendChild(newChartContainer);
  Highcharts.stockChart(newChartContainer.className, {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: catalog.description,
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
      {
        // name: unit,
        data: convertedData,
        id: "dataseries",
        tooltip: {
          valueDecimals: 4,
        },
      },
    ],
  });
}
