require("dotenv").config();

const API_BACKEND =
  process.env.API_BACKEND || "http://localhost:3001/survey-completed-event";


const INITIAL_NUMBER_OF_REQUESTS = 100;
const MAX_REQUEST_LIMIT = 1000;
const DECREASE_BY = 1.2;

//uses MEAN_CHANGE_STOP_AS_PERCENTAGE to compare against average mean change
//of each survey. Once average mean change is within 
//MEAN_CHANGE_STOP_AS_PERCENTAGE and checked, marks the result as done.
const MEAN_CHANGE_STOP_AS_PERCENTAGE = 3;

module.exports={
    API_BACKEND,
    MEAN_CHANGE_STOP_AS_PERCENTAGE,
    INITIAL_NUMBER_OF_REQUESTS,
    MAX_REQUEST_LIMIT,
    DECREASE_BY
}