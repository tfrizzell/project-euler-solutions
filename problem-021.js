console.info('Calculating solution for Project Euler Problem 21...\r\n');
const start = Date.now();

const amicable = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((sum, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && (sum += index + 1);
                (factor < number) && (sum += factor);
            }

            return sum;
        }, 0);

const getProperDivisors = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((divisors, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && divisors.push(index + 1);
                (factor < number) && divisors.push(factor);
            }

            return divisors;
        }, []);

const factors = [];

for (let i = 1; i < 10000; i++) {
    const number = amicable(i);

    if (i < number && amicable(number) === i) {
        factors.push(...getProperDivisors(i), ...getProperDivisors(number));
    }
}

const result = factors.reduce((sum, value) => sum + value, 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);