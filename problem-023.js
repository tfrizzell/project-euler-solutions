console.info('Calculating solution for Project Euler Problem 23...\r\n');
const start = Date.now();

const getDivisors = (number) =>
    getDivisors[number] || (getDivisors[number] = Array(Math.floor(Math.sqrt(number))).fill(0)
        .map(mapValue)
        .filter(value => isFactorOf(number, value))
        .reduce((factors, factor) => [...factors, factor, number / factor], []));

const isAbundant = (number) =>
    isAbundant[number] || (isAbundant[number] = getDivisors(number)
        .filter((value, index, array) => (array.indexOf(value) === index) && (value < number))
        .reduce(sum, 0) > number);

const isFactorOf = (number, factor) =>
    number % factor === 0;

const mapValue = (_, index) =>
    index + 1;

const sum = (accumulator, value) =>
    accumulator + value;

const numbers = Array(28123).fill(0).map(mapValue);
const abundant = numbers.filter(isAbundant);
const filtered = {};

for (let i = 0; i < abundant.length; i++) {
    for (let j = i; j < abundant.length; j++) {
        filtered[abundant[i] + abundant[j]] = true;
    }
}

console.log('Result:', numbers.filter(number => !filtered[number]).reduce(sum, 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);