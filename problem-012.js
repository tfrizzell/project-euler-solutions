console.info('Calculating solution for Project Euler Problem 12...\r\n');
const start = Date.now();

const getDivisors = (number) =>
    Array(Math.floor(Math.sqrt(number))).fill(0)
        .map(mapValue)
        .filter(value => isFactorOf(number, value))
        .reduce((factors, factor) => [...factors, factor, number / factor], []);

const getSum = (accumulator, value) =>
    accumulator + value;

const isFactorOf = (number, factor) =>
    number % factor === 0;

const mapValue = (_, index) =>
    index + 1;

const triangleNumber = (number) =>
    Array(number).fill(0)
        .map(mapValue)
        .reduce(getSum, 0);

let index = 0,
    factors = [],
    result;

while (factors.length <= 500) {
    result = triangleNumber(index++);
    factors = getDivisors(result);
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);