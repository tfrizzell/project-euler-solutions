console.info('Calculating solution for Project Euler Problem 25...\r\n');
const start = Date.now();

const add = (a, b) => {
    a = a.toString().split('').reverse().join('');
    b = b.toString().split('').reverse().join('');

    let value = Array(Math.max(a.length, a.length) + 1).fill(0).join(''),
        carry = 0;

    for (let i = 0; i < value.length; i++) {

        const val = parseInt(a[i] || 0) + parseInt(b[i] || 0) + carry;
        carry = Math.floor(val / 10);
        value = `${value.substr(0, i)}${val % 10}${value.substr(i + 1)}`;

        if (carry && value[i + 1] === undefined) {
            value += 0;
            console.log('->', value);
        }
    }

    return value.split('').reverse().join('').replace(/^0+/, '');
};

const sequence = Array(2).fill(0).map((_, index, array) => array[index] = (index > 1) ? array[index - 2] + array[index - 1] : 1);
let result = sequence.length + 1;

while (true) {
    const next = add(sequence[0], sequence[1]);
    sequence.shift();
    sequence.push(next);

    if (next.toString().length >= 1000) {
        break;
    }

    result++;
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);