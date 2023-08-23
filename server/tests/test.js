const baseUrl = "http://localhost:3080";
const tests = require("./testsBank");
const axios = require("axios");

const runTests = async () => {
  console.log("Starting tests...\n");

  for (const test of tests) {
    try {
      const response = await axios({
        method: test.method || "GET",
        url: `${baseUrl}${test.route}`,
        data: test.data,
      });

      if (response.status === 200) {
        console.log(`Test: ${test.name} - Passed`);
      } else {
        console.log(`Test: ${test.name} - Failed (Status: ${response.status})`);
      }
    } catch (error) {
      console.log(`Test: ${test.name} - Failed (Error: ${error.message})`);
    }
  }

  console.log("\nAll tests completed.");
};

runTests();
