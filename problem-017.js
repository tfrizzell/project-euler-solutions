console.info('Calculating solution for Project Euler Problem 17...\r\n');
const start = Date.now();

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

const result = Array(1000).fill(0).map((_, index) => translate(index + 1)).join(' ').replace(/[\s,-]+/g, '').length;

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);