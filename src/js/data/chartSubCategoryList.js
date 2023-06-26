import { eiaDataNGList, eiaDataOilList, eiaDataPetroleumList, eiaDataPetroleumTags } from "./dataList.js";


export const chartCategoryList = ["featured", "ratio", "bonds", "macro", "bank", "fed"];

export const EIACategoryList = ["oil", "petroleum", "ng"]
export const EIAOilSubCategoryList = Object.keys(eiaDataOilList).push(["DUC", "completed", "drilled"]);
export const EIAPetroleumSubCategoryList = Object.keys(eiaDataPetroleumList);
export const EIAPetroleumFourWeekAvgDemandTags = eiaDataPetroleumTags.slice(0,6)
export const EIAPetroleumFourWeekAvgDemandList = Object.keys(eiaDataPetroleumList).slice(0,6)
// export const EIAPetorleumWeeklyDemandTags = Object
export const EIANGSubCategoryList = Object.keys(eiaDataNGList);

// export const CFTC

export default {chartCategoryList, EIACategoryList, EIAOilSubCategoryList, EIAPetroleumSubCategoryList, EIAPetroleumFourWeekAvgDemandTags, EIANGSubCategoryList}