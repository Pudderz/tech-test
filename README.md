# tech-test
 interview assignment to work out an average of some surveys.


## Initial Plan

### Aims
- Object-oriented programming style
- Test-driven developement

### Issues that I'll have
- how to work out the average
- how to make it accurate
- when to stop working out the average
- how to make it performant
- bonus information to get from the get request


#### How to work out the average
- loop fetching surveys
- receive results
- works out the time it took the user to do the survey
- adds time data to the correct survey class
- works out new average in the survey class.

#### How to make it accurate
- once the fetching has stopped, I could sort the array of times to be able to work out an interquartile range for each survey and remove outliers of the result to give a more accurate representation of the average.
  - know when a suitable time is to stop fetching results

#### When to stop fetching/working out the average
  - loop through results until the average of the change of the mean is less than a certain amount after a certain amount of fetches.
  - or you fetch a set maximum
  - or encounter an error to avoid hundreds of error messages


#### How to make it performant
- instead of looping asynchronous code and waiting for each fetch to complete with await we can use promise.all/promise.allSettled to fetch a lot at once.
- this prevent being able to stop the loop mid-way through a fetch bulk process. To kinda fix this I will send an initial bulk of requests and reduce the bulk of requests as the loop goes on. This would reduce the number of unnecessary requests being sent to the server but also keeping the fetching fairly fast.
- Will use quicksort for the sorting that's used to start working out the interquartile range

#### Bonus Information to show
- could show the most popular of each survey
- show min, max and interquartile range

### Object-Oriented layout
- classes
  - Survey classes for each new survey id received
  - AllSurvey class to deal with functionality for dealing and creating all of the surveys
  - GetSurvey class extends AllSurveys for the functionality of fetching the request 
  
