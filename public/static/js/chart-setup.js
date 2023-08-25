// import { convertRDSDateFormatToHighCharts, createHighcharts } from "./createChart-setup.js";
// I copied code from createChart-setup and added code here
// import moment from 'moment'

const path = window.location.pathname;
const category = use;
const chartSubject = tag;



// const timeout = 5000;
// const timer = setTimeout(() => {
//   console.log("Timeout: Data not received within 5 seconds");
//   // Perform the action you want here
// }, timeoutDuration);


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

    const gptContainer = document.getElementById("gpt-container")
    const gptTextContainer = document.getElementById("gpt-text");
    const gptInfoContainer = document.getElementById("gpt-info");
    gptTextContainer.innerText = response1.data[0].openai_response;
    gptInfoContainer.innerText = "Text generated by chatGPT model gpt-3.5-turbo on " + response1.data[0].last_updated_time.substring(0,10);

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


    container.appendChild(newChartContainer);

    Highcharts.stockChart(newChartContainer, chartOptions);

    //container -> newchartcontainer
    newChartContainer.style.width = "100%";
    newChartContainer.style.height = "1000px";
    newChartContainer.style.position = "relative";
    newChartContainer.style.alignItems = "center";
    // newChartContainer.style.right = "20%";
    // newChartContainer.style.left = "20%";

    //container -> gptContainer -> gpttext/info containers
    gptContainer.style.width = "100%"
    gptTextContainer.style.width = "100%";
    gptTextContainer.style.height = "1000px";
    gptTextContainer.style.position = "relative";
    gptTextContainer.style.alignItems = "center";

    // gptInfoContainer.style.width = "400%";


  })
  .then(() => {
    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch((err) => {
    // Handle error
    console.error(err);
  });
