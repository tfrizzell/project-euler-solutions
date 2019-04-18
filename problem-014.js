console.info('Calculating solution for Project Euler Problem 14...\r\n');
const start = Date.now();

const collatz = (number) => {
    const sequence = [number];

    while (number != 1) {
        number = (number % 2 === 1)
            ? 3 * number + 1
            : number / 2;

        sequence.push(number);
    }

    return sequence;
};

let maxLength = 0;
let result;

for (let i = 1; i < 1000000; i++) {
    const sequence = collatz(i);

    if (sequence.length > maxLength) {
        maxLength = sequence.length;
        result = i;
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);