const { MEAN_CHANGE_STOP_AS_PERCENTAGE } = require("../globals");
const getQuartiles = require("../logic/getQuartiles");
const displayValues = require("../logic/displayValues");
const quickSort = require("../logic/quickSort");

/*
   Class for the common functionality of Surveys (holds the data)
*/

class Survey {
  constructor(id) {
    this.surveyId = id;
    this.sorted = false;
    this.allTimes = [];
    this.averageTime = 0;
    this.totalTime = 0;
    this.averageMeanChange = 0;
    this.averageMeanChangeTotal = 0;
    this.isDone = false;
  }

  addTime(time) {
    this.sorted = false;
    this.allTimes.push(time);
    this.totalTime += time;
    this.updateAverages();
  }

  updateAverages() {
    const newAverage = this.totalTime / this.allTimes.length;
    this.averageMeanChangeTotal =
      this.averageMeanChangeTotal + this.averageTime - newAverage;

    this.averageMeanChange = this.averageMeanChangeTotal / this.allTimes.length;
    this.averageTime = newAverage;
  }

  displaySurveyData(totalSurveysDone) {
    displayValues(this, totalSurveysDone);
    return this;
  }

  getOutlierRanges() {
    if (!this.sorted) this.sortAllTimes();

    const { lowerQuartile, upperQuartile, interQuartileRange } = getQuartiles(
      this.allTimes
    );

    this.lowerQuartile = lowerQuartile;
    this.upperQuartile = upperQuartile;

    //set min to 500ms (below this rounds to 0s) if lowerQuartile is less than 500ms
    //to be able ignore people with a time of 0 seconds
    const min = Math.max(lowerQuartile - 1.5 * interQuartileRange, 500);
    const max = upperQuartile + 1.5 * interQuartileRange;

    return { min, max };
  }

  // removes outliers or if time == 0, a person could of rushed through the survey
  // and not cared about the questions or a person could have been away for awhile
  // effecting the average unnecessarily e.g had dinner during survey time.

  removeOutliers() {
    const len = this.allTimes.length;
    let totalRemoved = 0;

    const { min, max } = this.getOutlierRanges();
    //Filters out outliers and adds filtered out times to totalRemoved

    this.allTimes = this.allTimes.filter((value) => {
      if (value >= min && value < max) {
        return true;
      }

      totalRemoved += value;
      return false;
    });

    this.totalTime -= totalRemoved;
    this.averageTime = this.totalTime / this.allTimes.length;
    return len - this.allTimes.length;
  }

  //compares if the average mean change is within the MEAN_CHANGE_STOP_AS_PERCENTAGE,
  // if so mark it as done and return true if this.isDone has changed.
  checkIfIsDoneChanged() {
    const percentageChange = (this.averageMeanChange / this.averageTime) * 100;
    if (
      percentageChange < MEAN_CHANGE_STOP_AS_PERCENTAGE &&
      percentageChange > -MEAN_CHANGE_STOP_AS_PERCENTAGE
    ) {
      if (!this.isDone) {
        this.isDone = true;
        return true;
      }
    } else if (this.isDone) {
      this.isDone = false;
      return true;
    }
    return false;
  }

  sortAllTimes() {
    this.allTimes = quickSort(this.allTimes);
    this.sorted = true;

    return this;
  }
}

module.exports = Survey;
