// import Chart from 'chart.js'
// import * as mysql from "/mysqlRequest.js";
// import {setConfig} from './createChart.js'

// import { getDataFromRDS } from "../routes/requests/mysqlRequest.js";



// var tag = canvas.getAttribute('chartTag');

// var mysqlData = getDataFromRDS(tag);

// console.log(mysqlData);
// var config = setConfig(mysqlData);
// var test = getDataFromRDS();
const canvas = document.getElementById('chart-interactive');
const ctx = canvas.getContext('2d');

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'My First Dataset',
    data: [1,2,3,4,5,6,7],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
};


const myChart = new Chart(ctx, config);


