console.info('Calculating solution for Project Euler Problem 29...\r\n');
const start = Date.now();

const getDistinctPowers = ([minA, maxA], [minB, maxB]) => {
    const results = new Set();

    for (let a = minA; a <= maxA; a++) {
        for (let b = minB; b <= maxB; b++)
            results.add(a ** b);
    }

    return Array.from(results);
};

const result = getDistinctPowers([2, 100], [2, 100]).length;

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);