//@TODO - Wednesday level? weekly?
//@TODO - When calculating different frequency data, rather spread larger period data so every smaller period data can be used
//@TODO - consolidate cases

export const fredDataList = {
  //@TODO - Recession Indicator
  "NBER based Recession Indicators for the United States from the Period following the Peak through the Trough":
    "USREC",
  //Index stuff
  "Wilshire 5000 Price Index": "WILL5000PR",
  "S&P 500": "SP500",
  "NASDAQ Composite Index": "NASDAQCOM",
  "Nikkei Stock Average, Nikkei 225": "NIKKEI225",
  // S&P/Case-Shiller U.S. National Home Price Index (CSUSHPINSA),

  //interest rate
  "1-Month Real Interest Rate": "REAINTRATREARAT1MO",
  "1-Year Real Interest Rate": "REAINTRATREARAT1YE",
  "10-Year Real Interest Rate": "REAINTRATREARAT10Y",

  //bonds
  "10-Year Treasury Constant Maturity Minus 3-Month Treasury Constant Maturity":
    "T10Y3M",
  "10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity":
    "T10Y2YM",

  //inflation stuff
  "5-Year Breakeven Inflation Rate": "T5YIE",
  "7-year Breakeven Inflation Rate": "T7YIEM",
  "10-Year Breakeven Inflation Rate": "T10YIE",
  "20-year Breakeven Inflation Rate": "T20YIEM",
  "30-year Breakeven Inflation Rate": "T30YIEM",

  "1-Year Expected Inflation": "EXPINF1YR",
  "5-Year Expected Inflation": "EXPINF5YR",
  "10-Year Expected Inflation": "EXPINF10YR",
  "20-Year Expected Inflation": "EXPINF20YR",
  "30-Year Expected Inflation": "EXPINF30YR",
  "University of Michigan: Inflation Expectation": "MICH",

  //Macro Stuff
  "Market Yield on U.S. Treasury Securities at 1-Month Constant Maturity, Quoted on an Investment Basis":
    "DGS1MO",
  "Market Yield on U.S. Treasury Securities at 3-Month Constant Maturity, Quoted on an Investment Basis":
    "DGS3MO",
  "Market Yield on U.S. Treasury Securities at 6-Month Constant Maturity, Quoted on an Investment Basis":
    "DGS6MO",

  "Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity, Quoted on an Investment Basis":
    "DGS10",
  "Market Yield on U.S. Treasury Securities at 10-/Year Constant Maturity, Quoted on an Investment Basis, Inflation-Indexed":
    "DFII10",
  "Nominal Broad U.S. Dollar Index": "DTWEXBGS",
  "Spot Crude Oil Price: West Texas Intermediate (WTI)": "WTISPLC",
  "ICE BofA US High Yield Index Option-Adjusted Spread": "BAMLH0A0HYM2",

  "Liabilities and Capital: Liabilities: Deposits with F.R. Banks, Other Than Reserve Balances: U.S. Treasury, General Account: Week Average":
    "WTREGEN",
  "Gross Domestic Product": "GDP",
  M2: "WM2NS",
  "Real M2 Money Stock": "M2REAL",
  "Sticky Price Consumer Price Index less Food and Energy":
    "CORESTICKM159SFRBATL",
  "Consumer Price Index for All Urban Consumers: All Items in U.S. City Average":
    "CPIAUCSL",
  "Consumer Price Index for All Urban Consumers: Used Cars and Trucks in U.S. City Average":
    "CUSR0000SETA02",
  "30-Year Fixed Rate Mortgage Average in the United States": "MORTGAGE30US",

  //total domestic liquidity (the Fed’s balance sheet minus the Treasury General Account minus reverse repos
  "Assets: Total Assets: Total Assets (Less Eliminations from Consolidation): Wednesday Level":
    "WALCL",
  "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations":
    "RRPONTSYD",
  "Liabilities and Capital: Liabilities: Deposits with F.R. Banks, Other Than Reserve Balances: U.S. Treasury, General Account: Week Average":
    "WTREGEN",

  //Fed Stuff
  //fed asset (in order of H.4.1)
  "Assets: Total Assets: Total Assets: Wednesday Level": "RESPPANWW",
  //fed asset - securities
  "Assets: Securities Held Outright: Securities Held Outright: Wednesday Level":
    "WSHOSHO",
  "Assets: Securities Held Outright: U.S. Treasury Securities: Notes and Bonds: Wednesday Level":
    " RESPPALGUONNWW",
  "Assets: Securities Held Outright: U.S. Treasury Securities: Bills: Wednesday Level":
    "WSHOBL",
  "Assets: Securities Held Outright: U.S. Treasury Securities: Notes and Bonds, Nominal: Wednesday Level":
    "WSHONBNL",
  "Assets: Securities Held Outright: U.S. Treasury Securities: Notes and Bonds, Inflation-Indexed: Wednesday Level":
    "WSHONBIIL",
  "Assets: Securities Held Outright: Federal Agency Debt Securities: All: Wednesday Level":
    "FEDDT",
  "Assets: Securities Held Outright: Mortgage-Backed Securities: Wednesday Level":
    "WSHOMCB",

  "Assets: Unamortized Premiums on Securities Held Outright: Wednesday Level":
    "WUPSHO",
  "Assets: Unamortized Discounts on Securities Held Outright: Wednesday Level":
    "WUDSHO",
  //FIMA
  "Assets: Other: Repurchase Agreements - Foreign Official: Wednesday Level":
    "H41RESPPALGTRFNWW",
  //fed asset - loans(재할인 창구)
  "Assets: Liquidity and Credit Facilities: Loans: Primary Credit: Wednesday Level":
    "WLCFLPCL",
  //fed asset - bank crisis loans
  "Assets: Liquidity and Credit Facilities: Loans: Bank Term Funding Program, Net: Wednesday Level":
    "H41RESPPALDKNWW",
  //fed asset - other loans (Bridge Bank Loan)
  "Assets: Liquidity and Credit Facilities: Loans: Other Credit Extensions: Wednesday Level":
    "WLCFOCEL",
  //fed asset - covid loans
  "Assets: Liquidity and Credit Facilities: Loans: Payroll Protection Program Liquidity Facility: Wednesday Level":
    "H41RESPPALDJNWW",
  "Assets: Liquidity and Credit Facilities: Net Portfolio Holdings of MS Facilities LLC (Main Street Lending Program): Wednesday Level":
    "H41RESPPAAENWW",
  "Assets: Liquidity and Credit Facilities: Net Portfolio Holdings of Municipal Liquidity Facility LLC: Wednesday Level":
    "H41RESPPAADHNWW",
  "Assets: Liquidity and Credit Facilities: Net Portfolio Holdings of TALF II LLC: Wednesday Level":
    "H41RESPPAATAL2HNWW",
  //fed asset - interests etc.
  "Assets: Other: Other Assets, Consolidated Table: Wednesday Level": "WAOAL",

  // "Federal Funds Effective Rate": "FEDFUNDS",
  "Assets: Central Bank Liquidity Swaps: Central Bank Liquidity Swaps: Wednesday Level":
    "SWPT",
  "Secured Overnight Financing Rate": "SOFR",
  "Overnight Reverse Repurchase Agreements Award Rate: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations":
    "RRPONTSYAWARD",
  "Federal Funds Target Range - Upper Limit": "DFEDTARU",
  "Federal Funds Target Range - Lower Limit": "DFEDTARL",
  "Interest Rate on Reserve Balances": "IORB",
  "Federal Funds Effective Rate": "DFF",
  "Discount Window Primary Credit Rate": "DPCREDIT",

  //지급 준비금//최소안정수준 지급준비금(LCLoR) = 8%//9월 TGA목표 확인할것
  "Liabilities and Capital: Other Factors Draining Reserve Balances: Reserve Balances with Federal Reserve Banks: Wednesday Level":
    "WRBWFRBL",

  //mmf - check https://www.ici.org/research/stats/mmfassets
  "Retail Money Market Funds": "RMFSL",

  //Government Debt Stuff
  "Federal Debt: Total Public Debt": "GFDEBTN",
  "Federal Debt Held by Foreign and International Investors": "FDHBFIN",
  "Federal Debt Held by the Public": "FYGFDPUN",
  "Federal Government: Current Expenditures": "FGEXPND",
  "Federal government current expenditures: Interest payments":
    "A091RC1Q027SBEA",
  "Federal Debt: Total Public Debt as Percent of Gross Domestic Product":
    "GFDEGDQ188S",
  "Federal government current tax receipts": "W006RC1Q027SBEA",
  "Federal Surplus or Deficit [-]": "MTSDS133FMS",
  "Real Government Consumption Expenditures and Gross Investment": "GCEC1",
  "All Sectors; Debt Securities and Loans; Liability, Level": "TCMDO",

  //US Bank Stuff
  "Total Assets, All Commercial Banks": "TLAACBW027SBOG",
  "Total Liabilities, All Commercial Banks": "TLBACBW027SBOG",
  "Deposits, All Commercial Banks": "DPSACBW027SBOG",
  "Delinquency Rate on Credit Card Loans, All Commercial Banks": "DRCCLACBS",
  "Bank Prime Loan Rate Changes: Historical Dates of Changes and Rates":
    "PRIME",
  "Commercial and Industrial Loans, All Commercial Banks": "BUSLOANS",
  "Consumer Loans: Credit Cards and Other Revolving Plans, All Commercial Banks":
    "CCLACBW027SBOG",
  //TGA
  "Liabilities and Capital: Other Factors Draining Reserve Balances: Reserve Balances with Federal Reserve Banks: Week Average":
    "WRESBAL",

  //Bank Crisis

  "Bank Credit, All Commercial Banks": "TOTBKCR",
  "Bank Credit, Small Domestically Chartered Commercial Banks":
    "BC0SCBW027SBOG",
  "Bank Credit, Large Domestically Chartered Commercial Banks":
    "BC0LCBW027SBOG",
  "Securities in Bank Credit, All Commercial Banks": "SBCACBW027SBOG",
  "Securities in Bank Credit, Small Domestically Chartered Commercial Banks":
    "SBCSCBW027SBOG",
  "Securities in Bank Credit, Large Domestically Chartered Commercial Banks":
    "SBCLCBW027SBOG",
  "Cash Assets, All Commercial Banks": "CASACBW027SBOG",
  "Cash Assets, Large Domestically Chartered Commercial Banks":
    "CASLCBW027SBOG",
  "Cash Assets, Small Domestically Chartered Commercial Banks":
    "CASSCBW027SBOG",
  "Total Assets, All Commercial Banks": "TLAACBW027SBOG",
  "Total Assets, Large Domestically Chartered Commercial Banks":
    "TLALCBM027SBOG",
  "Total Assets, Small Domestically Chartered Commercial Banks":
    "TLASCBM027SBOG",
  "Deposits, All Commercial Banks": "DPSACBW027SBOG",
  "Deposits, Large Domestically Chartered Commercial Banks": "DPSLCBW027SBOG",
  "Deposits, Small Domestically Chartered Commercial Banks": "DPSSCBW027SBOG",
  "Real Estate Loans: Commercial Real Estate Loans, All Commercial Banks":
    "CREACBW027SBOG",
  "Real Estate Loans: Commercial Real Estate Loans, Small Domestically Chartered Commercial Banks":
    "CRESCBW027SBOG",

  "Real Estate Loans: Commercial Real Estate Loans, Large Domestically Chartered Commercial Banks":
    "CRELCBW027SBOG",

  "Loans and Leases in Bank Credit, All Commercial Banks": "TOTLL",
  "Loans and Leases in Bank Credit, Large Domestically Chartered Commercial Banks":
    "LLBLCBW027NBOG",
  "Loans and Leases in Bank Credit, Small Domestically Chartered Commercial Banks":
    "LLBSCBW027SBOG",

  "National Deposit Rates: 12-Month CD": "NDR12MCD",
  "National Deposit Rates: Savings": "SNDR",

  //households
  "Personal Saving Rate": "PSAVERT",
  "Average Hourly Earnings of All Employees, Total Private": "CES0500000003",

  //Corporate Stuff
  "Nonfinancial Corporate Business; Debt Securities and Loans; Liability, Level":
    "BCNSDODNS",

  //Investment
  "U.S. Net International Investment Position": "IIPUSNETIQ", //Can you find this one with longer observation period?

  //The MOVE Index is the bond market equivalent of the VIX Index. It measures the implied volatility of 1-month options from the 2-year note to the 30-year bond.

  //Manufacturing
  "Manufacturers' New Orders: Total Manufacturing": "AMTMNO",
  "Retailers: Inventories to Sales Ratio": "RETAILIRSA",

  //OIL STUFF
  "Crude Oil Prices: West Texas Intermediate (WTI) - Cushing, Oklahoma":
    "DCOILWTICO",
  "Crude Oil Prices: Brent - Europe": "DCOILBRENTEU",

  //commodity(monthly)
  // Global price of Copper (PCOPPUSDM)
  // Global price of Natural gas, EU (PNGASEUUSDM)
  // Global price of Wheat (PWHEAMTUSDM)
  // Global price of LNG, Asia (PNGASJPUSDM)
  // Global price of Sunflower Oil (PSUNOUSDM)
  // Global price of Energy index (PNRGINDEXM)
  // Global price of Aluminum (PALUMUSDM)
  // Global Price Index of All Commodities (PALLFNFINDEXM)
  // Global price of Brent Crude (POILBREUSDM)
  // Global price of Barley (PBARLUSDM)
  // Global price of Corn (PMAIZMTUSDM)
  // Global price of Agr. Raw Material Index (PRAWMINDEXM)
  // Global price of WTI Crude (POILWTIUSDM)

  //recession indicators
  "Motor Vehicle Retail Sales: Heavy Weight Trucks": "HTRUCKSSAAR",
  "Unemployment Level - Permanent Job Losers": "LNS13026638",

  //japan/korea
  "Residential Property Prices for Japan": "QJPN368BIS",
  "Nikkei Stock Average, Nikkei 225": "NIKKEI225",
  "Consumer Price Index of All Items in Japan": "JPNCPIALLMINMEI",
  "Real Residential Property Prices for Republic of Korea": "QKRR628BIS",

  // "M2 for Japan" :  "MYAGM2JPM189S", - discontinued

  //Labor Market
  Population: "POPTHM",
  "Unemployment Rate": "UNRATE",
  "Employment-Population Ratio": "EMRATIO",
  "Employment Rate: Aged 15-64: All Persons for the United States":
    "LREM64TTUSM156S",
  "Total Unemployed, Plus All Persons Marginally Attached to the Labor Force, Plus Total Employed Part Time for Economic Reasons, as a Percent of the Civilian Labor Force Plus All Persons Marginally Attached to the Labor Force (U-6)":
    "U6RATE",
  "All Employees, Total Private": "USPRIV",
  "All Employees, Total Nonfarm": "PAYEMS",
  "All Employees, Government": "USGOVT",
  "All Employees, Federal": "CES9091000001",
  "All Employees, Manufacturing": "MANEMP",
  "All Employees, Construction": "USCONS",
  "All Employees, Temporary Help Services": "TEMPHELPS",
  "All Employees, Truck Transportation": "CES4348400001",
  "All Employees, Leisure and Hospitality": "USLAH",
  "All Employees, Retail Trade": "USTRADE",
  "All Employees, Information": "USINFO",
  "All Employees, Financial Activities": "USFIRE",
  "All Employees, Transportation and Warehousing": "CES4300000001",
  "All Employees, Oil and Gas Extraction": "CES1021100001",
  "All Employees, Professional and Business Services": "USPBS",
  "All Employees, Wholesale Trade": "USWTRADE",
  "All Employees, Air Transportation": "CES4348100001",
  "All Employees, Other Services": "USSERV",
  "All Employees, Mining and Logging": "USMINE",
  "All Employees, Private Education And Health Services": "USEHS",
  "All Employees, Residential Building Construction": "CES2023610001",
  "All Employees, Coal Mining": "CES1021210001",
  "All Employees, Health Care": "CES6562000101",
  "All Employees, Child Care Services": "CES6562440001",
  "All Employees, Nursing and Residential Care Facilities": "CES6562300001",
  "All Employees, State Government": "CES9092000001",
  "All Employees, Warehousing and Storage": "CES4349300001",
  "All Employees, Motor Vehicles and Parts": "CES3133600101",
  "All Employees, Skilled Nursing Care Facilities": "CES6562310001",
  "All Employees, Trade, Transportation, and Utilities": "USTPU",
  "All Employees, Durable Goods": "DMANEMP",
  "All Employees, Local Government": "CES9093000001",
  "All Employees, Private Service-Providing": "CES0800000001",
  "All Employees, Real Estate": "CES5553100001",
  "All Employees, Commercial Banking": "CES5552211001",
  "All Employees, Finance and Insurance": "CES5552000001",
  "All Employees, Hospitals": "CES6562200001",
  "All Employees, Utilities": "CES4422000001",
  "All Employees, Arts, Entertainment, and Recreation": "CES7071000001",
  "All Employees, Health Care and Social Assistance": "CES6562000001",
  "All Employees, Semiconductor And Other Electronic Component Manufacturing":
    "CES3133440001",
  "All Employees, Construction of Buildings": "CES2023600001",
  "All Employees, Rail Transportation": "CES4348200001",
  "All Employees, Food Services and Drinking Places": "CES7072200001",
};

