const getTimeDiffFromString = require("./getTime");

test("Convert startDate and endDate to difference", () => {
  expect(
    getTimeDiffFromString({
      startTime: "2021-05-03T19:07:28.213Z",
      endTime: "2021-05-03T19:17:28.213Z",
    })
  ).toBe(600000);
});

test("Test no time input to throw error", () => {
  expect(() => getTimeDiffFromString()).toThrow(
    "Invalid date input, startTime or endTime should be as ISO string"
  );
});

test("Empty strings to throw error", () => {
  expect(() =>
    getTimeDiffFromString({
      startTime: "",
      endTime: "",
    })
  ).toThrow("Invalid date input, startTime or endTime should be as ISO string");
});

test("any nonTimeFormat strings to throw error", () => {
  expect(() =>
    getTimeDiffFromString({
      startTime: "any input",
      endTime: "any input as well",
    })
  ).toThrow("Invalid date input, startTime or endTime should be as ISO string");
});

test("endDate that are smaller than startDate will throw error", () => {
  expect(() =>
    getTimeDiffFromString({
      startTime: "2021-06-02T18:06:28.213Z",
      endTime: "2021-05-03T19:07:28.213Z",
    })
  ).toThrowError("Invalid time, start date is after end date.");
});

test("test change of date (overnight)", () => {
  expect(
    getTimeDiffFromString({
      startTime: "2021-05-02T23:06:28.213Z",
      endTime: "2021-06-03T01:07:28.213Z",
    })
  ).toBe(2685660000);
});
