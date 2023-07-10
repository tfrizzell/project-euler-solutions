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

const amicable = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((sum, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && (sum += index + 1);
                (factor < number) && (sum += factor);
            }

            return sum;
        }, 0);

const collatz = (number) => {
    const sequence = [number];

    while (number != 1) {
        number = (number % 2 === 1)
            ? 3 * number + 1
            : number / 2;

        sequence.push(number);
    }

    return sequence;
};

const countPaths = (rows, columns) => {
    const grid = Array(rows + 1).fill(0).map(() => Array(columns + 1));
    
    for (let i = 0; i <= rows; i++) {
        grid[rows][i] = 1;
    }

    for (let i = 0; i <= columns; i++) {
        grid[i][columns] = 1;
    }
    
    for (let i = rows - 1; i >= 0; i--) {
        for (let j = columns - 1; j >= 0; j--) {
            grid[i][j] = grid[i + 1][j] + grid[i][j + 1];
        }
    }

    return grid[0][0];
};

const countPermutations = (set) => {
    if (set.length < 2) {
        return 1;
    }

    return set.length * countPermutations(set.slice(1));
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

    for (let i = y.length; !result || (((i < x.length) || (remainder !== 0)) && (significantDigits <= 17)); i++) {
        (x[i] === '.') && i++;

        while (x[i] === undefined) {
            x = `${x}0`;
            significantDigits++;
        }

        let number = `${remainder}${x[i]}`.replace(/^0+/, '');

        while (parseInt(number) < parseInt(y) && i++) {
            (x[i] === '.') && i++;

            while (x[i] === undefined) {
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
        if (result.length > significantDigits) {
            result = `${result.slice(0, result.length - significantDigits)}.${result.slice(-significantDigits)}`.replace(/0+$/, '').replace(/\.+$/, '').replace(/^\.+/, '0.');
        } else {
            result = `0.${result}`;
        }
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
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((divisors, _, index) => (number % (index + 1) === 0) ? [...divisors, index + 1, number / (index + 1)] : divisors, []);

const getPermutations = (set) => {
    if (set.length < 2) {
        return set;
    }

    const permutations = [];

    for (let i = 0; i < set.length; i++) {
        const digit = set[i];
        const subset = set.filter((_, index) => index !== i);
        permutations.push(...getPermutations(subset).map(number => `${digit}${number}`));
    }

    return permutations;
};

const getProperDivisors = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((divisors, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && !divisors.includes(index + 1) && divisors.push(index + 1);
                (factor < number) && !divisors.includes(factor) && divisors.push(factor);
            }

            return divisors;
        }, []);

const getRecurringCycleLength = (number) => {
    const cycle = Array(number).fill(0);
    let value = 1;
    let position = 1;

    while (cycle[value] === 0 && value !== 0) {
        cycle[value] = position++;
        value = (value * 10) % number;
    }

    return position - cycle[value];
};

const getStringValue = (name) =>
    name.split('').reduce((sum, char) => sum + (/[A-Z]/i.test(char) ? char.charCodeAt(0) - 64 : 0), 0);

const isAbundant = (number) =>
    Array(Math.floor(Math.sqrt(number)))
        .fill(0).reduce((sum, _, index) => {
            if (number % (index + 1) === 0) {
                const factor = number / (index + 1);
                (index + 1 < number) && (sum += index + 1);
                (index + 1 < factor) && (factor < number) && (sum += factor);
            }

            return sum;
        }, 0) > number;

const isFactorOf = (number, factor) =>
    number % factor === 0;

const isPalindrome = (value) =>
    value.toString().split('').reduce((result, char, index, array) => result && (char === array[array.length - index - 1]), true);

const isPrime = (number) => {
    const root = Math.sqrt(Math.abs(number));

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

const translate = (number) => {
    const tokens = [];

    const trillion = Math.floor(number / 1000000000000);
    trillion && tokens.push(translate(billions), 'trillion');
    number %= 1000000000000;

    const billions = Math.floor(number / 1000000000);
    billions && tokens.push(translate(billions), 'billion');
    number %= 1000000000;

    const millions = Math.floor(number / 1000000);
    millions && tokens.push(translate(millions), 'million');
    number %= 1000000;

    const thousands = Math.floor(number / 1000);
    thousands && tokens.push(translate(thousands), 'thousand');
    number %= 1000;

    const hundreds = Math.floor(number / 100);
    hundreds && tokens.push(translate(hundreds), 'hundred');
    number %= 100;

    hundreds && number && tokens.push('and');

    if (number >= 20) {
        const nty = Math.floor(number / 10);
        const remainder = number % 10;

        switch (nty) {
            case 2: tokens.push(`twenty-${translate(remainder)}`); break;
            case 3: tokens.push(`thirty-${translate(remainder)}`); break;
            case 4: tokens.push(`forty-${translate(remainder)}`); break;
            case 5: tokens.push(`fifty-${translate(remainder)}`); break;
            case 8: tokens.push(`eighty-${translate(remainder)}`); break;
            default: tokens.push(`${translate(nty)}ty-${translate(remainder)}`); break;
        }
    } else if (number > 10) {
        const nteen = Math.floor(number % 10);

        switch (nteen) {
            case 1: tokens.push('eleven'); break;
            case 2: tokens.push('twelve'); break;
            case 3: tokens.push('thirteen'); break;
            case 4: tokens.push('fourteen'); break;
            case 5: tokens.push('fifteen'); break;
            case 8: tokens.push('eighteen'); break;
            default: tokens.push(`${translate(nteen)}teen`); break;
        }
    } else {
        switch (number) {
            case 1:  tokens.push('one'); break;
            case 2:  tokens.push('two'); break;
            case 3:  tokens.push('three'); break;
            case 4:  tokens.push('four'); break;
            case 5:  tokens.push('five'); break;
            case 6:  tokens.push('six'); break;
            case 7:  tokens.push('seven'); break;
            case 8:  tokens.push('eight'); break;
            case 9:  tokens.push('nine'); break;
            case 10: tokens.push('ten'); break;
        }
    }

    return tokens.map(text => text.replace(/-+$/g, '')).join(' ');
};

const triangleNumber = (number) =>
    Array(number).fill(0).reduce((sum, _, index) => sum + index + 1, 0);