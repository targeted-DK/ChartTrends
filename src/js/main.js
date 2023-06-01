import bondsList from "./data/bondsList.js";
import featuredList from "./data/featuredList.js";
import macroList from "./data/macroList.js";
import ratioList from "./data/ratioList.js";
import bankList from "./data/bankList.js";

var menuImageSources = {
  Featured: [
    "Wil5000_DomesticLiquidityIndicator",
    "usgovexp",
    "oil_will5000_gold",
    "M2_CPI",
    "DCOILWTICO_GOLD",
    "CGR_us10yr",
    "InvenSales_dgs10"
    
  ],
  Macro: [
    "ffer_unemployment_cpi",
    "m2",
    "gdp_unemployment"
  ],

  Bank : [
    "fedshorttermliquidity",
    "rrp_tga_lor",
    "loans_securities_bank",
    "securities_ratio_bank",
    "cre_loan_ratio",
    "cashreserves_banks"
  ]
  // Petroleum: [
  //   "petroleum-image-1.png",
  //   "petroleum-image-2.png",
  //   "petroleum-image-3.png"
  // ]
};

// Get the containers for each menu
var featuredContainer = document.querySelector("#Featured .container");
var macroContainer = document.querySelector("#Macro .container");
var bankContainer = document.querySelector("#Bank .container");

// Function to create and append cards to the container
function createCards(container, imageSources) {
  var row;
  

  imageSources.forEach(function (src, index) {
    // Create the necessary elements

    var subject = findSubjectInList(featuredList, src) 
    || findSubjectInList(macroList, src) 
    || findSubjectInList(ratioList, src) 
    || findSubjectInList(bondsList, src)
    || findSubjectInList(bankList, src)

    if (index % 2 === 0) {
      row = document.createElement("div");
      row.style.display = "flex"
      container.appendChild(row);
    }

    var col = document.createElement("div");
    col.className = "col-md-6 col-lg-6";

    var card = document.createElement("div");
    card.className = "card mb-4";

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var link = document.createElement("a");
    link.href = "/chart/" + container.parentNode.id + "/" + src;
  
    var img = document.createElement("img");
    img.className = "card-img-top";
    img.style.height = "100%";
    img.style.maxHeight = "600px";
    img.style.padding = "10px";
    img.style.width = "500px";
    img.style.height = "300px";
    img.src = src + ".png"
    // img.alt = container.id + "-chart-" + index;
  

    var title = document.createElement("h5");
    title.className = "card-title";
    title.style.textAlign = "center";
    title.textContent = subject;

    var description = document.createElement("p");
    description.className = "card-text";
    description.style.textAlign = "center";
    description.textContent =
      "Description of " + container.id + " Image " + (index + 1);

    // Append the elements to the row
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardBody);
  
    cardBody.appendChild(link);
    link.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(description);

 

    // Create a new row after every second card
   
  });
}

function findSubjectInList(list, source) {
  var subject;
  
  list.find(row => {
    if (row.urlendpoint === source) {
      subject = row.title;
      return true; // stop iterating, title is found
    }
    return false; // continue iterating
  });

  return subject;
}


// Call the function to create cards for each menu
createCards(featuredContainer, menuImageSources.Featured);
  createCards(macroContainer, menuImageSources.Macro);
  createCards(bankContainer, menuImageSources.Bank);
