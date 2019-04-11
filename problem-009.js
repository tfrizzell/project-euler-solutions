console.info('Calculating solution for Project Euler Problem 9...\r\n');
const start = Date.now();

let result;

for (let a = 1000; !result && a > 0; a--) {
    for (let b = 1000; !result && b > 0; b--) {
        for (let c = 1000; !result && c > 0; c--) {
            if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2) && a + b + c === 1000) {
                result = a * b * c;
            }
        }
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);