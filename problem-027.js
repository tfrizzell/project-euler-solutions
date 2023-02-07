console.info('Calculating solution for Project Euler Problem 27...\r\n');
const start = Date.now();

const countConsecutivePrimes = (a, b) => {
    for (let n = 0; ; n++) {
        const result = (n * n) + (a * n) + b;

        if (!isPrime(result))
            return n;
    }
};

const isPrime = (number) => {
    const root = Math.sqrt(Math.abs(number));

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

let maxCount = 0;
let result;

for (let b = 0; b <= 1000; b++) {
    if (!isPrime(b))
        continue;

    for (let a = -999; a <= 999; a++) {
        const count = countConsecutivePrimes(a, b);

        if (count > maxCount) {
            maxCount = count;
            result = a * b;
        }
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);