//a file that runs when /chart/chartName runs on the client
//sends selected number of other data(or all) to python file to run comparison algorithms
// import { PythonShell } from "python-shell";

var dataset = JSON.parse(localStorage.getItem("fredDataList"));
var listContainer = document.getElementById("compare-list-container");
// var chartContainer = document.getElementById("chart-container");

// Fetch data from a backend API
axios
  .post("/runPython", {
    data: tag,
  })
  .then((res) => console.log(res))

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
  const ul = document.createElement("ul");
  ul.textContent = "test";
  listContainer.appendChild(ul);
});

//data should be there in py anyway
//just send your main data for comparison

//retrieve data from mysql

//send to python
