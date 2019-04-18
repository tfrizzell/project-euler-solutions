console.info('Calculating solution for Project Euler Problem 20...\r\n');
const start = Date.now();

const factorial = (number) => {
    if (number % 1 !== 0) {
        throw new RangeError(`factorial() does not currently support decimal values`);
    }

    if (number < 0) {
        return `-${factorial(-number)}`;
    } else if (number <= 1) {
        return '1';
    }

    const y = factorial(number - 1);
    let carry = 0;
    let result = '';

    for (let i = y.length - 1; i >= 0; i--) {
        const z = carry + (number * parseInt(y[i]));
        carry = Math.floor(z / 10);
        result = `${z % 10}${result}`;
    }

    carry && (result = `${carry}${result}`);
    return result;
};

const result = factorial(100).split('').reduce((sum, value) => sum + parseInt(value), 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);