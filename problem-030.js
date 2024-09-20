console.info('Calculating solution for Project Euler Problem 30...\r\n');
const start = Date.now();

const getSumOfNthPowers = (n) => {
    const results = [];

    for (let i = Math.pow(10, n - 1); i < Math.pow(10, n); i++) {
        const sum = i.toString().split('').reduce((sum, x) => sum + (parseInt(x) ** n), 0);

        if (sum == i)
            results.push(i);
    }

    return results;
};

const result = getSumOfNthPowers(5).reduce((a, b) => a + b);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);