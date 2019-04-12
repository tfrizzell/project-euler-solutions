console.info('Calculating solution for Project Euler Problem 20...\r\n');
const start = Date.now();

const factorial = (number) => {
    if (number <= 1) {
        return '1';
    }

    let value = factorial(number - 1),
        carry = 0;
    
    for (let i = 0; i < value.length; i++) {
        const val = (value[i] * number) + carry;
        carry = Math.floor(val / 10);
        value = `${value.substr(0, i)}${val % 10}${value.substr(i + 1)}`;

        if (carry && value[i + 1] === undefined) {
            value += 0;
        }
    }

    return value.split('').reverse().join('');
};

console.log('Result:', factorial(100).split('').reduce((accumulator, value) => accumulator + parseInt(value), 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);