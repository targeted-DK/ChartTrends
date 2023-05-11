
let bondsList = [
  
    {
      title: "3-month and 10-year Treasury yields",
      urlendpoint: "3m_10yr_yields",
      use : "singlechart",
      chartToCreate : false,
      fitGraph : false,
      tag: { "T10Y3M" : "FRED"},
      frequency :[ "d"],
      transformation : ["lin"],
      aggregation : ["avg"],
      adjustment: [1],
      units : ["percent"],
      comparisonChartName : null

    },
]

export default bondsList;
  
  