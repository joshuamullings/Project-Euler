const problems = require("./problems");

var startTime = performance.now();
//console.log(problems.problem001(1000));
//console.log(problems.problem002(4000000));
//console.log(problems.problem003(600851475143));
//console.log(problems.problem004(3));
//console.log(problems.problem005(20));
//console.log(problems.problem006(100));
//console.log(problems.problem007(10001));
console.log(problems.problem008(4));

var endTime = performance.now();
console.log(`Call took ${endTime - startTime} milliseconds`);
