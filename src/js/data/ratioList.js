

let ratioList = [
  {
    title: "Gold Silver Ratio",
    urlendpoint : "gold-silver",
    use : "ratio",
    chartToCreate : false,
    adjustYaxis : false,
    tag: ["GOLD", "SILVER"],
    source :  ["NDL", "NDL"],
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
    tag: ["copper", "GOLD"],
    source :  ["custom", "NDL"],
    frequency : ["d", "d"],
    transformation : ["lin","lin"],
    aggregation :[ "avg","avg"],
    adjustment: [1,1],
    units : ["", ""],
    comparisonChartName : null

  }

];


export default ratioList;
