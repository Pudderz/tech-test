/*
  Works out the lower and upper quartiles by working out the median of the
  input array. Spilting the array by the mid point(median) and finding the median
  in each of the new arrays.
*/

function getMedian(array) {
  const len = array.length;
  const medianIndex = Math.floor(len / 2);

  const value =
    len % 2
      ? array[medianIndex]
      : (array[medianIndex - 1] + array[medianIndex]) / 2.0;

  return { len, index: medianIndex, value };
}

function getQuartiles(array) {
  if (!Array.isArray(array) || array.length === 0) return {};
  if (array.length === 1) {
    return {
      lowerQuartile: array[0],
      upperQuartile: array[0],
      interQuartileRange: 0,
    };
  }

  const { len, value: medium, index: medianIndex } = getMedian(array);

  const { value: lowerQuartile } = getMedian(array.slice(0, medianIndex));

  if (len % 2) {
    var { value: upperQuartile } = getMedian(array.slice(medianIndex + 1));
  } else {
    var { value: upperQuartile } = getMedian(array.slice(medianIndex));
  }

  const interQuartileRange = upperQuartile - lowerQuartile;

  return {
    lowerQuartile,
    upperQuartile,
    interQuartileRange,
  };
}

module.exports = getQuartiles;
