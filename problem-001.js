console.info('Calculating solution for Project Euler Problem 1...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    (number / factor) % 1 === 0;

console.log('Result:', Array(999).fill(0).map((_, index) => index + 1).filter(value => isFactorOf(value, 3) || isFactorOf(value, 5)).reduce((accumulator, value) => accumulator + value, 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);