// const apiKey = process.env.eiaAPIKey;
export const eiaDataOilList = {
  //oil stocks
  "U.S. Ending Stocks of Crude Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WCRSTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Crude Oil in SPR (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WCSSTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks excluding SPR of Crude Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WCESTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Crude Oil and Petroleum Products (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WTTSTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Finished Motor Gasoline (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WGFSTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Distillate Fuel Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WDISTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Kerosene-Type Jet Fuel (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WKJSTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Ending Stocks of Residual Fuel Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/sndw/data/?frequency=weekly&data[0]=value&facets[series][]=WRESTUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,

  //field production and exports, imports- how about 4 week averages?
  "U.S. Exports of Crude Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WCREXUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Imports of Crude Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WCRIMUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Lower 48 States Field Production of Crude Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/sum/crdsnd/data/?frequency=monthly&data[0]=value&facets[series][]=MCRFP4E1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,

  //   "U.S. Exports of Crude Oil (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/move/exp/data/?frequency=monthly&data[0]=value&facets[series][]=MCREXUS1&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  //ng storage
  "Weekly Lower 48 States Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R48_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, //weekly
  "Lower 48 States Total Natural Gas in Underground Storage (Working Gas) (MMcf)": `https://api.eia.gov/v2/natural-gas/stor/sum/data/?frequency=monthly&data[0]=value&facets[series][]=NGM_EPG0_SAO_R48_MMCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, //monthly
  // number of rigs - the data returns null values.
  // "U.S. Crude Oil and Natural Gas Rotary Rigs in Operation (Count)" :	`https://api.eia.gov/v2/natural-gas/enr/drill/data/?frequency=monthly&data[0]=value&facets[series][]=E_ERTRR0_XR0_NUS_C&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  // "U.S. Crude Oil Rotary Rigs in Operation (Count)" : 	`https://api.eia.gov/v2/petroleum/crd/drill/data/?frequency=monthly&data[0]=value&facets[series][]=E_ERTRRO_XR0_NUS_C&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`	,
  // "U.S. Natural Gas Rotary Rigs in Operation (Count)" : `https://api.eia.gov/v2/petroleum/crd/drill/data/?frequency=monthly&data[0]=value&facets[series][]=E_ERTRRG_XR0_NUS_C&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`	,
};

