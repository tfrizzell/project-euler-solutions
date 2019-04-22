console.info('Calculating solution for Project Euler Problem 26...\r\n');
const start = Date.now();

const getRecurringCycleLength = (number) => {
    const cycle = Array(number).fill(0);
    let value = 1;
    let position = 1;

    while (cycle[value] === 0 && value !== 0) {
        cycle[value] = position++;
        value = (value * 10) % number;
    }

    return position - cycle[value];
};

let maxLength = 0;
let result;

for (let i = 2; i < 1000; i++) {
    const length = getRecurringCycleLength(i);

    if (length > maxLength) {
        maxLength = length;
        result = i;
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);