const AllSurveys = require("./AllSurveys");

class CompletedSurveyEvent extends AllSurveys{
    constructor(url) {
      super();
      this.url = url;
    }


    async fetchSurveyData() {}

  
    async getTimeData() {}


  }
  

  module.exports={CompletedSurveyEvent}