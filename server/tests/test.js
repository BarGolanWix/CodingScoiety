const baseUrl = "http://localhost:3080";
const tests = require("./testsBank");
const axios = require("axios");
const _ = require("lodash");

const runTests = async () => {
  let testsCounter = 0;
  let passCounter = 0;

  console.log("\nStarting tests...\n");

  for (const group in tests) {
    console.log(`Testing ${group} Routes:\n`);
    const groupTests = tests[group];
    for (const test of groupTests) {
      testsCounter += 1;
      let response;
      try {
        response = await axios({
          method: test.method || "GET",
          url: `${baseUrl}${test.route}`,
          data: test.data,
          params: test.params,
          headers: test.headers,
        });
        if (
          response.status.toString().startsWith(2)
          // &&
          // _.isEqual(test.expected, response.data)
        ) {
          console.log(`Test: ${test.name} - \x1b[32mPassed\x1b[0m`);
          passCounter += 1;
        } else {
          console.log(
            `Test: ${test.name} - \x1b[31mFailed\x1b[0m (Status: ${response.status})`
          );
          console.log(`Expected: ${test.expected}\nAsserted: ${response.data}`);
        }
      } catch (error) {
        console.log(
          `Test: ${test.name} - \x1b[31mFailed\x1b[0m (Error: ${error.message})`
        );
      }
    }
    console.log();
  }
  console.log(
    `All tests completed. Passed (${passCounter} / ${testsCounter}) of the tests.\n`
  );
};

runTests();
