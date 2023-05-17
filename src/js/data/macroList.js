//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

let macroList = [
    {
      title: "GDP, Unemployment Rate",
      urlendpoint : "gdp_unemployment",
      use : "enumerate",
      chartToCreate : false,
      tag: {"GDP" : "FRED", "UNRATE" : "FRED" },
      frequency : ["q", "q"],
      transformation :["pc1", "lin"],
      aggregation : ["avg","avg"],
      adjustment: [1, 1],
      units : ["percent","percent"],
      comparisonChartName : null
    },

    {
        title: "Federal Funds Effective Rate, Unemployment Rate, CPI",
        urlendpoint : "ffer_unemployment_cpi",
        use : "enumerate",
        chartToCreate : false,
        tag: {"FEDFUNDS" : "FRED", "UNRATE" : "FRED", "CPIAUCSL" : "FRED"  },
        frequency : ["q", "q", "q"],
        transformation :["lin", "lin", "pc1"],
        aggregation :["avg", "avg", "avg"],
        adjustment: [1, 1, 1],
        units : ["percent","percent", "percent"],
        comparisonChartName : null
      },
  
  ];
  
  
  export default macroList;
  