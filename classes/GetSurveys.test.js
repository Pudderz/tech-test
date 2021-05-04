const { GetSurveys } = require("./GetSurveys");
const fetch = require("node-fetch");
const Survey = require("./Survey");
const { Response } = jest.requireActual("node-fetch");
jest.mock("node-fetch");

const successResponse = {
  status: 200,
  statusText: "success",
};

const failResponse = {
  status: 404,
  statusText: "fail",
};

const fetchData = {
  startTime: "2021-04-29T15:52:47.401Z",
  endTime: "2021-04-29T16:04:11.656Z",
  surveyId: 2,
};

test("fetches data from server when server returns a successful response", async () => {
  fetch.mockResolvedValueOnce(
    Promise.resolve(new Response(JSON.stringify(fetchData), successResponse))
  );

  const get = new GetSurveys("https://url-of-a-server.com/example");
  const data = await get.fetchSurveyData();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://url-of-a-server.com/example");
  expect(data).toEqual({
    startTime: "2021-04-29T15:52:47.401Z",
    endTime: "2021-04-29T16:04:11.656Z",
    surveyId: 2,
  });
  fetch.mockClear();
});

test("fetches data from server when server returns a error response throws network error", async () => {
  fetch.mockResolvedValueOnce(
    Promise.resolve(new Response(JSON.stringify({}), failResponse))
  );

  const get = new GetSurveys("https://url-of-a-server.com/example");
  await expect(get.fetchSurveyData()).rejects.toThrow(
    `An error has occured while fetching: status 404`
  );
  fetch.mockClear();
});

test("fetches data from server multiple times and adds them to Survey Class", async () => {
  fetch.mockImplementation(() => {
    return Promise.resolve(
      new Response(JSON.stringify(fetchData), successResponse)
    );
  });

  const get = new GetSurveys("https://url-of-a-server.com/example");
  const { shouldStop } = await get.fetchBulkNum(6);

  expect(fetch).toHaveBeenCalledTimes(6);
  expect(fetch).toHaveBeenCalledWith("https://url-of-a-server.com/example");
  expect(shouldStop).toBe(false);
  expect(get.surveys[2]).toBeInstanceOf(Survey);
  expect(get.surveys[2].averageTime).toBe(684255);

  fetch.mockClear();
});

test("failed response to fetch data from server multiple times", async () => {
  fetch.mockImplementation(() => {
    return Promise.resolve(new Response(JSON.stringify({}), failResponse));
  });

  const get = new GetSurveys("https://url-of-a-server.com/example");
  const { shouldStop } = await get.fetchBulkNum(6);

  expect(fetch).toHaveBeenCalledWith("https://url-of-a-server.com/example");
  expect(shouldStop).toBe(true);
  expect(get.surveys).toEqual({});

  fetch.mockClear();
});
