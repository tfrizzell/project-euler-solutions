// This solution is relatively slow and could stand to be optimized.
console.info('Calculating solution for Project Euler Problem 5...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    number % factor === 0;

const isPrime = (number) => {
    const root = Math.sqrt(Math.abs(number));

    if (root % 1 === 0) {
        return isPrime[number] = false;
    }

    for (let i = 2; i < root; i++) {
        if (number % i === 0) {
            return isPrime[number] = false;
        }
    }

    return isPrime[number] = true;
};

const factors = Array(20).fill(0).map((_, index) => index + 1);
let result = factors.reduce((product, value) => isPrime(value) ? product * value : product, 1);

do {
    result++
} while (!factors.reduce((divisible, value) => divisible && isFactorOf(result, value), true));

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);