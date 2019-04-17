console.info('Calculating solution for Project Euler Problem 2...\r\n');
const start = Date.now();

const fibonacci = (number) =>
    Array(number).fill(0).map((_, index, array) => array[index] = (index > 1) ? array[index - 1] + array[index - 2] : 1);

let index = 1;
let sequence;

do {
    sequence = fibonacci(index++);
} while (Math.max(...sequence) < 4000000);

const result = sequence
    .filter(value => value % 2 === 0)
    .reduce((sum, value) => sum + value, 0)

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);