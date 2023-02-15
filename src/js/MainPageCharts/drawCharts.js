import Canvas from 'canvas';
import Chart from 'chart.js/auto';
import fs from 'fs';
import directory from '../config/directories.js'
let count = 0; //number of images in the main page.
/**
 * 
 * @param {} data 
 * Data is retrieved from the rds, with date, value and fredCode(or names) and saves the chart as an image to the images folder.
 */
async function createChart(data) {


  // data = fs.readFileSync('../../../errorlogs/Untitled.csv');
  var canvas = new Canvas.Canvas(800, 600);
  var ctx = canvas.getContext('2d');
  var config = setConfig(data);
  var chart = new Chart(ctx, config);

  var stream = canvas.createPNGStream();

  var out = fs.createWriteStream(directory.__imageDir + 'main' + count + '.png');
  count++;
  stream.pipe(out);
  out.on('finish', function () {
    console.log('The chart was saved as an image.');
    if(count == 4){
      count = 0;
    }
  });

  //image counter (4 max for now)
 
};

export default createChart;

function setConfig(data){
  var chartConfig = {
    type: 'line',
    data: {
      labels: data.map(row => new Date(row['date']).getDate()),
      datasets: [{
        label: data.tag,
        data: data.map(row => row.value)
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  return chartConfig;
}
