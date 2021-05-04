const Survey = require("./Survey");

class AllSurveys {
  constructor() {
    this.surveys = {};
    this.numOfSurveys = 0;
    this.numOfSurveyAveragesDone = 0;
    this.totalUserSurveys = 0;
  }

  checkAndAddSurvey(surveyId) {
    if (
      typeof this.surveys[surveyId] == "undefined" &&
      (surveyId <= 0 || surveyId > 0)
    ) {
      this.surveys[surveyId] = new Survey(surveyId);
      this.numOfSurveys += 1;
    }
  }

  checkIsDone() {
    return this.numOfSurveyAveragesDone == this.numOfSurveys;
  }

  addData({ surveyId, time }) {
    //checks if surveyId and time are a number (faster version of isNaN)
    if (
      (!(time <= 0) && !(time > 0)) ||
      (!(surveyId <= 0) && !(surveyId > 0))
    ) {
      return this;
    }

    this.checkAndAddSurvey(surveyId);
    this.totalUserSurveys++;

    const survey = this.surveys[surveyId];
    survey.addTime(time);

    if (survey.checkIfIsDoneChanged()) {
      this.numOfSurveyAveragesDone += survey.isDone ? 1 : -1;
    }

    return this;
  }

  sortSurveyResults() {
    for (const surveyId in this.surveys) {
      if (this.surveys[surveyId] instanceof Survey) {
        this.surveys[surveyId].sortAllTimes();
      }
    }
    return this;
  }

  removeAllOutliers() {
    for (const surveyId in this.surveys) {
      if (this.surveys[surveyId] instanceof Survey) {
        const totalSurveysRemoved = this.surveys[surveyId].removeOutliers();
        this.totalUserSurveys -= totalSurveysRemoved;
      }
    }
    return this;
  }

  displayData() {
    for (const surveyId in this.surveys) {
      if (this.surveys[surveyId] instanceof Survey) {
        this.surveys[surveyId].displaySurveyData(this.totalUserSurveys);
      }
    }
    return this;
  }
}

module.exports = AllSurveys;
