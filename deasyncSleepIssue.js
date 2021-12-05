// The following test should have goodTest run for 2*time milliseconds. The while loop should run 
// require("deasync").sleep(time) twice before the badTest timeout is cleared.

// However, on occasion (not sure when), the badTest timeout will not be cleared and errorCount will increase 
// by 1. I added a latencyBuffer of at least 1 second so it is not due to processing latency.

//Run 'npm i' to install deasync


const time = 200;
const tests = 100;
const latencyBuffer = 1000;
let errorCount = 0;

console.log(`This should take about ${time*tests/1000} seconds`);

for (let i = 0; i < tests; i++) {
  const tester = { switch: false, error: false };

  let badTest = setTimeout(function () {
    tester.error = true;
    tester.switch = true;
  }, 2 * time + Math.max(latencyBuffer, 0.5 * time));

  let goodTest = setTimeout(function () {
    tester.switch = true;
  }, 2 * time);

  while (tester.switch == false) {
    require("deasync").sleep(time);
  }

  clearTimeout(badTest);

  if (tester.error) {
    errorCount++;
  }
}
console.log(
  `Running ${tests} test${
    tests !== 1 ? "s" : ""
  }, the second setTimeout did not clear ${errorCount} time${
    errorCount !== 1 ? "s" : ""
  }.`
);
