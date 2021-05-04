const fetch = require("node-fetch");
const { API_BACKEND } = require("../globals");
const { getTimeDiffFromString } = require("../logic/getTime");
const AllSurveys = require("./AllSurveys");

//handles functionalities of fetching the data from the backend server

class GetSurveys extends AllSurveys {
  constructor(url = API_BACKEND) {
    super();
    this.url = url;
  }

  async fetchSurveyData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(
        `An error has occured while fetching: status ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  }

  async getTimeData() {
    //lets fetch error bubble up to promise.all to stop retreiving results
    const data = await this.fetchSurveyData();
    try {
      const time = getTimeDiffFromString(data);
      this.addData({ surveyId: data.surveyId, time });
    } catch (err) {
      console.error(err.message);
    }
  }

  async fetchBulkNum(numOfRequests = 5) {
    try {
      const promises = [];

      for (let i = 0; i < numOfRequests; i++) {
        promises.push(this.getTimeData());
      }

      await Promise.all(promises);
      return { shouldStop: false };
    } catch (err) {
      console.error(err);
      return { shouldStop: true };
    }
  }
}

module.exports = { GetSurveys };
