console.info('Calculating solution for Project Euler Problem 16...\r\n');
const start = Date.now();

const sumDigits = (base, exponent) => {
    const digits = [];

    while (exponent > 0) {
        exponent--;

        if (digits.length === 0) {
            digits[0] = 1;
        }

        for (let i = 0; i < digits.length; i++) {
            digits[i] *= base;
            (digits[i] >= 10) && (digits[i + 1] === undefined) && (digits[i + 1] = 0);

            if (digits[i - 1] >= 10) {
                digits[i] += Math.floor(digits[i - 1] / 10);
                digits[i - 1] %= 10;
            }
        }
    }

    return digits.reduce((accumulator, value) => accumulator + value, 0);
};

console.log('Result:', sumDigits(2, 1000));
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);