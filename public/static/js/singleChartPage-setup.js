// import Highcharts from '/highcharts'
// import 'highcharts/modules/data';
// import 'highcharts/modules/exporting';
// import 'highcharts/modules/accessibility';
// import axios from 'axios';
// import units from '/units.js'

import {
  convertRDSDateFormatToHighCharts,
  createHighcharts,
} from "./createChart-setup.js";

const path = window.location.pathname;
const chartName = path.split("/").pop();

let fredTag = tag;
// to use tag variable in python-setup.js
// window.tag = tag;
let dataFromRds;
let unit;
axios
  .post("/mysqlRequest", {
    use: "FRED",
    tag: fredTag,
    transformation: "lin",
    frequency: "m",
    aggregation: "avg",
  })
  .then((response) => {
    dataFromRds = response.data;

    const convertedData = convertRDSDateFormatToHighCharts(dataFromRds);

    createHighcharts(convertedData);
    // unit = units[fredTag];
  })
  .catch(function (error) {
    console.error(error);
  });
