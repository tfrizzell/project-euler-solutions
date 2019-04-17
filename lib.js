/**
 * This file contains a library of methods used through the problems for easy reference.
 */
 
const add = (...numbers) => {
    if (numbers.length < 1) {
        return 0;
    } else if (numbers.length > 2) {
        return numbers.reduce((x, y) => add(x, y));
    }

    const [valA, valB] = numbers.map(num => parseFloat(num));
    const negative = {x: (valA < 0), y: (valB < 0)};
    const padding = Math.max(parseInt(valA).toString().replace(/^-/, '').length, parseInt(valB).toString().replace(/^-/, '').length);
    const significantDigits = Math.max(...numbers.map(number => ({1: '', .../\.(\d+)$/.exec(number)})[1].length));

    const [x, y] = numbers.map(number => {
        number = number.toString().replace(/^-/, '').padStart(padding, '0');

        if (significantDigits > 0) {
            (/^\d+$/.test(number)) && (number = `${number}.0`);
            number = number.replace(/\.(\d+)/, (a, b) => b.padEnd(significantDigits, '0'));
        }

        return number;
    });

    let carry = 0;
    let result = '';

    for (let i = x.length - 1; i >= 0; i--) {
        const z = carry + (negative.x ? -parseInt(x[i]) : parseInt(x[i])) + (negative.y ? -parseInt(y[i]) : parseInt(y[i]));
        carry = (z >= 0) ? Math.floor(z / 10) : Math.ceil(z / 10);
        result = `${Math.abs(z) % 10}${result}`;
    }

    if (valA + valB < 0) {
        result = `-${carry}${result}`.replace(/^\-+/, '-').replace(/^-0+/, '-');
    } else {
        result = `${carry}${result}`
    }

    if (significantDigits > 0) {
        result = `${result.slice(0, result.length - significantDigits)}.${result.slice(-significantDigits)}`.replace(/0+$/, '').replace(/\.+$/, '');
    }

    return result.replace(/^(-)?(?:-+)?0+([^.])/, '$1$2');
};
 
const divide = (...numbers) => {
    if (numbers.length < 1) {
        return 0;
    } else if (numbers.length > 2) {
        return numbers.reduce((x, y) => divide(x, y));
    }

    const negative = (numbers.filter(number => parseInt(number) < 0).length % 2 !== 0);
    const scalar = Math.pow(10, {1: '', .../\.(\d+)$/.exec(numbers[1])}[1].length);

    let x = (Math.abs(numbers[0]) * scalar).toString().replace(/\.(\d+)/, '$1');
    const y = (Math.abs(numbers[1]) *scalar).toString().replace(/\.(\d+)/, '$1');

    let remainder = parseInt(x.substr(0, y.length));
    let significantDigits = 0;
    let result = '';

    for (let i = y.length; ((i < x.length) || (remainder !== 0)) && (significantDigits <= 25); i++) {
        (x[i] === '.') && i++;

        if (x[i] === undefined) {
            x = `${x}0`;
            significantDigits++;
        }

        let number = `${remainder}${x[i]}`.replace(/^0+/, '');

        while (parseInt(number) < parseInt(y) && i++) {
            (x[i] === '.') && i++;

            if (x[i] === undefined) {
                x = `${x}0`;
                significantDigits++;
            }

            number = `${number}${x[i]}`;
            result = `${result}0`;
        }

        result = `${result}${Math.floor(number / y)}`;
        remainder = number % y;
    }

    if (significantDigits > 0) {
        result = `${result.slice(0, result.length - significantDigits)}.${result.slice(-significantDigits)}`.replace(/0+$/, '').replace(/\.+$/, '').replace(/^\.+/, '0.');
    }

    return `${negative ? '-' : ''}${result.replace(/^0+([^.])/g, '$1')}`;
};

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

const fibonacci = (number) =>
    Array(number).fill(0).map((_, index, array) => array[index] = (index > 1) ? array[index - 1] + array[index - 2] : 1);

const getDivisors = (number) =>
    Array(Math.floor(Math.sqrt(number))).fill(0).map((_, index) => index + 1)
        .filter(value => number % value === 0)
        .reduce((divisors, value) => [...divisors, value, number / value], []);

const isFactorOf = (number, factor) =>
    number % factor === 0;

const isPalindrome = (value) =>
    value.toString().split('').reduce((result, char, index, array) => result && (char === array[array.length - index - 1]), true);

const isPrime = (number) => {
    const root = Math.sqrt(number);

    if (root % 1 === 0) {
        return false;
    }

    for (let i = 2; i < root; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
};

const multiply = (...numbers) => {
    if (numbers.length < 2) {
        return numbers[0];
    } else if (numbers.length > 2) {
        return numbers.reduce((a, b) => multiply(a, b));
    }

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
 
const subtract = (...numbers) => {
    if (numbers.length < 1) {
        return 0;
    } else if (numbers.length > 2) {
        return numbers.reduce((x, y) => subtract(x, y));
    }

    const [valA, valB] = numbers.map(num => parseFloat(num));
    const negative = {x: (valA < 0), y: (valB < 0)};
    const padding = Math.max(parseInt(valA).toString().replace(/^-/, '').length, parseInt(valB).toString().replace(/^-/, '').length);
    const significantDigits = Math.max(...numbers.map(number => ({1: '', .../\.(\d+)$/.exec(number)})[1].length));

    const [x, y] = numbers.map(number => {
        number = number.toString().replace(/^-/, '').padStart(padding, '0');

        if (significantDigits > 0) {
            (/^\d+$/.test(number)) && (number = `${number}.0`);
            number = number.replace(/\.(\d+)/, (a, b) => b.padEnd(significantDigits, '0'));
        }

        return number;
    });

    let carry = 0;
    let result = '';

    for (let i = x.length - 1; i >= 0; i--) {
        const z = carry - (negative.x ? -parseInt(x[i]) : parseInt(x[i])) - (negative.y ? parseInt(y[i]) : -parseInt(y[i]));
        carry = (z >= 0) ? Math.floor(z / 10) : Math.ceil(z / 10);
        result = `${Math.abs(z) % 10}${result}`;
    }

    if (valA + valB < 0) {
        result = `-${carry}${result}`.replace(/^\-+/, '-').replace(/^-0+/, '-');
    } else {
        result = `${carry}${result}`
    }

    if (significantDigits > 0) {
        result = `${result.slice(0, result.length - significantDigits)}.${result.slice(-significantDigits)}`.replace(/0+$/, '').replace(/\.+$/, '').replace(/^\.+/, '0.');
    }

    return result.replace(/^(-)?(?:-+)?0+([^.])/, '$1$2');
};

const triangleNumber = (number) =>
    Array(number).fill(0).map((_, index) => index + 1).reduce((sum, value) => sum + value, 0);