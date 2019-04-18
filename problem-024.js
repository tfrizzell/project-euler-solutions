console.info('Calculating solution for Project Euler Problem 24...\r\n');
const start = Date.now();

const countPermutations = (set) => {
    if (set.length < 2) {
        return 1;
    }

    return set.length * countPermutations(set.slice(1));
};

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

const set = Array(10).fill(0).map((_, index) => index);

let counter = 0;
let result;

for (let i = 0; !result && i < set.length; i++) {
    const digit = set[i];
    const subset = set.filter((_, index) => index !== i);
    const count = countPermutations(subset);

    if (counter + count >= 1000000) {
        const permutations = getPermutations(subset).map(perm => `${digit}${perm}`);
        result = permutations[999999 - counter];
    } else {
        counter += count;
    }
}

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);