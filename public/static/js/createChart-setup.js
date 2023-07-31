let fredTag = tag;
/**
 * @param {Array<{id: number, date: string, value: nubmer}>} array 
 * @return {Array<number, value>} array 
 * 
 * Drops id, and parameter names, and convert date into miliseconds.
 */
export function convertRDSDateFormatToHighCharts(dataFromRds){
   
  
    const convertedData = dataFromRds.map((item) => {
        const milliseconds = Date.parse(item.date);
        
        return [milliseconds, item.value];
      });
    //   console.log(convertedData);

  
      return convertedData;
}


/**
 * @param {Array<number, value>} array 
 * 
 * Creates highchart with given array
 */
export function createHighcharts(convertedData) {

    let newChartContainer = document.getElementById("chart-container");
    
        Highcharts.stockChart(newChartContainer, {
            rangeSelector: {
                selected: 1
            },
    
            title: {
                text: fredTag
            },
    
            yAxis: [{
                title: {
                    text: "percentage"
                },
                top: '15%',
                height: '85%'
            }, {
                height: '15%'
            }],
    
            plotOptions: {
                flags: {
                    accessibility: {
                        exposeAsGroupOnly: true,
                        description: 'Flagged events.'
                    }
                },
                // series : {
                //     turboThreshold : 0,
                //     gapSize: 2 // set your desired gapSize here
                // }
            },
    
            series: [{
                // name: unit,
                data: convertedData,
                id: 'dataseries',
                tooltip: {
                    valueDecimals: 4
                },
                // dataGrouping: {
                //     enabled: true,
                //     approximation: 'average',
                    
                //     gapSize: 2 // set your desired gapSize here
                //   }
             
            }]
        });

        newChartContainer.style.width = "70%";
        newChartContainer.style.height = "1000px";
        newChartContainer.style.position = "relative";
        newChartContainer.style.right = "20%";
        newChartContainer.style.left = "20%";
    

    
}

function getTextInfoForChart(){

    
}