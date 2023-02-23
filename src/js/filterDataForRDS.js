// import axios from 'axios';

/**
 * Converts JSON object into a list of lists.
 * @param {JSON} JSON Object 
 * @returns {Array<{date, value}>} a list of {date, value}, code
 */
function getGraphInfo(jsonObject) {
    var newGraphObj = {};
    newGraphObj.code = jsonObject.code;
    newGraphObj.date = jsonObject.map(data => data["date"]);
    newGraphObj.value = jsonObject.map(data => data["value"]);
    return newGraphObj;
  }

export default getGraphInfo;

