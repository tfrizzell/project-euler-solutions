console.info('Calculating solution for Project Euler Problem 1...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    number % factor === 0;

const result = Array(999)
    .fill(0).reduce((sum, _, index) => (isFactorOf(index + 1, 3) || isFactorOf(index + 1, 5)) ? sum + index + 1 : sum, 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);