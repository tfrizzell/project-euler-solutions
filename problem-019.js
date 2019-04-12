console.info('Calculating solution for Project Euler Problem 19...\r\n');
const start = Date.now();

let result = 0;

for (let year = 1901; year < 2001; year++) {
    for (let month = 0; month < 12; month++) {
        result += (new Date(year, month, 1).getDay() === 0);
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);