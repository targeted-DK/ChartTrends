import axios from "axios";
import {
  cftcFinancialDerivativesList,
  cftcList,
} from "../../../data/dataList.js";

export default class cftcAPIcreator {
  // static baseurl = "https://publicreporting.cftc.gov/resource/jun7-fc8e.json";
  "https://publicreporting.cftc.gov/resource/kh3c-gbw2.json";
  static cftcAppToken = process.env.cftcAppToken;

  static async sendRequestToCFTC(contract_market_name) {
    let baseurl = "";
    let response = "";

    //source : https://publicreporting.cftc.gov/stories/s/r4w3-av2u
    //Legacy-Futures/yjak-hhbj/ - 6dca-aqww
    //Legacy-Combined/8jj7-5vf4/ - jun7-fc8e
    //Disaggregated-Futures/ubmb-6exi/ - 72hh-3qpy - Agriculture and Natural Resource contracts.
    //Disaggregated-Combined/gr4m-cvuh/ - kh3c-gbw2
    //TFF-Futures/98ig-3k9y/ - gpe5-46if
    //TFF-Combined/dw8z-x6ih/ - yw9f-hn96
    //supplemental/rxj2-hk38/ - 4zgm-a668
    if (cftcList.includes(contract_market_name)) {
      //natural resources futures only
      baseurl = "https://publicreporting.cftc.gov/resource/6dca-aqww.json";
    
      response = await axios.get(baseurl, {
        params: {
          $$app_token: cftcAPIcreator.cftcAppToken,
          $limit : 5000,
          contract_market_name: contract_market_name,
          // yyyy_report_week_ww: '2023 Report Week 16',
          futonly_or_combined: "FutOnly", //FutOnly or combined
          // id: '220802067651C',
          // market_and_exchange_names: 'WTI-PHYSICAL - NEW YORK MERCANTILE EXCHANGE',
          // report_date_as_yyyy_mm_dd: '2022-08-02T00:00:00.000',
          // yyyy_report_week_ww: '2022 Report Week 31',
          // contract_market_name: 'WTI-PHYSICAL',
          // cftc_contract_market_code: '067651',
          // cftc_market_code: 'NYME',
          // cftc_region_code: 'NYC',
          // cftc_commodity_code: '067',
          // commodity_name: 'CRUDE OIL',
          // cftc_subgroup_code: 'N10',
          // commodity: 'CRUDE OIL',
          // commodity_subgroup_name: 'PETROLEUM AND PRODUCTS',
          // commodity_group_name: 'NATURAL RESOURCES',
        },
      });

      
    } 
    
    else if (cftcFinancialDerivativesList.includes(contract_market_name)) {
      //financial derivatives futures only
      baseurl = "https://publicreporting.cftc.gov/resource/6dca-aqww.json";
      response = await axios.get(baseurl, {
        params: {
          $$app_token: cftcAPIcreator.cftcAppToken,
          $limit : 5000,
          contract_market_name: contract_market_name,
          futonly_or_combined: "FutOnly",
        },
      });
    }
    
    return response;
  }
}
