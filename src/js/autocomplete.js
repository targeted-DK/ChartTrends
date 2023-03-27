import { fredDataList } from "./dataList.js";
localStorage.setItem('fredDataList', JSON.stringify(fredDataList));
// TODO: Implement error handling for the form submission
// TODO: Implement naviable buttons
const dataList = Object.keys(fredDataList);

const inputElement = document.getElementById("autocomplete-input");
const submitButtonElement = document.getElementById("btn-submit");


submitButtonElement.addEventListener("click", onSubmitButtonClick);
inputElement.addEventListener("input", onInputChange);
inputElement.addEventListener("keydown", function(event) {
    // Check if the Enter key was pressed
    if (event.keyCode === 13) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Programmatically submit the form
      submitButtonElement.click();
    }
  });

function onInputChange(){
   removeAutoCompleteDropDown();
   const key = inputElement.value.toLowerCase();
   if(key === ""){
    return;
   }
   var filteredNames = [];

   dataList.forEach((dataName) => {
        if(dataName.substr(0, key.length).toLowerCase() === key){
            filteredNames.push(dataName);
        } 
   })

   createAutoCompleteDropDown(filteredNames);
}

function createAutoCompleteDropDown(list){
    const dropDownElement = document.createElement("ul");
    dropDownElement.className = "autocomplete-list";
    dropDownElement.id= "autocomplete-list";

    list.forEach((dataName) => {
        var listItem = document.createElement("li");
        var itemButton = document.createElement("button");

        itemButton.innerHTML = dataName;
        itemButton.addEventListener("click", onNameButtonClick);

        listItem.appendChild(itemButton);
        dropDownElement.appendChild(listItem);
    })

    document.getElementById("autocomplete-wrapper").appendChild(dropDownElement);
}

function removeAutoCompleteDropDown(){
    var dropDownElement = document.getElementById("autocomplete-list");
    if(dropDownElement) dropDownElement.remove();
}

function onNameButtonClick(e){
    e.preventDefault();

    var buttonElement = e.target;
    inputElement.value = buttonElement.innerHTML;
    inputElement.focus();

    removeAutoCompleteDropDown();
}


function onSubmitButtonClick(){
    var key = inputElement.value;
    var value = fredDataList[key];
    if(value == undefined){
        window.location.href = "/404";
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/chart/" + value, true);

    xhr.onload = function() {
        if (xhr.status === 404) {
          // Display an error message or redirect to a custom 404 page
          alert("Sorry, the page you requested could not be found.");
          window.location.href = "/404";
        } else {
          // Redirect to the requested page
          window.location.href = "/chart/" + value;
        }
      };
      xhr.send();
    // window.location.href = "/chart/" + value;
}



