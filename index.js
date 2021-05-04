const GetSurveys = require("./classes/GetSurveys");
const {
  INITIAL_NUMBER_OF_REQUESTS,
  MAX_REQUEST_LIMIT,
  DECREASE_BY,
  API_BACKEND,
} = require("./globals");



const workOutNumOfRequests = (numberOfRequests) => {
  return numberOfRequests / DECREASE_BY > 5
    ? Math.floor(numberOfRequests / DECREASE_BY)
    : 5;
};


const averageSurveys = new GetSurveys(API_BACKEND);

//loops till iterator(i) is over MAX_REQUEST_LIMIT, fetchBulkData encounters
// a network error or surveys averages are done

const findAverage = (async () => {
  let numberOfRequests = INITIAL_NUMBER_OF_REQUESTS;
  let shouldStop = false;
  let i = 0;

  while (i < MAX_REQUEST_LIMIT && !shouldStop) {

    ({shouldStop} = await averageSurveys.fetchBulkNum(numberOfRequests));
    if(shouldStop) break;

    shouldStop = averageSurveys.checkIsDone();
    console.log(numberOfRequests);
    i = numberOfRequests + i;

    numberOfRequests = workOutNumOfRequests(numberOfRequests);
  }

  console.log(`${i} times ran`);
  //show initial results before sorting - 
  //averageSurveys.displayData();
  averageSurveys.sortSurveyResults().removeAllOutliers();

  averageSurveys.displayData();
})();


