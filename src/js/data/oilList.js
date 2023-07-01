//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

let oilList = [


  {
    title :"Oil Stocks",
    urlendpoint: "EIA/oil/stock",
   
  },
  {
    title : "Oil DUC Counts",
    urlendpoint : "EIA/oil/DUC"
  },
  {
    title : "Oil Completed Wells Counts",
    urlendpoint : "EIA/oil/completed"
  },
  {
    title : "Oil Drilled Wells Counts",
    urlendpoint : "EIA/oil/drilled"
  },


  {
    title : "US Crude Imports",
    urlendpoint : "EIA/oil/import"
  },
  {
    title : "US Crude Exports",
    urlendpoint : "EIA/oil/export"
  },

  {
    title : "Petroleum Demand by Type",
    urlendpoint : "EIA/petroleum/demand"
  },
   
  {
    title : "Petroleum Stocks by Type",
    urlendpoint : "EIA/petroleum/stock"
  },
  {
    title : "Big Three Petroleum Products (Gasoline + Distillate + Jet Fuel) Stocks",
    urlendpoint : "EIA/petroleum/BigThreeProductStorage"
  },

  {
    title : "US Petroleum Imports",
    urlendpoint : "EIA/petroleum/import"
  },

  {
    title : "US Petroleum Export",
    urlendpoint : "EIA/petroleum/export"
  },

  {
    title : "US Natural Gas Storage by Region",
    urlendpoint : "EIA/ng/storage"
  },


]
export default oilList;