export const eiaDataOilTags = [
  "WCRSTUS1",
  "WCSSTUS1",
  "WCESTUS1",
  "WTTSTUS1",
  "WGFSTUS1",
  "WDISTUS1",
  "WKJSTUS1",
  "WRESTUS1",

  //-----
  "DUC",
  "completed",
  "drilled"
];

export const eiaDUCList = [
  "DUC_Anadarko",
  "DUC_Appalachia",
  "DUC_Bakken",
  "DUC_Eagle Ford",
  "DUC_Haynesville",
  "DUC_Niobrara",
  "DUC_Permian",
  "DUC_DPR Regions",
];

//demands
export const eiaDataPetroleumList = {
   //product demands
   //4-week-average
   "4-Week Avg U.S. Product Supplied of Finished Motor Gasoline (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WGFUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
   "4-Week Avg U.S. Product Supplied of Kerosene-Type Jet Fuel (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WKJUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
   "4-Week Avg U.S. Product Supplied of Distillate Fuel Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WDIUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
   "4-Week Avg U.S. Product Supplied of Propane and Propylene (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WPRUP_NUS_2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
   "4-Week Avg U.S. Product Supplied of Other Oils (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WWOUP_NUS_2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
   "4-Week Avg U.S. Product Supplied of Residual Fuel Oil (Thousand Barrels per Day)" : `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WREUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
 
  //weekly
  "U.S. Product Supplied of Finished Motor Gasoline (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WGFUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Product Supplied of Kerosene-Type Jet Fuel (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WKJUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Product Supplied of Distillate Fuel Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WDIUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Product Supplied of Propane and Propylene (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WPRUP_NUS_2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Product Supplied of Other Oils (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WWOUP_NUS_2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Product Supplied of Residual Fuel Oil (Thousand Barrels per Day)" : `https://api.eia.gov/v2/petroleum/cons/wpsup/data/?frequency=weekly&data[0]=value&facets[series][]=WREUPUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
 
  //refinery utilizations
  "% Utilization Refinery Operable Capacity Weekly": `https://api.eia.gov/v2/petroleum/pnp/wiup/data/?frequency=weekly&data[0]=value&facets[series][]=WPULEUS3&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "4-week Avg % Utilization Refinery Operable Capacity": `https://api.eia.gov/v2/petroleum/pnp/wiup/data/?frequency=four-week-average&data[0]=value&facets[series][]=WPULEUS3&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,

  //exports and imports
  "U.S. Net Imports of Total Petroleum Products (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WRPNTUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Imports of Total Gasoline (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WGTIMUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Imports of Distillate Fuel Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WDIIMUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Imports of Kerosene-Type Jet Fuel (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WKJIMUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Imports of Residual Fuel Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WREIMUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Exports of Finished Motor Gasoline (Thousand Barrels)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=W_EPM0F_EEX_NUS-Z00_MBBLD&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, //this is not per day
  "U.S. Exports of Total Distillate (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WDIEXUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Exports of Kerosene-Type Jet Fuel (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WKJEXUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Exports of Residual Fuel Oil (Thousand Barrels per Day)": `https://api.eia.gov/v2/petroleum/move/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=WREEXUS2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
};

export const eiaDataPetroleumTags = [
  "WGFUPUS2",
  "WKJUPUS2",
  "WDIUPUS2",
  "WPRUP_NUS_2",
  "WWOUP_NUS_2",
  "WREUPUS2",
  "WPULEUS3",
  "WPULEUS3",
  "WRPNTUS2",
  "WGTIMUS2",
  "WDIIMUS2",
  "WKJIMUS2",
  "WREIMUS2",
  "W_EPM0F_EEX_NUS-Z00_MBBLD",
  "WDIEXUS2",
  "WKJEXUS2",
  "WREEXUS2",
];

export const eiaDataNGList = {
  //ng pirce
  "Henry Hub Natural Gas Spot Price (Dollars per Million Btu)": `https://api.eia.gov/v2/natural-gas/pri/fut/data/?frequency=daily&data[0]=value&facets[series][]=RNGWHHD&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Liquefied Natural Gas Exports Price": `https://api.eia.gov/v2/natural-gas/pri/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N9133US3&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`, //monthly
  //ng storages by region
  "Weekly Lower 48 States Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R48_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly South Central Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R33_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly East Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R48_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly Salt Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SSO_R33_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly Mountain Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R34_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly Pacific Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R35_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Weekly Midwest Region Natural Gas Working Underground Storage (Billion Cubic Feet)": `https://api.eia.gov/v2/natural-gas/stor/wkly/data/?frequency=weekly&data[0]=value&facets[series][]=NW2_EPG0_SWO_R32_BCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  //ng production
  "U.S. Natural Gas Gross Withdrawals (MMcf)": `https://api.eia.gov/v2/natural-gas/sum/lsum/data/?frequency=monthly&data[0]=value&facets[series][]=N9010US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  // NGM_EPG0_FGW_NUS_MMCFD	U.S. Natural Gas Gross Withdrawals (Million Cubic Feet per Day) + shorter history
  "U.S. Natural Gas Gross Withdrawals from Gas Wells (MMcf)": `https://api.eia.gov/v2/natural-gas/sum/lsum/data/?frequency=monthly&data[0]=value&facets[series][]=N9011US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Gross Withdrawals from Shale Gas (Million Cubic Feet)": `https://api.eia.gov/v2/natural-gas/sum/lsum/data/?frequency=monthly&data[0]=value&facets[series][]=NGM_EPG0_FGS_NUS_MMCF&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  //ng consumption by use
  "U.S. Natural Gas Lease and Plant Fuel Consumption (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N9160US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Residential Consumption (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3010US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Natural Gas Delivered to Consumers in the U.S. (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3060US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "Natural Gas Deliveries to Commercial Consumers (Including Vehicle Fuel through 1996) in the U.S. (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3020US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Pipeline & Distribution Use (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N9170US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Deliveries to Electric Power Consumers (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3045US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Vehicle Fuel Consumption (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3025US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
  "U.S. Natural Gas Industrial Consumption (MMcf)": `https://api.eia.gov/v2/natural-gas/cons/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3035US2&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000`,
};

export const eiaDataNGTags = [
  "RNGWHHD",
  "N9133US3",
  "NW2_EPG0_SWO_R48_BCF",
  "NW2_EPG0_SWO_R33_BCF",
  "NW2_EPG0_SWO_R48_BCF",
  "NW2_EPG0_SSO_R33_BCF",
  "NW2_EPG0_SWO_R34_BCF",
  "NW2_EPG0_SWO_R35_BCF",
  "NW2_EPG0_SWO_R32_BCF",
  "N9010US2",
  "N9011US2",
  "NGM_EPG0_FGS_NUS_MMCF",
  "N9160US2",
  "NGM_EPG0_FGS_NUS_MMCF",
  "N9160US2",
  "N3010US2",
  "N3060US2",
  "N3020US2",
  "N9170US2",
  "N3045US2",
  "N3025US2",
  "N3035US2",
];

//this refers to custom table name on mysql database, NOT EIA tags or urls

const eiaDataElectricityList = {};

export const cftcList = [
  "WTI-PHYSICAL",
  "PALLADIUM",
  "PLATINUM",
  "SILVER",
  "GOLD",
  "COPPER- #1",
];

//database/dataset
export const nasdaqDataLinkList = {
  "Gold Price: London Fixing": "LBMA/GOLD",
  "Silver Price: London Fixing": "LBMA/SILVER",
};

export default {
  fredDataList,
  eiaDataOilList,
  eiaDataPetroleumList,
  eiaDataNGList,
  eiaDUCList,
  cftcList,
};
