console.info('Calculating solution for Project Euler Problem 16...\r\n');
const start = Date.now();

const power = (base, exponent) => {
    if (exponent < 1) {
        return '1';
    }

    const numbers = [base, power(base, exponent - 1)];
    const negative = (numbers.filter(number => parseInt(number) < 0).length % 2 !== 0)
    const significantDigits = numbers.reduce((sum, value) => sum + {1: '', .../\.(\d+)$/.exec(value)}[1].length, 0);
    const decimals = Math.max(...numbers.map(number => ({1: '', .../\.(\d+)$/.exec(number)})[1].length));

    const [x, y] = numbers.map(number => {
        number = number.toString().replace(/^-/, '');

        if (decimals > 0) {
            (/^\d+$/.test(number)) && (number = `${number}.0`);
            number = number.replace(/\.(\d+)/, (a, b) => b.padEnd(decimals, '0'));
        }

        return number;
    });

    const results = [];

    for (let i = x.length - 1; i >= 0; i--) {
        const number = parseInt(x[i]);
        let value = Array(x.length - i - 1).fill(0).join('');
        let carry = 0;

        for (let j = y.length - 1; j >= 0; j--) {
            const z = carry + (number * parseInt(y[j]));
            carry = Math.floor(z / 10);
            value = `${z % 10}${value}`;
        }

        carry && (value = `${carry}${value}`);
        results.push(value);
    }

    const length = Math.max(...results.map(value => value.length));
    let carry = 0;
    let result = '';

    for (let i = length - 1; i >= 0; i--) {
        let value = carry;

        for (let j = 0; j < results.length; j++) {
            (results[j].length < length) & (results[j] = results[j].padStart(length, 0));
            value += parseInt(results[j][i]);
        }

        carry = Math.floor(value / 10);
        result = `${value % 10}${result}`;
    }

    carry && (result = `${carry}${result}`);

    if (significantDigits > 0) {
        result = `${result.slice(0, result.length - significantDigits)}.${result.slice(-significantDigits)}`.replace(/0+$/, '').replace(/\.+$/, '').replace(/^\.+/, '0.');
    }

    return `${negative ? '-' : ''}${result.replace(/^0+([^.])/g, '$1')}`;
};

const result = power(2, 1000).split('').reduce((sum, value) => sum + parseInt(value), 0);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);