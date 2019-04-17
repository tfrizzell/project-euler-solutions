console.info('Calculating solution for Project Euler Problem 6...\r\n');
const start = Date.now();

const sequence = Array(100).fill(0).map((_, index) => index + 1);
const result = Math.pow(sequence.reduce((sum, value) => sum + value, 0), 2) - sequence.reduce((sum, value) => sum + Math.pow(value, 2), 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);