console.info('Calculating solution for Project Euler Problem 10...\r\n');
const start = Date.now();

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

const result = Array(2000000)
    .fill(0).reduce((sum, _, index) => isPrime(index + 1) ? sum + index + 1 : sum, 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);