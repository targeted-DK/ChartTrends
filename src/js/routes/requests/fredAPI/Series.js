import axios from "axios";
import fredUrls from "./fredUrls.js";
// import { getDataFromFRED } from '../apiRequest.js';
// import { URL } from 'url';
// import nodeFetch from 'node-fetch'

export default class Series {
  constructor(seriesID, transformation, frequency, aggregation) {
    this.seriesID = seriesID;
    this.transformation = transformation;
    this.frequency = frequency;
    this.aggregation = aggregation;
  }

  async getSeries() {
    let data = await axios
      .get(fredUrls.getSeries.replace("${seriesID}", this.seriesID), {
        params: {
          api_key: process.env.fredAPIKey,
          file_type: "json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async getSeriesCategory() {
    let data = await axios
      .get(fredUrls.getSeriesCategory.replace("${seriesID}", this.seriesID), {
        params: {
          api_key: process.env.fredAPIKey,
          file_type: "json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async getSeriesObservations() {
    try {
      let json;

      let res = await axios.get(
        fredUrls.getSeriesObservations.replace("${seriesID}", this.seriesID),
        {
          params: {
            api_key: process.env.fredAPIKey,
            file_type: "json",
            //fyi, FRED API refers data transformation as 'units'
            units: this.transformation,
            frequency: this.frequency,
            aggregation_method: this.aggregation,
          },
        }
      );
     
      json = res.data;
      json.transformation = this.transformation;
      json.frequency = this.frequency;
      json.aggregation = this.aggregation;

      return json;
    } catch (error) {
      // return Promise.reject(new Error("Fetching Failed"));
      //explicitly throw error because API itself succeeds
      throw new Error("returnsUndefinedException");
    }
  }

  async getSeriesRelease() {
    let data = await axios
      .get(fredUrls.getSeriesRelease.replace("${seriesID}", this.seriesID), {
        params: {
          api_key: process.env.fredAPIKey,
          file_type: "json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async getSeriesUsingText() {
    let data = await axios
      .get(
        fredUrls.getSeriesTagUsingText.replace(
          "${searchString}",
          this.searchString
        ),
        {
          params: {
            api_key: process.env.fredAPIKey,
            file_type: "json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async getSeriesTags() {
    let data = await axios
      .get(fredUrls.getSeriesTags.replace("${seriesID}", this.seriesID), {
        params: {
          api_key: process.env.fredAPIKey,
          file_type: "json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }

  async getSeriesUpdates() {
    let data = await axios
      .get(fredUrls.getSeriesUpdates, {
        params: {
          api_key: process.env.fredAPIKey,
          file_type: "json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
    return data;
  }
}
