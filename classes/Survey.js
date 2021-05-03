/*
   Class for the common functionality of Surveys
*/

class Survey {
  constructor(id) {
    this.surveyId = id;
    this.sorted = false;
    this.allTimes = [];
    this.averageTime = 0;
    this.totalTime = 0;
    this.averageMeanChange = 0;
    this.isDone = false;
  }

  
  addTimeData() {}

  updateAverage() {}

  displaySurveyData() {}

  getOutlierRanges() {}

  removeOutliers() {}

  checkIfIsDoneChanged() {}

  sortAllTimes() {}
}

module.exports = { Survey };
