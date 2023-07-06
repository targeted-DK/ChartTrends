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
      tag: ["GDP", "UNRATE"],
      source :  ["FRED", "FRED"],
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
        tag: ["DFF" , "UNRATE" , "CPIAUCSL" ],
        source :  ["FRED", "FRED", "FRED"],
        frequency : ["q", "q", "q"],
        transformation :["lin", "lin", "pc1"],
        aggregation :["avg", "avg", "avg"],
        adjustment: [1, 1, 1],
        units : ["percent","percent", "percent"],
        comparisonChartName : null
      },
 
  
  {
    title: "M2 total, yoy",
    urlendpoint: "m2",
    use : "diff_format",
    chartToCreate : false,
    adjustYaxis: true,
    tag: [ "M2REAL", "M2REAL"],
    source :  ["FRED", "FRED"],
    frequency :[ "m", "m"],
    transformation : ["lin", "pc1"],
    aggregation : ["avg","avg"],
    adjustment: [1,1],
    units : ["Billions of Dollars", "percent"],
    comparisonChartName :  null,

  },

  {
    title: "WTI vs. Dollar Index",
    urlendpoint: "wti_dollaridx",
    use: "compare",
    chartToCreate: false,
    // chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["WTISPLC", "DTWEXBGS"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["dollars", ""],
    yaxistype : [0,1],
    comparisonChartName: "DTWEXBGS",
  },

  {
    title: "Yields, Inversions and High Yield Spread",
    urlendpoint: "yields_spreads",
    use: "enumerate",
    chartToCreate: false,
    // chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: false,
    // chartMethod : "Division",
    tag: [ "DGS10", "T10Y3M","BAMLH0A0HYM2"],
    source :  ["FRED", "FRED", "FRED"],
    frequency: ["d", "d", "d"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1,1],
    units: ["percent", "percent", "percent"],
    comparisonChartName: null,
    description : "Recession indicators from bond market"
  },

  {
    title: "Supply of New Home Sales and Real GDP QoQ",
    urlendpoint: "homesupply_gdp",
    use: "enumerate",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: false,
    // chartMethod : "Division",
    tag: ["MSACSR", "GDPC1"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "q"],
    transformation: ["pc1", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
    // description 
  },


  {
    title: "Stock Market Cap and Total Job Openings",
    urlendpoint: "mktcap_jobs",
    use: "compare",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["WILL5000INDFC", "JTSJOL"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["index", "thousands"],
    yaxistype : [0,1],
    comparisonChartName: "JTSJOL",
    // description 
  },


  {
    title: "Gold and Unemployment",
    urlendpoint: "gold_unemployment",
    use: "compare",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["GOLD", "UNRATE"],
    source :  ["NDL", "FRED"],
    frequency: ["d", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["dollars", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "UNRATE",
    // description 
  },


  {
    title: "Rate Inversion and Unemployment",
    urlendpoint: "rateinv_unemployment",
    use: "emuerate",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: false,
    // chartMethod : "Division",
    tag: ["T10Y3M", "UNRATE"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
    // description 
  },

  //@TODO - later use data from metals api 
  {
    title: "Copper Price and World GDP",
    urlendpoint: "copper_worldgdp",
    use: "compare",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["PCOPPUSDM", "NYGDPMKTPCDWLD"],
    source :  ["FRED", "FRED"],
    frequency: ["q", "a"],
    transformation: ["lin", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["US Dollars per Metric Ton", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "NYGDPMKTPCDWLD",
    // description 
  },

  {
    title: "Copper Price and World GDP",
    urlendpoint: "copper_worldgdp",
    use: "compare",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["PCOPPUSDM", "NYGDPMKTPCDWLD"],
    source :  ["FRED", "FRED"],
    frequency: ["q", "a"],
    transformation: ["lin", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["US Dollars per Metric Ton", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "NYGDPMKTPCDWLD",
    // description 
  },
  {
    title: "Korean Export and US Market Cap percent change",
    urlendpoint: "koreanexp_usmktcap",
    use: "enumerate",
    chartToCreate: false,
    chartToCreateName :  null,
    adjustYaxis: false,
    // chartMethod : "Division",
    tag: ["XTEXVA01KRM667S", "WILL5000INDFC"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["pc1", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
    // description 
  },
  ];
  
  
  export default macroList;
  