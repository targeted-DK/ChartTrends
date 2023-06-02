//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

let fedList = [
  {
    title: "Federal Reserve Short Term Liquidity Support",
    urlendpoint: "fedshorttermliquidity",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: ["H41RESPPALGTRFNWW", "WLCFLPCL", "H41RESPPALDKNWW", "WLCFOCEL"],
    source: ["FRED", "FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1],
    units: [
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
    ],
    comparisonChartName: null,
  },

  {
    title: "Federal Reserve COVID-19 Liquidity Support",
    urlendpoint: "fedcovidliquidity",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: ["H41RESPPALDJNWW", "H41RESPPAAENWW", "H41RESPPAADHNWW", "H41RESPPAATAL2HNWW"],
    source: ["FRED", "FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w", "w"],
    transformation: ["lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1],
    units: [
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
    ],
    comparisonChartName: null,
  },

  {
    title: "Types of Securities FED Holds",
    urlendpoint: "fed_securities",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: [
        "WSHOSHO",
        "WSHOBL",
        "WSHONBNL",
        "WSHONBIIL",
        "FEDDT",
        "WSHOMCB",

      "WUPSHO",
      "WUDSHO",
      "H41RESPPALGTRFNWW",
      "WLCFLPCL",
      "H41RESPPALDKNWW",
      "WLCFOCEL",
      "H41RESPPALDJNWW",
      "H41RESPPAAENWW",
      "H41RESPPAADHNWW",
      "H41RESPPAATAL2HNWW",
      "WAOAL",
    ],
    source: [
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
      "FRED",
    ],
    frequency: ["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
    transformation: [
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
      "lin",
    ],
    aggregation: [
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
      "avg",
    ],
    adjustment: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1],
    units: [
        "Millions of dollars",
        "Millions of dollars",
        "Millions of dollars",
        "Millions of dollars",
        "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
    ],
    comparisonChartName: null,
  },

  {
    title: "RRP, TGA and Level of Reserves",
    urlendpoint: "rrp_tga_lor",
    use: "enumerate",
    chartToCreate: false,
    adjustYaxis: false,
    tag: ["RRPONTSYD", "WTREGEN", "WRBWFRBL"],
    source: ["FRED", "FRED", "FRED"],
    frequency: ["w", "w", "w"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1000, 1000, 1],
    units: [
      "Millions of dollars",
      "Millions of dollars",
      "Millions of dollars",
    ],
    comparisonChartName: null,
  },

  {
    title: "National Deposit Rates and EFFR",
    urlendpoint: "deposit_effr",
    use: "enumerate",
    chartToCreate: false,
    chartToCreateName: null,
    chartMethod: null,
    adjustYaxis: false,
    tag: ["NDR12MCD", "SNDR", "FEDFUNDS"],
    source: ["FRED", "FRED", "FRED"],
    frequency: ["m", "m", "m"],
    transformation: ["lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg"],
    adjustment: [1, 1, 1],
    units: ["percent", "percent", "percent"],
    newUnits: null,
    comparisonChartName: null,
  },

  {
    title: "FRED Federal Funds Rate Range",
    urlendpoint: "rate_range",
    use: "enumerate",
    chartToCreate: null,
    chartToCreateName: null,
    chartMethod: null,
    adjustYaxis: false,
    tag: ["DPCREDIT", "DFEDTARU", "DFEDTARL", "IORB", "DFF", "RRPONTSYAWARD"],
    source: ["FRED", "FRED", "FRED", "FRED", "FRED", "FRED"],
    frequency: ["d", "d", "d", "d", "d", "d"],
    transformation: ["lin", "lin", "lin", "lin", "lin", "lin"],
    aggregation: ["avg", "avg", "avg", "avg", "avg", "avg"],
    adjustment: [1, 1, 1, 1, 1, 1],
    units: ["percent", "percent", "percent", "percent", "percent", "percent"],
    newUnits: null,
    comparisonChartName: null,
  },

  {
    title: "RRP vs T-bill rate",
    urlendpoint: "rrp_tbill",
    use: "compare",
    chartToCreate: false,
    chartToCreateName: null,
    chartMethod: null,
    adjustYaxis: true,
    tag: ["RRPONTSYD", "DGS1MO"],
    source: ["FRED", "FRED"],
    frequency: ["d", "d"],
    transformation: ["lin", "lin"],
    aggregation: ["avg", "avg"],
    adjustment: [1, 1],
    units: ["Billions of dollars", "percent"],
    newUnits: null,
    comparisonChartName: "DGS1MO",
    description:
      "The Level of inflow to RRP from MMF depends on the short term interest rates and t-bill.",
  },
];

export default fedList;
