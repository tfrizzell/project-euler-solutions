console.info('Calculating solution for Project Euler Problem 10...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    number % factor === 0;

const isPrime = (number) => {
    const root = Math.sqrt(number);

    if (root % 1 === 0) {
        return false;
    }

    for (let i = 2; i < root; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
};

const result = Array(2000000).fill(0).map((_, index) => index + 1)
    .filter(isPrime)
    .reduce((accumulator, value) => accumulator + value, 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);