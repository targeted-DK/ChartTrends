//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

//always add the chartToCreate at data[0]
//for 2-chart graphs, we need comparisonChartName in case of different units
let featuredList = [
  {
    title: "M2 vs. CPI",
    urlendpoint: "M2_CPI",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: false,
    tag: { M2REAL: "FRED", CPIAUCSL: "FRED" },
    frequency: ["m", "m"],
    transformation: ["pc1", "pc1"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
    comparisonChartName: "CPIAUCSL",
  },

  {
    title: "WTI Cushing Price vs. Gold",
    urlendpoint: "DCOILWTICO_GOLD",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: { DCOILWTICO: "FRED", GOLD: "NDL" },
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
    adjustYaxis: true,
    tag: { WALCL: "FRED", WTREGEN: "FRED", RRPONTSYD: "FRED", WILL5000PR: "FRED" },
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, -1000, -1000, 1],
    units: ["Million USD", "Billion USD", "Billion USD", "Points"],
    comparisonChartName: "WILL5000PR",
  },
  //three charts
  {
    title: "Nominal Comparison of Wilshire 5000, Gold, Oil",
    urlendpoint: "Wil5000_OIL_GOLD",
    use: "case2",
    chartToCreate: false,
    adjustYaxis: true,
    tag: { WILL5000PR: "FRED", DCOILWTICO: "FRED", GOLD: "NDL" },
    frequency: ["d", "d", "d"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1, 1],
    units: ["points", "dollars", "dollars"],
    comparisonChartName: null
  },
  {
    title: "Real Interest Rates",
    urlendpoint: "realinterestrates",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: {
      REAINTRATREARAT1MO: "FRED",
      REAINTRATREARAT1YE: "FRED",
      REAINTRATREARAT10Y: "FRED",
    },
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
    tag: {
      T5YIE: "FRED",
      T7YIEM: "FRED",
      T10YIE: "FRED",
      T20YIEM: "FRED",
      T30YIEM: "FRED",
    },
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
    tag: {
      MICH: "FRED",
      EXPINF1YR: "FRED",
      EXPINF5YR: "FRED",
      EXPINF10YR: "FRED",
      EXPINF20YR: "FRED",
      EXPINF30YR: "FRED",
    },
    frequency: ["m", "m", "m", "m", "m", "m"],
    transformation: ["lin", "lin", "lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1, 1, 1],
    units: ["percent", "percent", "percent", "percent", "percent", "percent"],
    comparisonChartName: null,
  },

  //federal government expenditure - todo

  {
    title: "US Government Expenditure Interest Rate and % of GDP",
    urlendpoint: "usgovexp",
    use: "case3",
    chartToCreate: true,
    chartToCreateName : "US Government Expenditure Interest Rate as a % of GDP",
    adjustYaxis: true,
    tag: { GDP: "FRED", A091RC1Q027SBEA: "FRED" },
    frequency: ["q", "q"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 100],
    units: ["Billions of Dollars", "Billions of Dollars"],
    comparisonChartName: null,
  },

  {
    title: "CPI vs. Michigan Inflation Expectations survey",
    urlendpoint: "cpi_michigan",
    use: "enumerate",
    chartToCreate: false,
    chartToCreateName : "",
    adjustYaxis: null,
    tag: {  CPIAUCSL: "FRED", MICH: "FRED" },
    frequency: ["m", "m"],
    transformation: ["pc1", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["percent", "percent"],
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
