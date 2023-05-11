

let ratioList = [
  {
    title: "Gold Silver Ratio",
    urlendpoint : "gold-silver",
    use : "ratio",
    chartToCreate : false,
    tag: {"GOLD" : "NDL", "SILVER" : "NDL" },
    frequency : "d",
    transformation : "lin",
    aggregation : "avg",
    adjustment: [1, 1],
    units : ["",""],
    comparisonChartName : "SILVER"
  },

];


export default ratioList;
