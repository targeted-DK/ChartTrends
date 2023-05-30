//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

let bankList = [
    {
      title: "Federal Reserve Short Term Liquidity support",
      urlendpoint : "fedshorttermliquidity",
      use : "enumerate",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["H41RESPPALGTRFNWW", "WLCFLPCL", "H41RESPPALDKNWW", "WLCFOCEL"],
      source :  ["FRED", "FRED","FRED", "FRED"],
      frequency : ["w", "w","w", "w"],
      transformation :["lin", "lin", "lin", "lin"],
      aggregation : ["avg","avg","avg","avg"],
      adjustment: [1, 1,1,1],
      units : ["Millions of dollars","Millions of dollars","Millions of dollars","Millions of dollars"],
      comparisonChartName : null
    },

    {
      title: "Treasury General Account and Level of Reserves",
      urlendpoint : "tga_lor",
      use : "compare",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["WTREGEN", "WRBWFRBL"],
      source :  ["FRED", "FRED"],
      frequency : ["w", "w"],
      transformation :["lin", "lin"],
      aggregation : ["avg","avg"],
      adjustment: [1000,1],
      units : ["Millions of dollars","Millions of dollars"],
      comparisonChartName : "WRBWFRBL"
    },

    {
      title: "M2 and Deposits in All Commercial Banks",
      urlendpoint : "m2_deposits",
      use : "enumerate",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["WM2NS", "DPSACBW027SBOG"],
      source :  ["FRED", "FRED"],
      frequency : ["w", "w"],
      transformation :["lin", "lin"],
      aggregation : ["avg","avg"],
      adjustment: [1,1],
      units : ["Billions of dollars","Billions of dollars"],
      comparisonChartName : null,
    },

    {
      title: "Loans and Leases vs. Securities in Bank Credit in All Commerical Banks",
      urlendpoint : "loans_securities_bank",
      use : "enumerate",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["SBCACBW027SBOG", "TOTLL"],
      source :  ["FRED", "FRED"],
      frequency : ["w", "w"],
      transformation :["lin", "lin"],
      aggregation : ["avg","avg"],
      adjustment: [1,1],
      units : ["Billions of dollars","Billions of dollars"],
      comparisonChartName : null,
    },

    {
      title: "Commercial Real Estate Loans by Small, Large, All Commercial Banks.",
      urlendpoint : "cre_bybank",
      use : "enumerate",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["CRESCBM027NBOG", "CRELCBW027SBOG","CREACBW027SBOG"],
      source :  ["FRED", "FRED","FRED"],
      frequency : ["m", "m", "m"],
      transformation :["lin", "lin","lin"],
      aggregation : ["avg","avg","avg"],
      adjustment: [1,1,1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars"],
      comparisonChartName : null,
    },

  ];
  
  
  export default bankList;
  