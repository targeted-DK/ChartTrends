//a file that runs when /chart/chartName runs on the client
//sends selected number of other data(or all) to python file to run comparison algorithms
// import { PythonShell } from "python-shell";


var dataset = JSON.parse(localStorage.getItem("fredDataList"));
var listContainer = document.getElementById("compare-list-container");
// var chartContainer = document.getElementById("chart-container");
let fredTag = tag;
// Fetch data from a backend API
axios
  .post("/runPython", {
    use: "FRED",
    tag: fredTag,
    frequency: "m",
    transformation: "lin",
    aggregation: "avg",
  })
  .then((response) => {

    // const ul = document.createElement("ul");
    // ul.textContent = "test";
    // listContainer.appendChild(ul);
    // console.log(res.data[0]);
   
    let dataFromPython = response.data;
    // console.log(dataFromPython);
    let parsedData = JSON.parse(dataFromPython.replace(/'/g, '"'));

   
    // Object.keys(parsedData).forEach((key) => {
    //   const value = parsedData[key];
    //   const listItem = document.createElement("li");
    //   listItem.textContent = `${key}: ${JSON.stringify(value)}`;
    //   listContainer.appendChild(listItem);
    // });

    // console.log(parsedData);
   // Get the container element
const container = document.getElementById("compare-list-container");

// Create the table element
const table = document.createElement("table");

// Create the table headers
const headers = ["Time Series", "Pearson", "Spearman", "Kendall", "Dynamic Time Warp"];
const headerRow = document.createElement("tr");

for (const header of headers) {
  const th = document.createElement("th");
  const text = document.createTextNode(header);
  th.appendChild(text);
  headerRow.appendChild(th);
}

table.appendChild(headerRow);
table.style.margin = "auto";
container.appendChild(table);


for (const key in parsedData) {
  if(parsedData[key].error != null){
    continue;
  }

  const row = document.createElement("tr");

  // Time Series cell
  const timeSeriesCell = document.createElement("td"); 
  const link = document.createElement("a");
  link.innerText = key;
  link.href = "/chart/" + key;
  // const timeSeriesText = document.createTextNode(key);
  timeSeriesCell.appendChild(link);
  row.appendChild(timeSeriesCell);



  // Pearson cell
  const pearsonCell = document.createElement("td");
  const pearsonText = document.createTextNode(parsedData[key].pearson);
  pearsonCell.appendChild(pearsonText);
  row.appendChild(pearsonCell);

  // Spearman cell
  const spearmanCell = document.createElement("td");
  const spearmanText = document.createTextNode(parsedData[key].spearman);
  spearmanCell.appendChild(spearmanText);
  row.appendChild(spearmanCell)


  const kendallCell = document.createElement("td");
  const kendallText = document.createTextNode(parsedData[key].kendall);
  kendallCell.appendChild(kendallText);
  row.appendChild(kendallCell);

  const dtwCell  = document.createElement("td");
  const dtwText = document.createTextNode(parsedData[key].dtw);
  console.log(parsedData[key].dtw);
  dtwCell.appendChild(dtwText);
  row.appendChild(dtwCell);

  table.appendChild(row);
}
    container.style.backgroundColor = "aliceblue";
    container.style.padding = "25px";
    container.style.align = "center";

    const loading = document.getElementById("loading");
    loading.remove();
  })
  .catch((error) => {
    console.log(error);
    // console.error("Error fetching data:", error);
  });

// fetch('./src/python/analysis.py', {
//     method : 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//       },
//       body: tag,
// // })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));

document.addEventListener("DOMContentLoaded", function () {
  // const ul = document.createElement("ul");
  // ul.textContent = "test";
  // listContainer.appendChild(ul);
});

//data should be there in py anyway
//just send your main data for comparison

//retrieve data from mysql

//send to python
