console.info('Calculating solution for Project Euler Problem 6...\r\n');
const start = Date.now();

const sequence = Array(100).fill(0).map((_, index) => index + 1);
console.log('Result:', Math.pow(sequence.reduce((accumulator, value) => accumulator + value, 0), 2) - sequence.reduce((accumulator, value) => accumulator + Math.pow(value,2), 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);