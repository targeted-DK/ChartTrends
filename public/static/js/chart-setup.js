// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here
// import moment from 'moment'

const path = window.location.pathname;
const category = use;
const chartSubject = tag;

// let unit;

Promise.all([
  axios.post("/openaiRequest", {
    urlendpoint : chartSubject,
  }),
  axios.post("/mysqlRequest", {
    use: category,

    tag: chartSubject,
  }),
])
  .then(([response1, response2]) => {
    const textContainer = document.getElementById("info-text");

    textContainer.innerText = response1.data[0].openai_response;

    let chartOptions = response2.data;
    
    //adding function() in labelformatter disappears during data transmission from back->front
    let legendTags = response2.data.legend.legendTags;

    function customLabelFormatter() {
      const seriesIndex = this.chart.series.indexOf(this);
      const name = legendTags[seriesIndex] || this.name;
      return name;
    }

    chartOptions.legend.labelFormatter = customLabelFormatter;
    //
    // console.log(chartOptions);

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

    Highcharts.stockChart(newChartContainer, chartOptions);

    newChartContainer.style.width = "70%";
    newChartContainer.style.height = "1000px";
    newChartContainer.style.position = "relative";
    newChartContainer.style.right = "20%";
    newChartContainer.style.left = "20%";

    textContainer.style.width = "70%";
    textContainer.style.height = "1000px";
    textContainer.style.position = "relative";
    textContainer.style.right = "20%";
    textContainer.style.left = "20%";
  })
  .then(() => {
    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch((err) => {
    // Handle error
    console.error(err);
  });

// axios
//   .post("/openaiRequest", {
//     tableName: chartSubject,
//   })
//   .then((response) => {

//     console.log(response);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// axios
//   .post("/mysqlRequest", {
//     //no longer setting up chart on the frontend.
//     use: category,
//     //eia
//     tag: chartSubject,
//   })
//   .then((response) => {
//     let chartOptions = response.data;

//     //adding function() in labelformatter disappears during data transmission from back->front
//     let legendTags = response.data.legend.legendTags;

//     function customLabelFormatter() {
//       const seriesIndex = this.chart.series.indexOf(this);
//       const name = legendTags[seriesIndex] || this.name;
//       return name;
//     }

//     chartOptions.legend.labelFormatter = customLabelFormatter;
//     //
//     // console.log(chartOptions);

//     //in case where first data is empty
//     const container = document.getElementById("chart-container");
//     var newChartContainer = document.createElement("div");
//     newChartContainer.className = "chart-container-featured";
//     newChartContainer.id = "chart-container-featured";
//     // newChartContainer.style.width = "70%";
//     // newChartContainer.style.height = "400px";
//     // newChartContainer.style.position = "relative";
//     // newChartContainer.style.right = "20%";
//     // newChartContainer.style.left = "20%";

//     container.appendChild(newChartContainer);

//     Highcharts.stockChart(newChartContainer, chartOptions);

//     newChartContainer.style.width = "70%";
//     newChartContainer.style.height = "1000px";
//     newChartContainer.style.position = "relative";
//     newChartContainer.style.right = "20%";
//     newChartContainer.style.left = "20%";

//     // let exportImage = Highcharts.chart(newChartContainer, chartOptions);
//     // exportImage.exportChart();

//     const loading = document.getElementById("loading");
//     loading.remove();
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
