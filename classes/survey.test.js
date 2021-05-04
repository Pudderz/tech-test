const Survey = require("./Survey");

test("adds time to survey", () => {
  const survey = new Survey();
  survey.addTime(4);
  expect(survey.allTimes).toEqual([4]);
});

test("remove outliers from survey Class", () => {
  const survey = new Survey();
  survey.allTimes = [1, 1500, 2000, 2700, 3000, 3223, 10000];
  survey.removeOutliers();
  expect(survey.allTimes).toEqual([1500, 2000, 2700, 3000, 3223]);
});

test("sort times in survey", () => {
  const survey = new Survey();
  survey.allTimes = [3, 4, 543, 23, 2, 1, 32];
  survey.sortAllTimes();
  expect(survey.allTimes).toEqual([1, 2, 3, 4, 23, 32, 543]);
});

//test addTime

//test checkIfIsDoneChanged

//test sortAllTimes

//test remove outliers
