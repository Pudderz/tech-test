const AllSurvey = require("./allSurveys");
const Survey = require("./Survey");

test("adds surveys to list", () => {
  const allSurvey = new AllSurvey();
  allSurvey.checkAndAddSurvey(2);
  expect(allSurvey.surveys[2]).toBeInstanceOf(Survey);
});

test("adds data to survey Class", () => {
  const allSurvey = new AllSurvey();
  allSurvey.addData({ surveyId: 2, time: 100 });
  expect(allSurvey.surveys[2].allTimes).toEqual([100]);
});

test("runs sort data function in each survey Class", () => {
  const allSurvey = new AllSurvey();
  allSurvey.addData({ surveyId: 1, time: 900 });
  allSurvey.addData({ surveyId: 1, time: 100 });
  allSurvey.addData({ surveyId: 1, time: 700 });
  allSurvey.addData({ surveyId: 1, time: 850 });

  allSurvey.addData({ surveyId: 2, time: 600 });
  allSurvey.addData({ surveyId: 2, time: 100 });
  allSurvey.addData({ surveyId: 2, time: 700 });
  allSurvey.addData({ surveyId: 2, time: 800 });

  allSurvey.sortSurveyResults();
  expect(allSurvey.surveys[1].allTimes).toEqual([100, 700, 850, 900]);
  expect(allSurvey.surveys[2].allTimes).toEqual([100, 600, 700, 800]);
});

test("runs removes outliers function in each survey Class", () => {
  const allSurvey = new AllSurvey();
  allSurvey.addData({ surveyId: 1, time: 900 });
  allSurvey.addData({ surveyId: 1, time: 100 });
  allSurvey.addData({ surveyId: 1, time: 700 });
  allSurvey.addData({ surveyId: 1, time: 850 });

  allSurvey.addData({ surveyId: 2, time: 650 });
  allSurvey.addData({ surveyId: 2, time: 100 });
  allSurvey.addData({ surveyId: 2, time: 700 });
  allSurvey.addData({ surveyId: 2, time: 800 });
  allSurvey.addData({ surveyId: 2, time: 850 });
  allSurvey.addData({ surveyId: 2, time: 1600 });

  allSurvey.removeAllOutliers();
  expect(allSurvey.surveys[1].allTimes).toEqual([700, 850, 900]);
  expect(allSurvey.surveys[2].allTimes).toEqual([650, 700, 800, 850]);
});

test("test if displayData doesn't throw error", () => {
  const allSurvey = new AllSurvey();
  allSurvey.addData({ surveyId: 1, time: 900 });
  allSurvey.addData({ surveyId: 1, time: 100 });

  allSurvey.addData({ surveyId: 2, time: 650 });
  allSurvey.addData({ surveyId: 2, time: 100 });

  expect(() => allSurvey.displayData()).not.toThrow();
});
