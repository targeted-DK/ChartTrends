import bankList from "./data/bankList.js";
import bondsList from "./data/bondsList.js";
import featuredList from "./data/featuredList.js";
import macroList from "./data/macroList.js";
import ratioList from "./data/ratioList.js";
import { fredDataList } from "./dataList.js";
// import {featuredList} from "./featuredList.js";
// localStorage.setItem("fredDataList", JSON.stringify(fredDataList));
// TODO: Implement error handling for the form submission
// TODO: Implement naviable buttons
const dataList = Object.keys(fredDataList);

const inputElement = document.getElementById("autocomplete-input");
const submitButtonElement = document.getElementById("btn-submit");


submitButtonElement.addEventListener("click", onSubmitButtonClick);
inputElement.addEventListener("input", onInputChange);

var selectedIndex = -1;
var previousSelectedButton = null; 
inputElement.addEventListener("keydown", function (event) {
  // Check if the Enter key was pressed
  if (event.keyCode === 13) {
    // Prevent the default form submission behavior
    
    event.preventDefault();
    // Programmatically submit the form
    submitButtonElement.click();

    var dropdownMenu = document.getElementById("autocomplete-list");
  
    var listItems = dropdownMenu.getElementsByTagName("li");

    if (selectedIndex > -1 && selectedIndex < listItems.length) {
      var selectedValue = listItems[selectedIndex].innerText;
      
      inputElement.value = selectedValue;
      
    }
    
  } else if (event.keyCode === 38 || event.keyCode === 40) {
    event.preventDefault();

    var dropdownMenu = document.getElementById("autocomplete-list");

       var listItems = dropdownMenu.getElementsByTagName("li");
        // Keep track of the currently selected item index

        if (selectedIndex > -1) {
          var previousSelectedItem = listItems[selectedIndex];
          previousSelectedItem.classList.remove("selected");
        
          if (previousSelectedButton) {
            previousSelectedButton.style.backgroundColor = "white"
          }
        }
     
        // Calculate the new selected index 
        if (event.keyCode === 38) {
          // Arrow up key, move to the previous item
        
          selectedIndex = selectedIndex - 1;
        } else if (event.keyCode === 40) {
          // Arrow down key, move to the next item
        
          selectedIndex = selectedIndex + 1;
        }

        // Limit the selected index within the valid range
        if (selectedIndex < 0) {
          selectedIndex = 0;
        } else if (selectedIndex >= listItems.length) {
          selectedIndex = listItems.length - 1;
        }

         // Set focus to the newly selected item
        //  listItems[selectedIndex].focus();
     

        var selectedButton = listItems[selectedIndex].querySelector("button");
       selectedButton.style.backgroundColor = "yellow"

      // Add the "selected" class to the newly selected item
      listItems[selectedIndex].classList.add("selected");

      // Set focus to the newly selected item (if needed)
      // listItems[selectedIndex].focus();

      // Store the reference to the currently selected button for the next iteration
      previousSelectedButton = selectedButton;
          
       
       
}
});


function onInputChange() {
  removeAutoCompleteDropDown();
  const key = inputElement.value.toLowerCase();
  if (key === "") {
    return;
  }
  var filteredNames = [];

  dataList.forEach((dataName) => {
    if (dataName.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(dataName);
    }
  });

  featuredList.forEach((obj) => {
    if (obj.title.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(obj.title);
    }
  });

  macroList.forEach((obj) => {
    if (obj.title.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(obj.title);
    }
  });

  ratioList.forEach((obj) => {
    if (obj.title.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(obj.title);
    }
  });

  bondsList.forEach((obj) => {
    if (obj.title.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(obj.title);
    }
  });

  bankList.forEach((obj) => {
    if (obj.title.substr(0, key.length).toLowerCase() === key) {
      filteredNames.push(obj.title);
    }
  });

  createAutoCompleteDropDown(filteredNames);
}

function createAutoCompleteDropDown(list) {
  const dropDownElement = document.createElement("ul");
  dropDownElement.className = "autocomplete-list";
  dropDownElement.id = "autocomplete-list";

  list.forEach((dataName) => {
    var listItem = document.createElement("li");
    var itemButton = document.createElement("button");

    itemButton.innerHTML = dataName;
    itemButton.addEventListener("click", onNameButtonClick);

    listItem.appendChild(itemButton);
    dropDownElement.appendChild(listItem);
  });

  document.getElementById("autocomplete-wrapper").appendChild(dropDownElement);
}

function removeAutoCompleteDropDown() {
  var dropDownElement = document.getElementById("autocomplete-list");
  if (dropDownElement) dropDownElement.remove();
}

function onNameButtonClick(e) {
  e.preventDefault();

  var buttonElement = e.target;
  inputElement.value = buttonElement.innerHTML;
  inputElement.focus();

  removeAutoCompleteDropDown();
}

function onSubmitButtonClick() {
  var key = inputElement.value;
  
  //single chart with python analysis 
  let values = Object.keys(fredDataList);

  if (values.includes(key)) {
    
    let value = fredDataList[key];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/chart/" + value, true);
   
    xhr.onload = function () {
    
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
  } 
  //custom chart 
  else {
  
    // var foundItem = list.find((obj) => Object.keys(obj)[0] === key);
    let urlendpoint;
    let listType;
    macroList.map((obj) => {
      if (obj.title === key) {
        urlendpoint = obj.urlendpoint;
        listType = "macro"
        sendRequestAndNavigateCustomChart(listType, urlendpoint);
      } 
      return;

    });

    featuredList.map((obj) => {
      if (obj.title === key) {
        urlendpoint = obj.urlendpoint;
        listType = "featured"
        sendRequestAndNavigateCustomChart(listType, urlendpoint);
      } 
      return;
    });

    ratioList.map((obj) => {
      if (obj.title === key) {
        urlendpoint = obj.urlendpoint;
        listType = "ratio"
        sendRequestAndNavigateCustomChart(listType, urlendpoint);
      } 
      return;
    });


    bondsList.map((obj) => {
      if (obj.title === key) {
        urlendpoint = obj.urlendpoint;
        listType = "bonds"
        sendRequestAndNavigateCustomChart(listType, urlendpoint);
      } 
      return;
    });

    bankList.map((obj) => {
      if (obj.title === key) {
        urlendpoint = obj.urlendpoint;
        listType = "bank"
        sendRequestAndNavigateCustomChart(listType, urlendpoint);
      } 
      return;
    });



  }

  function sendRequestAndNavigateCustomChart(listType, urlendpoint) {
    var xhr = new XMLHttpRequest();
    
      xhr.open("GET", "/chart/" + listType + "/" + urlendpoint, true);
      xhr.onload = function () {
        if (xhr.status === 404) {
          // Display an error message or redirect to a custom 404 page
          alert("Sorry, the page you requested could not be found.");
          window.location.href = "/404";
        } else {
          // Redirect to the requested page
          window.location.href = "/chart/" + listType + "/" +  urlendpoint;
        }
      };
      xhr.send();
    } 
  }
 