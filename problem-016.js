console.info('Calculating solution for Project Euler Problem 16...\r\n');
const start = Date.now();

const power = (base, exponent) => {
    let value = '1',
        carry = 0;

    while (exponent-- > 0) {
        for (let i = 0; i < value.length; i++) {
            const val = (value[i] * base) + carry;
            carry = Math.floor(val / 10);
            value = `${value.substr(0, i)}${val % 10}${value.substr(i + 1)}`;

            if (carry && value[i + 1] === undefined) {
                value += 0;
            }
        }
    }

    return value.split('').reverse().join('');
};

console.log('Result:', power(2, 1000).split('').reduce((accumulator, value) => accumulator + parseInt(value), 0));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);