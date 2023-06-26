import { eiaDataNGList, eiaDataOilList, eiaDataPetroleumList, eiaDataPetroleumTags } from "./dataList.js";


export const chartCategoryList = ["featured", "ratio", "bonds", "macro", "bank", "fed"];

export const EIACategoryList = ["oil", "petroleum", "ng"]
// export const EIAOilSubCategoryList = Object.keys(eiaDataOilList).push(["DUC", "completed", "drilled"]);
export const EIAPetroleumSubCategoryList = ["demand", "export", "import"]

export const EIAPetroleumFourWeekAvgDemandTags = eiaDataPetroleumTags.slice(0,6)
export const EIAPetroleumFourWeekAvgDemandList = Object.keys(eiaDataPetroleumList).slice(0,6)
export const EIAPetroleumExportTags = eiaDataPetroleumTags.slice(19,23)
export const EIAPetroleumExportList =  Object.keys(eiaDataPetroleumList).slice(19, 23)
export const EIAPetroleumImportTags = eiaDataPetroleumTags.slice(14, 19)
export const EIAPetroleumImportList = Object.keys(eiaDataPetroleumList).slice(14, 19)
// export const EIAPetorleumWeeklyDemandTags = Object
export const EIANGSubCategoryList = Object.keys(eiaDataNGList);

// export const CFTC

export default {chartCategoryList, EIACategoryList,  EIAPetroleumFourWeekAvgDemandTags, EIANGSubCategoryList}