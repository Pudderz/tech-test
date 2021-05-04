const Survey = require("./Survey");

class AllSurveys {
  constructor() {
    this.surveys = {};
    this.numOfSurveys = 0;
    this.numOfSurveyAveragesDone = 0;
    this.totalUserSurveys = 0;
  }

  checkAndAddSurvey(surveyId) {
    if (typeof this.surveys[surveyId] == "undefined") {
      this.surveys[surveyId] = new Survey(surveyId);
      this.numOfSurveys += 1;
    }
  }

  checkIsDone() {
    return this.numOfSurveyAveragesDone == this.numOfSurveys;
  }

  addData({ surveyId, time }) {
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
      this.surveys[surveyId].sortAllTimes();
    }
    return this;
  }

  removeAllOutliers() {
    for (const surveyId in this.surveys) {
      const totalSurveysRemoved = this.surveys[surveyId].removeOutliers();
      this.totalUserSurveys -= totalSurveysRemoved;
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
