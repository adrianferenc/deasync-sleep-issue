# deasync-sleep-issue

The following test should have goodTest run for 2*time milliseconds. The while loop should run require("deasync").sleep(time) twice before the badTest timeout is cleared.

However, on occasion (not sure when), the badTest will not be cleared and errorCount will increase by 1. I added a latencyBuffer of at least 1 second so it is not due to processing latency.
