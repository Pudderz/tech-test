const quickSort  = require("./quickSort");

test("test any number of array items", () => {
  expect(quickSort([0, 8, 3, 4, 12])).toEqual([0, 3, 4, 8, 12]);
});

test("no array items", () => {
  expect(quickSort([])).toEqual([]);
});

test("test one array items", () => {
  expect(quickSort([1])).toEqual([1]);
});
