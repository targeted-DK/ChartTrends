//case1 : create a chart(addition) and compare with the last one
//case2: three charts - todo
//case3: (two charts) create a chart(division) using two and compare the created one with the other one
//case4: (three charts) create a chart(division) using two and compared the created one with the third one
//case5: create two charts from four charts and compare created two charts or 2,4,6,8...
//compare : compare two charts with different units or same units
//enmerate : compare multiple charts with same units

//for 2-chart graphs, we need comparisonChartName in case of different units
let featuredList = [
  {
    title: "M2 vs. CPI",
    urlendpoint: "M2_CPI",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: false,
    tag: [ "M2REAL", "CPIAUCSL"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["pc1", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: "CPIAUCSL",
  },
  {
    title: "Retail Sales and yoy",
    urlendpoint: "retailsales",
    use: "diff_format",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["RSXFS", "RSXFS"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["", "percent"],
    comparisonChartName: null,
  },

  {
    title: "Inventories-to-Sales and 1-Month Real Interest Rate",
    urlendpoint: "InvenSales_1morate",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["RETAILIRSA", "REAINTRATREARAT1MO"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: "REAINTRATREARAT1MO",
  },

  {
    title: "Inventories-to-Sales and 10-year Yield",
    urlendpoint: "InvenSales_dgs10",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["RETAILIRSA", "DGS10"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "d"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: "DGS10",
  },

  {
    title: "Inventories-to-Sales and copper price",
    urlendpoint: "InvenSales_copper",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["RETAILIRSA", "copper"],
    source :  ["FRED", "custom"],
    frequency: ["m", "d"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "dollars"],
    comparisonChartName: "copper"
  },
  
  {
    title: "WTI Cushing Price vs. Gold",
    urlendpoint: "DCOILWTICO_GOLD",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag:  [ "DCOILWTICO" , "GOLD"],
    source :  ["FRED", "NDL"],
    frequency: ["d", "d"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["dollars", "dollars"],
    comparisonChartName: "GOLD",
  },
  //custom chart for this case
  {
    title: "Wilshire 5000 Price Index and Domestic Liquidity Indicator",
    urlendpoint: "Wil5000_DomesticLiquidityIndicator",
    use: "case1",
    chartToCreate: true,
    chartToCreateName : "Domestic Liquidity Indicator",
    chartMethod : "Addition",
    adjustYaxis: true,
    tag: [ "WALCL", "WTREGEN" , "RRPONTSYD" , "WILL5000PR" ],
    source :  ["FRED", "FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, -1000, -1000, 1],
    units: ["Million USD", "Billion USD", "Billion USD", "Points"],
    comparisonChartName: "WILL5000PR",
  },

  {
    title: "Nasdaq and Domestic Liquidity Indicator",
    urlendpoint: "Nasdaq_DomesticLiquidityIndicator",
    use: "case1",
    chartToCreate: true,
    chartToCreateName : "Domestic Liquidity Indicator",
    chartMethod : "Addition",
    adjustYaxis: true,
    tag: [ "WALCL", "WTREGEN" , "RRPONTSYD" , "NASDAQCOM" ],
    source :  ["FRED", "FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, -1000, -1000, 1],
    units: ["Million USD", "Billion USD", "Billion USD", "Points"],
    comparisonChartName: "NASDAQCOM",
  },

  {
    title: "Copper Gold Ratio vs. US10YR Yield",
    urlendpoint: "CGR_us10yr",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "Copper-Gold Ratio",
    chartMethod : "Division",
    adjustYaxis: true,
    tag: ["copper", "GOLD", "DGS10"],
    source :  ["custom" , "NDL", "FRED"],
    frequency : ["d", "d", "d"],
    transformation : ["lin","lin", "lin"],
    aggregation :[ "avg","avg","avg"],
    adjustment: [1,1,1],
    units : ["", "", "percent"],
    comparisonChartName : "DGS10"
  },
  //three charts
  {
    title: "Nominal Comparison of Wilshire 5000, Gold, Oil",
    urlendpoint: "Wil5000_OIL_GOLD",
    use: "case2",
    chartToCreate: false,
    adjustYaxis: true,
    tag: [ "WILL5000PR", "DCOILWTICO" , "GOLD"],
    source :  ["FRED", "FRED", "NDL"],
    frequency: ["d", "d", "d"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1, 1],
    units: ["points", "dollars", "dollars"],
    comparisonChartName: null
  },

  //@todo - issue with cftc data as it has multiple values in a row
  // {
  //   title: "WTI Price vs. Manged Money Positions",
  //   urlendpoint: "WTI_cftcpositions",
  //   use: "compare",
  //   chartToCreate: false,
  //   adjustYaxis: true,
  //   tag: { "WTISPLC": "FRED", "WTI-PHYSICAL": "CFTC"},
  //   frequency: ["m", ""],
  //   transformation: ["lin", ""],
  //   aggregation: ["avg", ""],
  //   adjustment: [1, 1],
  //   units: ["dollars", "contract"],
  //   comparisonChartName: "WTI-PHYSICAL"
  // },
  {
    title: "Real Interest Rates",
    urlendpoint: "realinterestrates",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: [
      "REAINTRATREARAT1MO",
      "REAINTRATREARAT1YE",
      "REAINTRATREARAT10Y",
  ],
    source :  ["FRED", "FRED", "FRED"],
    frequency: ["m", "m", "m"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1, 1],
    units: ["percent", "percent", "percent"],
    comparisonChartName: null,
  },

  {
    title: "Breakeven Inflation Rates",
    urlendpoint: "breakeveninflrates",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: [
      "T5YIE",
      "T7YIEM",
      "T10YIE", 
      "T20YIEM", 
      "T30YIEM",
  ],
    source :  ["FRED", "FRED","FRED", "FRED","FRED"],
    frequency: ["m", "m", "m", "m", "m"],
    transformation: ["lin", "lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1, 1],
    units: ["percent", "percent", "percent", "percent", "percent"],
    comparisonChartName: null,
  },
  //inflation stuff
  {
    title: "Expected Inflation Rates",
    urlendpoint: "expectedinflrates",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: [
     "MICH",
     "EXPINF1YR",
     "EXPINF5YR",
     "EXPINF10YR",
     "EXPINF20YR",
     "EXPINF30YR",
],
    source :  ["FRED", "FRED","FRED", "FRED","FRED","FRED"],
    frequency: ["m", "m", "m", "m", "m", "m"],
    transformation: ["lin", "lin", "lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1, 1, 1],
    units: ["percent", "percent", "percent", "percent", "percent", "percent"],
    comparisonChartName: null,
  },
  {
    title: "US Government Expenditure Interest Rate and % of GDP",
    urlendpoint: "usgovexp",
    use: "case3",
    chartToCreate: true,
    chartToCreateName : "US Government Expenditure Interest Rate as a % of GDP",
    adjustYaxis: true,
    tag: ["A091RC1Q027SBEA", "GDP"],
    source :  ["FRED", "FRED"],
    frequency: ["q", "q"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1/100],
    units: ["Billions of Dollars", "Billions of Dollars"],
    comparisonChartName: "A091RC1Q027SBEA",
  },


  {
    title: "CPI vs. Michigan Inflation Expectations survey",
    urlendpoint: "cpi_michigan",
    use: "enumerate",
    chartToCreate: false,
    chartToCreateName : "",
    adjustYaxis: null,
    tag: ["CPIAUCSL", "MICH"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["pc1", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
  },


  {
    title: "Corporate Debt / GDP and Fed Funds Rate",
    urlendpoint: "corpdebtgdp_ffer",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "Corporate Debt as a % of GDP",
    chartMethod : "Division",
    adjustYaxis: false,
    tag: ["BCNSDODNS",  "GDP", "FEDFUNDS" ],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [100,1, 1],
    units: ["Billions of Dollars", "Billions of Dollars", "percent"],
    comparisonChartName: "FEDFUNDS",
  },
  {
    title: "Total US Debt / GDP and Fed Funds Rate",
    urlendpoint: "usdebtGDP_ffer",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "Total Debt as a % of GDP",
    chartMethod : "Division",
    adjustYaxis: false,
    tag: ["GFDEBTN",  "GDP", "FEDFUNDS"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1/100,100, 1],
    units: ["Billions of Dollars", "Billions of Dollars", "percent"],
    comparisonChartName: "FEDFUNDS",
  },
 
  {
    title: "Total US Debt / M2 and Fed Funds Rate",
    urlendpoint: "usdebtM2_ffer",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "Total Debt as a % of M2",
    chartMethod : "Division",
    adjustYaxis: false,
    tag: ["GFDEBTN" , "WM2NS", "FEDFUNDS"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1,100, 1],
    units: ["Millions of Dollars", "Billions of Dollars", "percent"],
    comparisonChartName: "FEDFUNDS",
  },

  {
    title: "Total US Debt / M2 and Fed Funds Rate",
    urlendpoint: "usdebtM2_ffer",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "Total Debt as a % of M2",
    chartMethod : "Division",
    adjustYaxis: false,
    tag: ["GFDEBTN" ,  "WM2NS", "FEDFUNDS" ],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1,100, 1],
    units: ["Millions of Dollars", "Billions of Dollars", "percent"],
    comparisonChartName: "FEDFUNDS",
  },

  {
    title: "Manufacturer's New Orders yoy vs. M2 yoy",
    urlendpoint: "AMTMNO_M2",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["AMTMNO", "M2REAL"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["pc1", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: "M2REAL",
  },

  {
    title: "% of Cash Assets in Small Commercial Banks",
    urlendpoint: "pct_cash_smallbanks",
    use: "case4",
    chartToCreate: true,
    chartToCreateName : "% of cash assets in small commercial banks",
    adjustYaxis: false,
    chartMethod : "Division",
    tag: ["CASSCBW027SBOG", "TLASCBM027SBOG"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [100, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
  },
  {
    title: "% of Cash Assets in Large Commercial Banks",
    urlendpoint: "pct_cash_largebanks",
    use: "case4",
    chartToCreate: true,
    chartToCreateName :  "% of cash assets in large commercial banks",
    adjustYaxis: false,
    chartMethod : "Division",
    tag: ["CASLCBW027SBOG", "TLALCBM027SBOG"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [100, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
  },

  {
    title: "% of Cash Assets in All Commercial Banks",
    urlendpoint: "pct_cash_allbanks",
    use: "case4",
    chartToCreate: true,
    chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: false,
    chartMethod : "Division",
    tag: ["CASACBW027SBOG", "TLAACBW027SBOG"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [100, 1],
    units: ["percent", "percent"],
    comparisonChartName: null,
  },

  {
    title: "Savings Rate vs. CPI vs. Hourly wages",
    urlendpoint: "savings_cpi_wages",
    use: "enumerate",
    chartToCreate: false,
    // chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: false,
    // chartMethod : "Division",
    tag: ["PSAVERT", "CPIAUCSL", "CES0500000003"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["m", "m", "m"],
    transformation: ["lin", "pc1", "pc1"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1,1],
    units: ["percent", "percent","percent"],
    comparisonChartName: null,
  },


  

  

];
 
  //   const frequencyOptionstemp = ["d", "w", "bw", "m", "q", "sa", "a"];
  // // const frequencyOptionstemp = ["d", "w", "m"];
  // const aggregationOptionstemp = ["avg", "sum", "eop"];
  // const transformationOptionstemp = [
  //   "lin",
  //   "chg",
  //   "ch1",
  //   "pch",
  //   "pc1",
  //   "pca",
  //   "cch",
  //   "cca",
  //   "log",
  // ];

  // {
  //   name: "Gold vs Copper",
  //   use : "ratio",
  //   data: { GOLD},
  //   adjustment: [1,1],
  //   comparisonChart : Copper
  // },


// const featuredCharts = [
//   {
//     name: "SP500 vs Domestic Liquidity Indicator",
//     charts: [
//       {
//         title: "SP500",
//         source: "FRED",
//         adjustment: 1
//       },
//       {
//         title: "WALCL",
//         source: "FRED",
//         adjustment: 1,
//       },
//       {
//         title: "WTREGEN",
//         source: "FRED",
//         adjustment: -1000
//       },
//       {
//         title: "RRPONTSYD",
//         source: "FRED",
//         adjustment: -1000
//       }
//     ]
//   },
//   // Other featured charts...
// ];

// addObjectToFeaturedList("domesticliquidityindicatdddr", {
//   //  "WILL5000PR" : "FRED",
//     "WALCL": "FRED",
//     "WTREGEN": "FRED",
//     "RRPONTSYD": "FRED"
//   }, [1, -1000, -1000]
//   );

export default featuredList;
