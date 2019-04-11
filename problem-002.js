console.info('Calculating solution for Project Euler Problem 2...\r\n');
const start = Date.now();

const fibonacci = (index) =>
    Array(index).fill(0).map(mapValue);

const mapValue = (_, index, array) =>
    array[index] = (index > 1)
        ? array[index - 1] + array[index - 2]
        : index + 1;

let index = 1,
    sequence;

do {
    sequence = fibonacci(index++);
} while (Math.max(...sequence) < 4000000);

console.log('Result:', sequence.filter(value => value % 2 === 0).reduce((accumulator, value) => accumulator + value, 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);