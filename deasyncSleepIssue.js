

const time = 200;
const tests = 100;
const latencyBuffer = 1000;
let errorCount = 0;

for (let i = 0; i < tests; i++) {
  const tester = { switch: false, error: false };

  let badTest = setTimeout(function () {
    tester.error = true;
    tester.switch = true;
  }, 2 * time + Math.max(latencyBuffer,.5 * time));

  setTimeout(function () {
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
  `Running ${tests} test${tests !== 1 ? "s" : ""}, the second setTimeout did not clear ${errorCount} time${errorCount !== 1 ? "s" : ""}.`
);
