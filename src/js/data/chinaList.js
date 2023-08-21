const chinaList = [

    {
        title: "China Current Account and Dollar Index",
        urlendpoint: "chinaca_dollarindex",
        openaiItem : ["China Current Account, Dollar Index"],
        use: "compare",
        chartToCreate: false,
        // chartToCreateName : ["Domestic Liquidity Indicator"],
        // chartMethod : "Addition",
        adjustYaxis: true,
        tag: ["902Y009_CN", "DTWEXBGS"],
        source :  ["BOK", "FRED"],
        frequency: ["Q", "m"],
        transformation: ["lin", "lin"],
        aggregation: ["avg", "avg"],
        adjustment: [1, 1],
        units: ["Million USD", "Index"],
        yaxistype : [0,1],
        // adjustYaxis 
        comparisonChartName: "DTWEXBGS",
      },


    {
        title: "China Current Account, HSI",
        urlendpoint: "chinaca_hsi",
        openaiItem : ["China Current Account", "HangSeng Index"],
        use: "compare",
        chartToCreate: false,
        // chartToCreateName : ["Domestic Liquidity Indicator"],
        // chartMethod : "Addition",
        adjustYaxis: true,
        tag: ["902Y009_CN", "902Y002_3020114"],
        source :  ["BOK", "BOK"],
        frequency: ["Q", "M"],
        transformation: ["lin", "lin"],
        aggregation: ["avg",  "avg"],
        adjustment: [1, 1],
        units: ["Million USD", "Index"],
        yaxistype : [0,1],
        // adjustYaxis 
        comparisonChartName: "902Y002_3020114",
      },

      {
        title: "China Current Account, Oil",
        urlendpoint: "chinaca_oil",
        openaiItem : ["China Current Account", "WTI Oil Price"],
        use: "compare",
        chartToCreate: false,
        // chartToCreateName : ["Domestic Liquidity Indicator"],
        // chartMethod : "Addition",
        adjustYaxis: true,
        tag: ["902Y009_CN", "WTISPLC"],
        source :  ["BOK", "FRED"],
        frequency: ["Q", "m"],
        transformation: ["lin", "lin"],
        aggregation: ["avg",  "avg"],
        adjustment: [1, 1],
        units: ["Million USD", "dollars"],
        yaxistype : [0,1],
        // adjustYaxis 
        comparisonChartName: "WTISPLC",
      },





]

export default chinaList;