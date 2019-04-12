// This solution is relatively slow and could stand to be optimized.
console.info('Calculating solution for Project Euler Problem 5...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    number % factor === 0;

const factors = Array(20).fill(0).map((_, index) => index + 1);

let result = 1;
while (!factors.reduce((divisible, factor) => divisible && isFactorOf(result, factor), true) && result++) {}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);