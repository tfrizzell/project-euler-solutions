console.info('Calculating solution for Project Euler Problem 23...\r\n');
const start = Date.now();

const isAbundant = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((sum, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && (sum += index + 1);
                (index + 1 < factor) && (factor < number) && (sum += factor);
            }

            return sum;
        }, 0) > number;

const numbers = Array(28123).fill(0).map((_, index) => index + 1);
const abundant = numbers.filter(isAbundant);
const filtered = {};

for (let i = 0; i < abundant.length; i++) {
    for (let j = i; j < abundant.length; j++) {
        filtered[abundant[i] + abundant[j]] = true;
    }
}

const result = numbers.reduce((sum, value) => !filtered[value] ? sum + value : sum, 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);