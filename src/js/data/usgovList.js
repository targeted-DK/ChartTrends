//case1 : create a chart(addition) and compare with the last one
//case2: three charts - todo
//case3: (two charts) create a chart(division) using two and compare the created one with the other one
//case4: (three charts) create a chart(division) using two and compared the created one with the third one
//case5: create two charts from four charts and compare created two charts or 2,4,6,8...
//compare : compare two charts with different units or same units
//enmerate : compare multiple charts with same units

let usgovList = [
    {
      title: "T-Bill Rate, Federal Expenditure, and Tax Receipt",
      urlendpoint : "rate_exp_tax",
      use : "case4",
      chartToCreate : true,
      chartToCreateName : ["US Government Expenditure as a % of GDP", "US Government Tax Receipt as a % of GDP"],
      chartMethod : "Division",
      numChartToCreate : 2,
      adjustYaxis: true,
      tag: ["W006RC1Q027SBEA", "GDP", "FGEXPND", "GDP", "DGS3MO" ],
      source :  ["FRED", "FRED","FRED", "FRED","FRED"],
      frequency : ["q", "q","q", "q","d"],
      transformation :["lin","lin","lin","lin","lin"],
      aggregation : ["avg","avg","avg","avg","avg"],
      adjustment: [100,1,100,1,1],
      units : ["percent","percent","percent"],
      yaxistype :[0,0,1],
      comparisonChartName : "DGS3MO"
    },

  ];
  
  
  export default usgovList;
  