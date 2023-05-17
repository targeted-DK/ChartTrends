

let ratioList = [
  {
    title: "Gold Silver Ratio",
    urlendpoint : "gold-silver",
    use : "ratio",
    chartToCreate : false,
    adjustYaxis : false,
    tag: {"GOLD" : "NDL", "SILVER" : "NDL" },
    frequency : ["d","d"],
    transformation : ["lin","lin"],
    aggregation : ["avg","avg"],
    adjustment: [1, 1],
    units : ["",""],
    comparisonChartName : null
  },


  {
    title: "Copper Gold Ratio",
    urlendpoint: "copper-gold",
    use : "ratio",
    chartToCreate : false,
    adjustYaxis : false,
    tag: {"copper" : "custom", "GOLD" : "NDL"},
    frequency : ["d", "d"],
    transformation : ["lin","lin"],
    aggregation :[ "avg","avg"],
    adjustment: [1,1],
    units : ["", ""],
    comparisonChartName : null

  }

];


export default ratioList;
