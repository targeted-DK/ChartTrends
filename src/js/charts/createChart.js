// import Canvas from 'canvas';
// import Chart from 'chart.js/auto';
// import fs from 'fs';
// import { exit } from 'process';
// import directory from '../config/directories.js'
// let count = 0; //number of images in the main page.
// /**
//  * 
//  * @param {} data 
//  * Data is retrieved from the rds, with date, value and fredCode(or names) and saves the chart as an image to the images folder.
//  */
// async function createChart(data) {

//   var canvas = new Canvas.Canvas(800, 600);
//   var ctx = canvas.getContext('2d');
//   var config = setConfig(data);
//   var chart = new Chart(ctx, config);

//   var stream = canvas.createPNGStream();
//   //don't forget this is a relative path based on app.js location, not drawCharts.js location
//   var out = fs.createWriteStream('./public/static/images/' +  data.tag + '.png');
  
//   stream.pipe(out);
//   out.on('finish', function () {
//     console.log(data.tag + ' chart was saved as an image.');
//   });

// };



// export function setConfig(data){
  
//   let count = 0;
//   const modifiedData = data.map((row, index, array) => {
//     //there is no reference data for the very first record of each dataset so pass.
//     //if value is 0, refer to previous data.
//     //TODO - use average? due to actual value 0.
//     if(row["value"] == 0 && row["id"]> 1){
//       row["value"] = array[index-1]["value"];
    
//       return row;
//     }  
//     return row;
//   });
//   var chartConfig = {
//     type: 'line',
//     data: {
//       labels: modifiedData.map(row => new Date(row['date']).getDate()),
//       datasets: [{
//         label: data.tag,
//         data: modifiedData.map(row => row.value)
//       }],
//       skipNull: true,
//       pointRadius: function(context) {
//         if (context.dataIndex === 1 || context.dataIndex === 4) {
//           // Set the point radius to 0 for the points that are equal to 0
//           return 0;
//         }
//         return 3;
//       },

//     },
//     options: {
//       responsive : true,
//       maintainAspectRatio: false,
//     }
//   };

//   return chartConfig;
// }


// export default createChart;