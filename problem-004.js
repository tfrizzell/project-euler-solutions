console.info('Calculating solution for Project Euler Problem 4...\r\n');
const start = Date.now();

const isPalindrome = (value) => {
    const array = String(value).split('');
    return array.join('') === array.reverse().join('');
};

let result = 0;

for (let a = 100; a < 1000; a++) {
    for (let b = 100; b < 1000; b++) {
        const product = a * b;
        isPalindrome(product) && (result = Math.max(product, result));
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);