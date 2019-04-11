console.info('Calculating solution for Project Euler Problem 7...\r\n');
const start = Date.now();

const isFactorOf = (number, factor) =>
    (number / factor) % 1 === 0;

const isPrime = (number) => {
    const root = Math.sqrt(number);

    if (root % 1 === 0) {
        return false;
    }

    for (let i = 2; i < root; i++) {
        if (isFactorOf(number, i)) {
            return false;
        }
    }

    return true;
};

let result = 1,
    counter = 0;

while (counter < 10001) {
    counter += isPrime(result++);
    result -= (counter === 10001);
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);