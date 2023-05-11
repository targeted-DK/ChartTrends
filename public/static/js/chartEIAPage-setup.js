// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here

const path = window.location.pathname;
const chartName = path.split("/").pop();
const eiatag = tag;

let unit;

axios
  .post("/mysqlRequest", {
    //mysql
    use: "EIA",
    //eia
    tag: eiatag,
  })
  .then((response) => {
    if (tag == "DUC") {
      const dataFromRds = response.data.values;
      const names = response.data.names;
      const eiaTableName = response.data.tag;
      let index = 0;
      for (const dataArray of Object.values(dataFromRds)) {
        let convertedData = convertRDSDateFormatToHighCharts(
          dataArray,
          eiaTableName
        );
        convertedData.sort((a, b) => a[0] - b[0]);

        createHighcharts(convertedData, eiaTableName, names[index]);
        index++;
      }
    } else {
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
export function convertRDSDateFormatToHighCharts(
  dataFromRds,
  eiaTableName = ""
) {
  const convertedData = dataFromRds.map((item) => {
    const milliseconds = Date.parse(item.date);

    if (eiaTableName == "DUC") {
      return [milliseconds, item.drilled, item.completed, item.DUC];
    } else {
      return [milliseconds, item.value];
    }
  });
  //   console.log(convertedData);

  return convertedData;
}

/**
 * @param {Array<number, value>} array
 *
 * Creates highchart with given array
 */
export function createHighcharts(convertedData, eiaTableName, catalog = "") {
  const container = document.getElementById("chart-container");
  var newChartContainer = document.createElement("div");

  if(eiaTableName == "DUC"){
    newChartContainer.className = "chart-container-" + catalog;
    newChartContainer.id = "chart-container-" + catalog;
  } else {
    newChartContainer.className = "chart-container-" + eiaTableName;
    newChartContainer.id = "chart-container-" + eiaTableName;
  }
 
  newChartContainer.style.width = "70%";
  newChartContainer.style.height = "400px";
  newChartContainer.style.position = "relative";
  newChartContainer.style.right = "20%";
  newChartContainer.style.left = "20%";

  container.appendChild(newChartContainer);

  //for DUC catalog = only name
  if (eiaTableName == "DUC") {
    Highcharts.stockChart(newChartContainer.className, {
      rangeSelector: {
        selected: 5,
      },
      title: {
        text: catalog,
      },
      yAxis: [
        {
          title: {
            text: "counts",
          },
          top: "15%",
          height: "85%",
        },
      ],

      series: [
        {
          name: "Drilled",
          data: convertedData.map((row) => [row[0], row[1]]),
          yAxis: 0,
        },
        {
          name: "Completed",
          data: convertedData.map((row) => [row[0], row[2]]),
          yAxis: 0,
        },
        {
          name: "DUC",
          data: convertedData.map((row) => [row[0], row[3]]),
          yAxis: 0,
        },
      ],
      tooltip: {
        xDateFormat: "%Y-%m-%d",
      },

      legend: {
        enabled: true, // Set enabled to true to show legends
      },
    });
    return;
  }

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
        data: convertedData,
        id: "dataseries",
        tooltip: {
          valueDecimals: 4,
        },
      },
    ],
  });
}
