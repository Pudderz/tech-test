const  getQuartiles  = require("./getQuartiles");

test("test any array ", () => {
  expect(getQuartiles([1, 2, 3])).toMatchObject({
    lowerQuartile: 1,
    upperQuartile: 3,
    interQuartileRange: 2,
  });
});

test("test no values in array ", () => {
  expect(getQuartiles([])).toEqual({});
});

test("test wrong input in array ", () => {
  expect(getQuartiles("any input")).toEqual({});
});

test("Only one value in array ", () => {
  expect(getQuartiles([2])).toMatchObject({
    lowerQuartile: 2,
    upperQuartile: 2,
    interQuartileRange: 0,
  });
});
test("Two values in input array ", () => {
  expect(getQuartiles([2,3])).toMatchObject({
    lowerQuartile: 2,
    upperQuartile: 3,
    interQuartileRange: 1,
  });
});

test("Even number of array elements with odd numbers when sliced in half", () => {
  expect(getQuartiles([2, 5, 8, 12, 15, 20])).toMatchObject({
    lowerQuartile: 5,
    upperQuartile: 15,
    interQuartileRange: 10,
  });
});

test("test even number of array elements with even numbers when sliced in half", () => {
  expect(getQuartiles([4, 6, 8, 12, 15, 20, 24, 30])).toMatchObject({
    lowerQuartile: 7,
    upperQuartile: 22,
    interQuartileRange: 15,
  });
});

test("test odd number of array elements with even length when sliced in half", () => {
  expect(getQuartiles([10, 10, 20, 43, 53, 62, 70, 80, 90])).toMatchObject({
    lowerQuartile: 15,
    upperQuartile: 75,
    interQuartileRange: 60,
  });
});

test("test odd number of array elements with odd length when sliced in half", () => {
  expect(getQuartiles([2, 5, 8, 12, 15, 20, 21])).toMatchObject({
    lowerQuartile: 5,
    upperQuartile: 20,
    interQuartileRange: 15,
  });
});
