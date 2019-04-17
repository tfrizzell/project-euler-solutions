console.info('Calculating solution for Project Euler Problem 12...\r\n');
const start = Date.now();

const getDivisors = (number) =>
    getDivisors[number] || (getDivisors[number] = Array(Math.floor(Math.sqrt(number))).fill(0).map((_, index) => index + 1)
        .filter(value => number % value === 0)
        .reduce((divisors, divisor) => [...divisors, divisor, number / divisor], []));

const isFactorOf = (number, factor) =>
    number % factor === 0;

const triangleNumber = (number) =>
    Array(number).fill(0).map((_, index) => index + 1).reduce((sum, value) => sum + value, 0);

let factors = [];
let index = 0;
let result;

while (factors.length <= 500) {
    result = triangleNumber(index++);
    factors = getDivisors(result);
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);