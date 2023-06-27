import {
  eiaDataNGList,
  eiaDataOilList,
  eiaDataOilTags,
  eiaDataPetroleumList,
  eiaDataPetroleumTags,
} from "./dataList.js";

export const chartCategoryList = [
  "featured",
  "ratio",
  "bonds",
  "macro",
  "bank",
  "fed",
];

export const EIACategoryList = ["oil", "petroleum", "ng"];
// export const EIAOilSubCategoryList = Object.keys(eiaDataOilList).push(["DUC", "completed", "drilled"]);
export const EIAOilSubCategoryList = [
  "DUC",
  "drilled",
  "completed",
  "export",
  "import",
  "stock",
  "production",
 
];
export const EIAOilStockTags = eiaDataOilTags.slice(0, 4);
export const EIAOilStockList = Object.keys(eiaDataOilList).slice(0, 4);
export const EIAOilExportTags = eiaDataOilTags.slice(4, 5);
export const EIAOilExportList = Object.keys(eiaDataOilList).slice(4, 5);
export const EIAOilImportTags = eiaDataOilTags.slice(5, 6);
export const EIAOilImportList = Object.keys(eiaDataOilList).slice(5, 6);
export const EIAOilProductionTags = eiaDataOilTags.slice(6, 7);
export const EIAOilProductonList = Object.keys(eiaDataOilList).slice(6, 7);

export const EIAPetroleumSubCategoryList = [
  "demand",
  "export",
  "import",
  "stock",
  "BigThreeProductStorage"
];
export const EIAPetroleumFourWeekAvgDemandTags = eiaDataPetroleumTags.slice(
  0,
  6
);
export const EIAPetroleumFourWeekAvgDemandList = Object.keys(
  eiaDataPetroleumList
).slice(0, 6);
export const EIAPetroleumImportTags = eiaDataPetroleumTags.slice(14, 19);
export const EIAPetroleumImportList = Object.keys(eiaDataPetroleumList).slice(
  14,
  19
);
export const EIAPetroleumExportTags = eiaDataPetroleumTags.slice(19, 23);
export const EIAPetroleumExportList = Object.keys(eiaDataPetroleumList).slice(
  19,
  23
);
export const EIAPetroleumStockTags = eiaDataPetroleumTags.slice(23, 28)
export const EIAPetroleumStockList = Object.keys(eiaDataPetroleumList).slice(23, 28)


export const EIAPetroleumBig3Tags = eiaDataPetroleumTags.slice(28, 29)
export const EIAPetroleumBig3List = Object.keys(eiaDataPetroleumList).slice(28,29)
// export const EIAPetorleumWeeklyDemandTags = Object
export const EIANGSubCategoryList = Object.keys(eiaDataNGList);

// export const CFTC

export default {
  chartCategoryList,
  EIACategoryList,
  EIAOilSubCategoryList,
  EIAOilStockTags,
  EIAOilStockList,
  EIAOilExportTags,
  EIAOilExportList,
  EIAOilImportTags,
  EIAOilImportList,
  EIAOilProductionTags,
  EIAOilProductonList,
  EIAPetroleumSubCategoryList,
  EIAPetroleumFourWeekAvgDemandTags,
  EIAPetroleumFourWeekAvgDemandList,
  EIAPetroleumImportTags,
  EIAPetroleumImportList,
  EIAPetroleumExportTags,
  EIAPetroleumExportList,
  EIAPetroleumStockTags,
  EIAPetroleumStockList,
  EIAPetroleumBig3Tags,
  EIAPetroleumBig3List,
 
  EIANGSubCategoryList,

};
