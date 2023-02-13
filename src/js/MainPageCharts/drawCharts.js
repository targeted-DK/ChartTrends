
import Chart from 'chart.js/auto';
import Canvas from 'canvas';
import fs from 'fs';

/**
 * 
 * @param {} data 
 * Data is retrieved from the rds, with date, value and fredCode(or names) and saves the chart as an image to the images folder.
 */
async function createChart(data){
    
      // var test1 = [
      //   '1962-01-02', '1962-01-03', '1962-01-04', '1962-01-05', '1962-01-08',
      //   '1962-01-09', '1962-01-10', '1962-01-11', '1962-01-12', '1962-01-15',
      //   '1962-01-16', '1962-01-17', '1962-01-18', '1962-01-19', '1962-01-22',
      //   '1962-01-23', '1962-01-24', '1962-01-25', '1962-01-26', '1962-01-29', ];
      //   var test2 = [
      //   '4.06', '4.03', '3.99', '4.02', '4.03', '4.05', '4.07',
      //   '4.08', '4.08', '4.10', '4.13', '4.12', '4.11', '4.11',
      //   '4.09', '4.11', '4.10', '4.11', '4.11', '4.12', '4.11',
      //   '4.10', '4.09'];
        
        // var data = test1.map(function(date, i) {
        //   return {
        //     date: (new Date(date)).getDate(),
        //     value: parseFloat(test2[i])
        //   };
        // });
      // console.log(data);
      var chartObj = new Chart(
        Canvas.createCanvas(400, 400),
        {
          type: 'line',
          data: {
            labels: data.map(row => new Date(row['date']).getDate()),
            datasets: [
              {
                label: data.tag,
                data: data.map(row => row.value)
              }
            ]
          }
        }
      );
      // var image = chartObj.canvas.toDataURL();
      var image = chartObj.toBase64Image();
      fs.open(image);
      fs.writeFileSync('/src/static/images' + '', image.split(';base64,').pop(), 'base64');
};

/**
 * 
 * @param {Chart} chartObject 
 * Saves Chart object as an image.
 */
// function saveChartAsImg(chartObject){
//         var image = chartObject.toBaseImage();
      
// }

//       console.log("reached the end of drawCharts.js")
     
// };

// document.getElementById("test").addEventListener("click", createChart);

export default createChart;