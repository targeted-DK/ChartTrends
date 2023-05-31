
let bondsList = [
  
    {
      title: "3-month and 10-year Treasury yields",
      urlendpoint: "3m_10yr_yields",
      use : "singlechart",
      chartToCreate : false,
      fitGraph : false,
      tag: ["T10Y3M"],
      source :  ["FRED"],
      frequency :[ "d"],
      transformation : ["lin"],
      aggregation : ["avg"],
      adjustment: [1],
      units : ["percent"],
      comparisonChartName : null

    },

    //@todo
    // {
    //   title: "Nominal US Dollar Index vs. UST Held by foreign official and international accounts",
    //   urlendpoint: "USD_USTforeign",
    //   use : "compare",
    //   chartToCreate : false,
    //   adjustYaxis: true,
    //   tag: ["DTWEXBGS", "WMTSECL1"],
    //   source :  ["FRED", "FRED"],
    //   frequency :[ "q", "q"],
    //   transformation : ["lin", "lin"],
    //   aggregation : ["avg","avg"],
    //   adjustment: [1,1],
    //   units : ["", "Billions of Dollars"],
    //   comparisonChartName : "FDHBFIN"

    // },

     
]

export default bondsList;
  
  