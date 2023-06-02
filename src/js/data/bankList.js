//case1 : create a chart using graphs and compare with the last one
//case2: three charts -todo
//compare : compare two charts with different units
//enmerate : compare multiple charts with same units
//  case2, compare, enumerate

let bankList = [
   
   

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
      title: "Ratio of Securities in Bank Credit by type of Commercial Banks",
      urlendpoint : "securities_ratio_bank",
      use : "case5",
      chartToCreate : true,
      chartToCreateName :["Ratio of Securities in Bank Credit of All Commercial Banks","Ratio of Securities in Bank Credit of Small Domestically Chartered Commercial Banks","Ratio of Securities in Bank Credit of Large Domestically Chartered Commercial Banks"],
      chartMethod : "Division",
      adjustYaxis: false,
      tag: ["TOTBKCR", "SBCACBW027SBOG","BC0SCBW027SBOG", "SBCSCBW027SBOG", "BC0LCBW027SBOG","SBCLCBW027SBOG"],
      source :  ["FRED", "FRED","FRED","FRED","FRED","FRED"],
      frequency : ["w", "w", "w","w","w","w"],
      transformation :["lin", "lin","lin", "lin", "lin", "lin"],
      aggregation : ["avg","avg","avg","avg","avg","avg"],
      adjustment: [10,1,10,1,10,1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars","Billions of dollars","Billions of dollars","Billions of dollars"],
      newUnits : ["percent", "percent","percent"],
      comparisonChartName : null,
    },
  

    {
      title: "Commercial Real Estate Loans by Small, Large, All Commercial Banks",
      urlendpoint : "cre_bybank",
      use : "enumerate",
      chartToCreate : false,
      adjustYaxis: false,
      tag: ["CRESCBW027SBOG", "CRELCBW027SBOG","CREACBW027SBOG"],
      source :  ["FRED", "FRED","FRED"],
      frequency : ["m", "m", "m"],
      transformation :["lin", "lin","lin"],
      aggregation : ["avg","avg","avg"],
      adjustment: [1,1,1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars"],
      comparisonChartName : null,
    },

   

    {
      title: "Ratio of Commercial Real Estate (CRE) Loans in Small and Large Commercial Banks",
      urlendpoint : "cre_loan_ratio",
      use : "case5",
      chartToCreate : true,
      chartToCreateName : ["CRE Ratio in Small Banks", "CRE Ratio in Large Banks"],
      chartMethod : "Division",
      adjustYaxis: false,
      tag: ["CRESCBW027SBOG", "LLBSCBW027SBOG","CRELCBW027SBOG", "LLBLCBW027NBOG"],
      source :  ["FRED", "FRED","FRED", "FRED"],
      frequency : ["w", "w", "w", "w"],
      transformation :["lin", "lin","lin", "lin"],
      aggregation : ["avg","avg","avg", "avg"],
      adjustment: [1,1,1, 1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars", "Billions of dollars"],
      newUnits : ["percent", "percent"],
      comparisonChartName : null,
    },

    {
      title: "National Deposit Rates and EFFR",
      urlendpoint : "deposits_effr",
      use : "enumerate",
      chartToCreate : false,
      chartToCreateName : null,
      chartMethod : null,
      adjustYaxis: false,
      tag: ["NDR12MCD", "SNDR","DFF"],
      source :  ["FRED", "FRED","FRED"],
      frequency : ["m", "m", "m"],
      transformation :["lin", "lin","lin"],
      aggregation : ["avg","avg","avg"],
      adjustment: [1,1,1],
      units : ["percent","percent","percent"],
      newUnits : null,
      comparisonChartName : null,
    },

    {
      title: "Cash Assets Ratio as a Percentage of Deposits in Banks",
      urlendpoint : "cashreserves_banks",
      use : "case5",
      chartToCreate : true,
      chartToCreateName :["Cash/Reserve in Small Commercial Banks","Cash/Reserve in Large Commercial Banks"],
      chartMethod : "Division",
      adjustYaxis: false,
      tag: ["CASSCBW027SBOG", "DPSSCBW027SBOG","CASLCBW027SBOG", "DPSLCBW027SBOG"],
      source :  ["FRED", "FRED","FRED","FRED"],
      frequency : ["w", "w", "w","w"],
      transformation :["lin", "lin","lin", "lin"],
      aggregation : ["avg","avg","avg","avg"],
      adjustment: [100,1,100,1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars","Billions of dollars"],
      newUnits : ["percent", "percent"],
      comparisonChartName : null,
    },

    {
      title: "Total Deposits by Bank Type",
      urlendpoint : "deposits_bank",
      use : "enumerate",
      chartToCreate : null,
      chartToCreateName : null,
      chartMethod :null,
      adjustYaxis: false,
      tag: ["DPSACBW027SBOG", "DPSLCBW027SBOG","DPSSCBW027SBOG"],
      source :  ["FRED", "FRED","FRED"],
      frequency : ["w", "w", "w"],
      transformation :["lin", "lin","lin"],
      aggregation : ["avg","avg","avg"],
      adjustment: [1,1,1],
      units : ["Billions of dollars","Billions of dollars","Billions of dollars"],
      newUnits : null,
      comparisonChartName : null,
    },


    {
      title: "Level of Reserves / GDP",
      urlendpoint : "lor_gdp",
      use : "case5",
      chartToCreate : true,
      chartToCreateName : ["Level of Reserves to GDP Ratio"],
      chartMethod :null,
      adjustYaxis: false,
      tag: ["WRESBAL", "GDP"],
      source :  ["FRED", "FRED"],
      frequency : ["w", "q"],
      transformation :["lin", "lin"],
      aggregation : ["avg","avg"],
      adjustment: [100,1],
      units : ["Billions of dollars","Billions of dollars"],
      newUnits : ["percent"],
      comparisonChartName : null,
    },

   


  
  
  
  ];
  
  
  export default bankList;
  