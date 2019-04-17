console.info('Calculating solution for Project Euler Problem 4...\r\n');
const start = Date.now();

const isPalindrome = (value) =>
    value.toString().split('').reduce((result, char, index, array) => result && (char === array[array.length - index - 1]), true);

let result = 0;

for (let x = 100; x < 1000; x++) {
    for (let y = 100; y < 1000; y++) {
        const product = x * y;
        isPalindrome(product) && (result = Math.max(product, result));
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);