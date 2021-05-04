//Displays data from surveys class via console

const displayValues = (survey, totalSurveysDone) => {
  const {
    averageTime,
    allTimes,
    lowerQuartile,
    upperQuartile,
    surveyId,
  } = survey;

  console.log(
    "\n \x1b[33m%s\x1b[0m",
    `Survey ID - ${surveyId} \n Average time - ${Math.round(
      averageTime / 1000 / 60
    )} minutes`
  );
  if (allTimes) {
    console.log(
      `\n min time - ${Math.round(allTimes[0] / 1000 / 60)} minutes ${
        Math.round(allTimes[0] / 1000) % 60
      } seconds`,
      `\n max time - ${Math.round(
        allTimes[allTimes.length - 1] / 1000 / 60
      )} minutes ${
        Math.round(allTimes[allTimes.length - 1] / 1000) % 60
      } seconds`
    );
  }

  if (lowerQuartile) {
    console.log(
      ` IQR - ${Math.round(lowerQuartile / 1000 / 60)} to ${Math.round(
        upperQuartile / 1000 / 60
      )} minutes`
    );
  }
  console.log(
    ` Percentage received - ${(
      (allTimes.length / totalSurveysDone) *
      100
    ).toFixed(2)}%`
  );
};

module.exports = displayValues;
