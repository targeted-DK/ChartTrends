//a file that runs when /chart/chartName runs on the client
//sends selected number of other data(or all) to python file to run comparison algorithms
// import { PythonShell } from "python-shell";

var dataset = JSON.parse(localStorage.getItem("fredDataList"));
var listContainer = document.getElementById("compare-list-container");
// var chartContainer = document.getElementById("chart-container");
let fredTag = tag;
// Fetch data from a backend API

//@TODO - change frequency depending on user input?
axios
  .post("/runPython", {
    use: "FRED",
    tag: fredTag,
    frequency: "m",
    transformation: "lin",
    aggregation: "avg",
  })
  .then((response) => {
    let dataFromPython = response.data;

    let parsedData = JSON.parse(dataFromPython.replace(/'/g, '"'));

    // Get the container element
    const container = document.getElementById("compare-list-container");

    // Create the table element
    const table = document.createElement("table");

    // Create the table headers
    const headers = [
      "Time Series",
      // "Pearson",
      // "Spearman",
      // "Kendall",
      "Dynamic Time Warp",
    ];

    
    // const headerRow = document.createElement("tr");

    // for (const header of headers) {

    //   const th = document.createElement("th");
    //   const text = document.createTextNode(header);
    //   th.appendChild(text);
    //   headerRow.appendChild(th);
    // }

    // table.appendChild(headerRow);
    // table.style.margin = "auto";
    container.appendChild(table);
    


    let needToSort = [];
    // console.log(parsedData);
    for (const key in parsedData) {
      
        needToSort.push([key, parsedData[key].dtw])
       
      }

    //lower dtw value = similar, higher dtw value = different
    let sortedDataByDtw = needToSort.sort((a,b) => a[1] - b[1]);

    let topFiveSimilarData = sortedDataByDtw.slice(0,5);
    let bottomFiveSimilarData = sortedDataByDtw.slice(-5);
    bottomFiveSimilarData.sort((a,b) => b[1] - a[1]);
    
      
    const headerRow = document.createElement("tr");
    const mostSimilarCellHeader = document.createElement("th");
    mostSimilarCellHeader.id = "mostSimilarHeader";
    let text = document.createTextNode("Most Similar");
    mostSimilarCellHeader.appendChild(text);

    const leastSimilarCellHeader = document.createElement("th");
    leastSimilarCellHeader.id = "mostSimilarHeader";
    text = document.createTextNode("Least Similar");
    leastSimilarCellHeader.appendChild(text);
    
   // Set the colspan attribute for the header cells
   mostSimilarCellHeader.setAttribute("colspan", "2");
   leastSimilarCellHeader.setAttribute("colspan", "2");

  
    headerRow.appendChild(mostSimilarCellHeader); 
    headerRow.appendChild(leastSimilarCellHeader);
    
    table.appendChild(headerRow)



    for(let i = 0; i < topFiveSimilarData.length; i++){
      

      // Create a new row for each data entry
      const row = document.createElement("tr");
    
      
        const mostSimilarKeyCellLink = document.createElement("a");
        mostSimilarKeyCellLink.innerText = topFiveSimilarData[i][0];
        mostSimilarKeyCellLink.href = "/chart/" + topFiveSimilarData[i][0];
      
        row.appendChild(mostSimilarKeyCellLink);

        const mostSimilarValueCell = document.createElement("td");
        mostSimilarValueCell.innerText = topFiveSimilarData[i][1];
        row.appendChild(mostSimilarValueCell);

          
        const leastSimilarKeyCellLink = document.createElement("a");
     
        leastSimilarKeyCellLink.innerText = bottomFiveSimilarData[i][0];
        leastSimilarKeyCellLink.href = "/chart/" + bottomFiveSimilarData[i][0];
        row.appendChild(leastSimilarKeyCellLink);

        const leastSimilarValueCell = document.createElement("td");
        leastSimilarValueCell.innerText = bottomFiveSimilarData[i][1];
        row.appendChild(leastSimilarValueCell);

     
      // Append the row to the table
      table.appendChild(row);

    }

      
    

  //---------------------------------------------------------------------------------------------
    // for (const key in parsedData) {
    //   if (parsedData[key].error != null) {
       
    //     continue;
    //   }

    //   const row = document.createElement("tr");

    //   // Time Series cell
    //   const timeSeriesCell = document.createElement("td");
    //   const link = document.createElement("a");
    //   link.innerText = key;
    //   link.href = "/chart/" + key;
    //   timeSeriesCell.appendChild(link);
    //   row.appendChild(timeSeriesCell);

      // // Pearson cell
      // const pearsonCell = document.createElement("td");
      // const pearsonText = document.createTextNode(parsedData[key].pearson);
      // pearsonCell.appendChild(pearsonText);
      // row.appendChild(pearsonCell);

      // // Spearman cell
      // const spearmanCell = document.createElement("td");
      // const spearmanText = document.createTextNode(parsedData[key].spearman);
      // spearmanCell.appendChild(spearmanText);
      // row.appendChild(spearmanCell);

      // const kendallCell = document.createElement("td");
      // const kendallText = document.createTextNode(parsedData[key].kendall);
      // kendallCell.appendChild(kendallText);
      // row.appendChild(kendallCell);

    //   const dtwCell = document.createElement("td");
    //   const dtwText = document.createTextNode(parsedData[key].dtw);
    //   // console.log(parsedData[key].dtw);
    //   dtwCell.appendChild(dtwText);
    //   row.appendChild(dtwCell);

    //   table.appendChild(row);
    // }
  //---------------------------------------------------------------------------------------------
  
    container.style.backgroundColor = "white";
    container.style.padding = "25px";
    container.style.align = "center";
    container.style.display = "flex";
    container.style.justifyContent =  "center";

    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch((error) => {
    console.log(error);
    // console.error("Error fetching data:", error);
  });

document.addEventListener("DOMContentLoaded", function () {});

//data s
