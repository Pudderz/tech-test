const getTimeDiffFromString = ({ startTime, endTime } = {}) => {
  if (typeof startTime !== "string" || typeof endTime !== "string") {
    throw new Error(
      "Invalid date input, startTime or endTime should be as ISO string"
    );
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (isNaN(startDate) || isNaN(endDate))
    throw new Error(
      "Invalid date input, startTime or endTime should be as ISO string"
    );

  const difference = endDate.getTime() - startDate.getTime();

  if (difference < 0) {
    throw new Error("Invalid time, start date is after end date.");
  }

  // not converting to minutes here to reduce rounding issues
  // when doing the maths on decimals (stays as milliseconds)
  return difference;
};

module.exports = getTimeDiffFromString;
