console.info('Calculating solution for Project Euler Problem 12...\r\n');
const start = Date.now();

const getDivisors = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((divisors, _, index) => (number % (index + 1) === 0) ? [...divisors, index + 1, number / (index + 1)] : divisors, []);

const triangleNumber = (number) =>
    Array(number).fill(0).reduce((sum, _, index) => sum + index + 1, 0);

let factors = [];
let index = 0;
let result;

while (factors.length <= 500) {
    result = triangleNumber(index++);
    factors = getDivisors(result);
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);