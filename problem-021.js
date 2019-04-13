console.info('Calculating solution for Project Euler Problem 21...\r\n');
const start = Date.now();

const amicable = (number) =>
    amicable[number] || (amicable[number] = getProperDivisors(number).reduce(sumFactors, 0));

const getProperDivisors = (number) =>
    getProperDivisors[number] || (getProperDivisors[number] = Array(Math.floor(Math.sqrt(number))).fill(0)
        .map(mapValue)
        .filter(value => isFactorOf(number, value))
        .reduce((factors, factor) => [...factors, factor, number / factor], [])
        .filter(value => value < number));

const isFactorOf = (number, factor) =>
    number % factor === 0;

const mapValue = (_, index) =>
    index + 1;

const sumFactors = (accumulator, value) =>
    accumulator + value;

let result = 0;

for (let i = 1; i < 10000; i++) {
    const number = amicable(i);

    if (i < number && amicable(number) === i) {
        result += [...getProperDivisors(i), ...getProperDivisors(number)].reduce(sumFactors, 0);
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);