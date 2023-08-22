//case1 : create a chart(addition) and compare with the last one
//case2: three charts - todo
//case3: (two charts) create a chart(division) using two and compare the created one with the other one
//case4: (three charts) create a chart(division) using two and compared the created one with the third one
//case5: create two charts from four charts and compare created two charts or 2,4,6,8...
//compare : compare two charts with different units or same units
//enmerate : compare multiple charts with same units

//for 2-chart graphs, we need comparisonChartName in case of different units
const featuredList = [
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
    yaxistype : [0,0],
    comparisonChartName: "CPIAUCSL",
  },

  {
    title: "Wilshire 5000 Price Index and Domestic Liquidity Indicator",
    urlendpoint: "Wil5000_DomesticLiquidityIndicator",
    use: "case1",
    chartToCreate: true,
    chartToCreateName : ["Domestic Liquidity Indicator"],
    chartMethod : "Addition",
    adjustYaxis: true,
    tag: [ "WALCL", "WTREGEN" , "RRPONTSYD" , "WILL5000PR" ],
    source :  ["FRED", "FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, -1000, -1000, 1],
    units: ["Million USD", "Billion USD", "Billion USD", "Points"],
    // adjustYaxis 
    comparisonChartName: "WILL5000PR",
    chatgptPromptInput : ["Wilshire 5000 Price Index", "Domestic Liquidity Indicator"]
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
    // chatgptPrompts : ["Nasdaq", "Domestic Liquidity Indicator"]

  },


  {
    title: "WTI(Cushing) vs. 3mo - 2yr yield",
    urlendpoint: "wti_3mo2yr",
    use: "case4",
    chartToCreate: true,
    chartMethod : [["Addition"]],
    numChartToCreate : 1,
    adjustYaxis: true,
    chartToCreateName : ["3-Month - 2-Year Yield  Yield Difference"],
    tag: [ "T10Y2YM", "T10Y3M", "WTISPLC"],
    source :  ["FRED", "FRED", "FRED"],
    frequency: ["m", "m" , "m"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [1, -1, 1],
    units: ["percent", "$/bbl"],
    yaxistype : [0,1],
    comparisonChartName: "WTISPLC",
    colors :  ["#0000FF", "#000000"],
    // chatgptPrompts : ["WTI Cushing Price", "3 Months - 2 Year Yield"]

  },

  {
    title: "WTI(Cushing) and Yield Differences",
    urlendpoint: "wti_yieldsdiff",
    use: "compare",
    chartToCreate: false,
    chartMethod :  null,
    numChartToCreate : 0,
    adjustYaxis: true,
    chartToCreateName : null,
    tag: [ "T10Y2YM", "T10Y3M", "WTISPLC"],
    source :  ["FRED", "FRED", "FRED"],
    frequency: ["m", "m" , "m"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [1, 1, 1],
    units: ["percent","percent", "$/bbl"],
    yaxistype : [0,0,1],
    comparisonChartName: "WTISPLC",
    colors :  ["#0000FF", "#FF0000", "#000000"],
    // chatgptPrompts : ["WTI Cushing Price", " 10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity", ]

  },


  {
    title: "Overnight RRP Agreements vs. Rate",
    urlendpoint: "rrp_rates",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: [ "RRPONTSYD", "RRPONTSYAWARD"],
    source :  ["FRED", "FRED"],
    frequency: ["d", "d"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["Billions of Dollars", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "RRPONTSYAWARD",
  },

  // {
  //   title: "Retail Sales and yoy",
  //   urlendpoint: "retailsales",
  //   use: "diff_format",
  //   chartToCreate: false,
  //   adjustYaxis: true,
  //   tag: ["RSXFS", "RSXFS"],
  //   source :  ["FRED", "FRED"],
  //   frequency: ["m", "m"],
  //   transformation: ["lin", "pc1"],
  //   aggregation: ["avg", "avg"],
  //   adjustment: [1, 1],
  //   units: ["", "percent"],
  //   comparisonChartName: null,
  // },

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
    yaxistype : [0,1],
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
    yaxistype : [0,1],
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
    yaxistype : [0,1],
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
     yaxistype : [0,1],
    comparisonChartName: "GOLD",
  },
  //custom chart for this case
  
  {
    title: "Copper Gold Ratio vs. US10YR Yield",
    urlendpoint: "CGR_us10yr",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 1,
    chartToCreateName : ["Copper-Gold Ratio"],
    chartMethod :[["Division"]],
    adjustYaxis: true,
    tag: ["copper", "GOLD", "DGS10"],
    source :  ["custom" , "NDL", "FRED"],
    frequency : ["d", "d", "d"],
    transformation : ["lin","lin", "lin"],
    aggregation :[ "avg","avg","avg"],
    adjustment: [1,1,1],
    units : ["ratio", "percent"],
    yaxistype : [0,1],
    comparisonChartName : "DGS10"
  },
  //three charts
  {
    title: "Nominal Comparison of Oil, Wilshire 5000, Gold",
    urlendpoint: "oil_will5000_gold",
    use: "case2",
    chartToCreate: false,
    adjustYaxis: true,
    tag: [ "DCOILWTICO" , "WILL5000PR", "GOLD"],
    source :  ["FRED", "FRED", "NDL"],
    frequency: ["d", "d", "d"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1, 1],
    units: ["dollars","points",  "dollars"],
    yaxistype : [0,1,0],
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
    chartMethod : [["Division"]],
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 1,
    chartToCreateName : ["US Government Expenditure Interest Rate as a % of GDP"],
    adjustYaxis: true,
    tag: ["A091RC1Q027SBEA", "GDP","A091RC1Q027SBEA"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q","q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [1, 1/100,1],
    units: ["percent", "Billions of Dollars"],
    yaxistype : [0,1],
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
    numChartToCreate : 1,
    chartToCreate: true,
    chartToCreateName : ["Corporate Debt as a % of GDP"],
    chartMethod : [["Division"]],
    adjustYaxis: true,
    tag: ["BCNSDODNS",  "GDP", "DFF" ],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [100,1, 1],
    units: ["percent", "percent", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "DFF",
  },
  {
    title: "Total US Debt / GDP and Fed Funds Rate",
    urlendpoint: "usdebtGDP_ffer",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 1,
    chartToCreateName : ["Total Debt as a % of GDP"],
    chartMethod : [["Division"]],
    adjustYaxis: true,
    tag: ["GFDEBTN",  "GDP", "DFF"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1/100,1, 1],
    units: ["percent", "percent", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "DFF",
  },
 
  {
    title: "Total US Debt / M2 and Fed Funds Rate",
    urlendpoint: "usdebtM2_ffer",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 1,
    chartToCreateName : ["Total Debt as a % of M2"],
    chartMethod : [["Division"]],
    adjustYaxis: true,
    tag: ["GFDEBTN" , "WM2NS", "DFF"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["q", "q", "q"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1,100, 1],
    units: ["percent", "percent", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "DFF",
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
    yaxistype : [0,0],
    units: ["percent", "percent"],
    comparisonChartName: "M2REAL",
  },

  {
    title: "% of Cash Assets in Small Commercial Banks",
    urlendpoint: "pct_cash_smallbanks",
    use: "case4",
    numChartToCreate : 1,
    chartToCreate: true,
    chartToCreateName :["% of cash assets in small commercial banks"],
    adjustYaxis: true,
    chartMethod : [["Division"]],
    tag: ["CASSCBW027SBOG", "TLASCBM027SBOG","CASSCBW027SBOG"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["m", "m","m"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [100, 1,1],
    units: ["percent", "Billions of Dollars"],
    yaxistype : [0,1],
    comparisonChartName: "CASSCBW027SBOG",
  },
  {
    title: "% of Cash Assets in Large Commercial Banks",
    urlendpoint: "pct_cash_largebanks",
    use: "case4",
    numChartToCreate : 1,
    chartToCreate: true,
    chartToCreateName :  ["% of cash assets in large commercial banks"],
    adjustYaxis: true,
    chartMethod : [["Division"]],
    tag: ["CASLCBW027SBOG", "TLALCBM027SBOG","CASLCBW027SBOG"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["m", "m","m"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [100, 1,1],
    units: ["percent", "Billions of Dollars"],
    yaxistype : [0,1],
    comparisonChartName: "CASLCBW027SBOG",
  },

  {
    title: "% of Cash Assets in All Commercial Banks",
    urlendpoint: "pct_cash_allbanks",
    use: "case4",
    numChartToCreate : 1,
    chartToCreate: true,
    chartToCreateName :  ["% of cash assets in all commercial banks"],
    adjustYaxis: true,
    chartMethod : [["Division"]],
    tag: ["CASACBW027SBOG", "TLAACBW027SBOG","CASACBW027SBOG"],
    source :  ["FRED", "FRED","FRED"],
    frequency: ["m", "m","m"],
    transformation: ["lin", "lin","lin"],
    aggregation: ["avg", "avg","avg"],
    adjustment: [100, 1,1],
    units: ["percent", "Billions of Dollars"],
    yaxistype : [0,1],
    comparisonChartName: "CASACBW027SBOG",
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


  {
    title: "Wilshire 5000 Index vs. 10Y-2Y Year Yield",
    urlendpoint: "wilshire_yield_diff1",
    use: "compare",
    chartToCreate: false,
    // chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["WILL5000PR", "T10Y2YM"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["points", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "T10Y2YM",
  },

  {
    title: "Wilshire 5000 Index vs. 10Y-3mo Yield",
    urlendpoint: "wilshire_yield_diff2",
    use: "compare",
    chartToCreate: false,
    // chartToCreateName :  "% of cash assets in all commercial banks",
    adjustYaxis: true,
    // chartMethod : "Division",
    tag: ["WILL5000PR", "T10Y3M"],
    source :  ["FRED", "FRED"],
    frequency: ["m", "m"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["points", "percent"],
    yaxistype : [0,1],
    comparisonChartName: "T10Y3M",
  },

  {
    title: "Baker Hughes Rig Count",
    urlendpoint: "rigcount",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: ["latAm", "europe", "africa","middleEast", "asiaPacific", "totalInt", "canada", "US", "totalWorld"],
    source: ["BakerHughes", "BakerHughes", "BakerHughes", "BakerHughes", "BakerHughes","BakerHughes", "BakerHughes", "BakerHughes","BakerHughes"],
    frequency: ["m","m","m","m","m","m","m","m","m",],
    transformation: ["lin","lin","lin","lin","lin","lin","lin","lin","lin"],
    aggregation: ["avg","avg","avg","avg","avg","avg","avg","avg","avg"],
    adjustment: [1, 1, 1,1, 1,1,1,1,1],
    units: [
      "count",
      "count",
      "count",
      "count",
      "count",
      "count",
      "count",
      "count",
      "count",
    ],
    comparisonChartName: null,
    colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  },

  {
    title: "US Rig Count(Oil + Gas) vs. WTI price",
    urlendpoint: "rigcount_wti",
    use: "compare",
    chartToCreate: false,
    adjustYaxis: true,
    tag: ["US", "WTISPLC"],
    source: ["BakerHughes", "FRED"],
    frequency: ["m","m"],
    transformation: ["lin","lin"],
    aggregation: ["avg","avg"],
    adjustment: [1, 1],
    units: [
      "count",
      "dollars"
    ],
    yaxistype : [0,1],
    comparisonChartName: "WTISPLC",
    // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  },

  {
    title: "Relative Cost of Servicing Debt",
    urlendpoint: "mortgagedebtcost",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 2, //length of chartmethod
    chartToCreateName : ["Mortgage burden on families on current rates", "Mortgage burden on families on mortgage rate at 3%"],
    chartMethod : [["Multiplication", "Division"], ["Division"]],
    adjustYaxis: true,
    tag: ["HHMSDODNS",  "MORTGAGE30US","PI", "HHMSDODNS","PI", "MDSP"],
    source: ["FRED","FRED", "FRED", "FRED","FRED","FRED"],
    frequency: ["q","q","q", "q","q", "q"],
    transformation: ["lin","lin","lin", "lin","lin", "lin"],
    aggregation: ["avg","avg","avg", "avg","avg", "avg"],
    adjustment: [100, 1/100,1, 3, 1, 1],
    units: [
      "Values"
    ],
    yaxistype : [0,0,0],
    comparisonChartName: "MDSP",
    reference : "https://fredblog.stlouisfed.org/2023/07/inflation-and-the-cost-of-tighter-monetary-policy/?utm_source=twitter&utm_medium=SM&utm_content=stlouisfed&utm_campaign=7f0a5639-cbeb-4b2a-b0f0-4a182c5b0ac1"
    // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  },

  {
    title: "Gasoline prices in respect to CPI and Wage",
    urlendpoint: "gasolinerelativecost",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 2, //length of chartmethod
    chartToCreateName : ["Gasoline price in respect to CPI(CPI at 1990)", "Gasoline price in respect to Average Hourly Wage(no units)"],
    chartMethod : [["Division"], ["Division"]],
    adjustYaxis: true,
    tag: ["GASREGW",  "CPIAUCSL","GASREGW", "AHETPI", "GASREGW"],
    source: ["FRED","FRED", "FRED", "FRED","FRED"],
    frequency: ["m","m","m", "m", "m"],
    transformation: ["lin","lin","lin", "lin","lin"],
    aggregation: ["avg","avg","avg", "avg","avg"],
    adjustment: [127.5, 1, 60, 1,1],
    units: [
      "$ per Gallon adjusted to CPI", "$/Gallon"
    ],
    yaxistype : [0,0,1],
    comparisonChartName: "GASREGW",
    reference : "https://fredblog.stlouisfed.org/2023/07/are-real-gasoline-prices-really-higher/"
    // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  },

  {
    title: "Gasoline relative to CPI and average wage",
    urlendpoint: "gasolinerelativecost",
    use: "case4",
    chartToCreate: true,
    numChartToCreate : 2, //length of chartmethod
    chartToCreateName : ["Gasoline price in respect to CPI(CPI at 1990)", "Gasoline price in respect to Average Hourly Wage(no units)"],
    chartMethod : [["Division"], ["Division"]],
    adjustYaxis: true,
    tag: ["GASREGW",  "CPIAUCSL","GASREGW", "AHETPI", "GASREGW"],
    source: ["FRED","FRED", "FRED", "FRED","FRED"],
    frequency: ["m","m","m", "m", "m"],
    transformation: ["lin","lin","lin", "lin","lin"],
    aggregation: ["avg","avg","avg", "avg","avg"],
    adjustment: [127.5, 1, 60, 1,1],
    units: [
      "$ per Gallon adjusted to CPI", "$/Gallon"
    ],
    yaxistype : [0,0,1],
    comparisonChartName: "GASREGW",
    reference : "https://fredblog.stlouisfed.org/2023/07/are-real-gasoline-prices-really-higher/"
    // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  },

  // {
  //   title: "Non-Commerical Net Futures Positions and WTI Price",
  //   urlendpoint: "futures_wti",
  //   use: "compare",
  //   // chartToCreate: true,
  //   // numChartToCreate : 1, //length of chartmethod
  //   // chartToCreateName : ["Non Commerical Net Positions"],
  //   // chartMethod : [["Addition"]],
  //   adjustYaxis: true,
  //   tag: ["WTI-PHYSICAL","EURO FX", "WTISPLC"],
  //   source: ["CFTC","CFTC","FRED"],
  //   frequency: ["","","m"],
  //   transformation: ["","","lin"],
  //   aggregation: ["","","avg"],
  //   columnsToUse : [["noncomm_positions_net"],["noncomm_positions_net"],""],
  //   adjustment: [1, 1,1],
  //   units: [
  //     "contracts", "$/barrel"
  //   ],
  //   yaxistype : [0,0,1],
  //   comparisonChartName: "WTISPLC",
  //   // reference : "https://fredblog.stlouisfed.org/2023/07/are-real-gasoline-prices-really-higher/"
  //   // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  // },

  // {
  //   title: "Non-Commerical Net Futures Positions and Nasdaq",
  //   urlendpoint: "futures_nasdaq",
  //   use: "compare",
  //   // chartToCreate: true,
  //   // numChartToCreate : 1, //length of chartmethod
  //   // chartToCreateName : ["Non Commerical Net Positions"],
  //   // chartMethod : [["Addition"]],
  //   adjustYaxis: true,
  //   tag: ["NASDAQ MINI","NASDAQCOM"],
  //   source: ["CFTC","FRED"],
  //   frequency: ["","m"],
  //   transformation: ["","lin"],
  //   aggregation: ["","avg"],
  //   columnsToUse : [["noncomm_positions_net"],""],
  //   adjustment: [1, 1],
  //   units: [
  //     "contracts", "points"
  //   ],
  //   yaxistype : [0,1],
  //   comparisonChartName: "NASDAQCOM",
  //   // reference : "https://fredblog.stlouisfed.org/2023/07/are-real-gasoline-prices-really-higher/"
  //   // colors : ['#1f77b4', '#7f7f7f', "#FF00FF",'#8c564b', '#ff7f0e', '#9467bd', '#2ca02c', '#d62728' , '#e377c2'],
  // },



 
  
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
