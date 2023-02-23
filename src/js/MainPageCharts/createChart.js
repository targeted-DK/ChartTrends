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
  //don't forget this is a relative path based on app.js location, not drawCharts.js location
  var out = fs.createWriteStream('../public/static/images/' +  data.tag + '.png');
  
  stream.pipe(out);
  out.on('finish', function () {
    console.log(data.tag + ' chart was saved as an image.');
  });

  //image counter (4 max for now)
 
};

export default createChart;

function setConfig(data){
  let filterZeros =  data.filter(value => value !== 0);
  var chartConfig = {
    type: 'line',
    data: {
      labels: filterZeros.map(row => new Date(row['date']).getDate()),
      datasets: [{
        label: data.tag,
        data: filterZeros.map(row => row.value)
      }],
      skipNull: true,
      pointRadius: function(context) {
        if (context.dataIndex === 1 || context.dataIndex === 4) {
          // Set the point radius to 0 for the points that are equal to 0
          return 0;
        }
        return 3;
      },

    },
    options: {
      responsive : true,
      maintainAspectRatio: false,
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  };

  return chartConfig;
}
