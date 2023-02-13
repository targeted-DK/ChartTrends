// import Chart from 'chart.js/auto';

var test1 = [
  '1962-01-02', '1962-01-03', '1962-01-04', '1962-01-05', '1962-01-08',
  '1962-01-09', '1962-01-10', '1962-01-11', '1962-01-12', '1962-01-15',
  '1962-01-16', '1962-01-17', '1962-01-18', '1962-01-19', '1962-01-22',
  '1962-01-23', '1962-01-24', '1962-01-25', '1962-01-26', '1962-01-29', ];
  var test2 = [
  '4.06', '4.03', '3.99', '4.02', '4.03', '4.05', '4.07',
  '4.08', '4.08', '4.10', '4.13', '4.12', '4.11', '4.11',
  '4.09', '4.11', '4.10', '4.11', '4.11', '4.12', '4.11',
  '4.10', '4.09'];

async function createChart(data){
    console.log("Test Button clicked to draw a chart");

    // new Chart(
    //     document.getElementById('test'),
    //     {
    //       type: 'line',
    //       options: {
    //         animation: false,
    //         plugins: {
    //           legend: {
    //             display: false
    //           },
    //           tooltip: {
    //             enabled: false
    //           }
    //         }
    //       },
    //       data: {
    //         labels: test1.map(row => row.year),
    //         datasets: [
    //           {
    //             label: 'Acquisitions by year',
    //             data: test2.map(row => row.count)
    //           }
    //         ]
    //       }
    //     }
    //   );
      console.log("reached the end of drawCharts.js")
     
};

document.getElementById("test").addEventListener("click", createChart);

// export default createChart;