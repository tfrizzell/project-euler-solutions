console.info('Calculating solution for Project Euler Problem 28...\r\n');
const start = Date.now();

const createSpiral = (n) => {
    if (n % 2 === 0)
        throw new Error('Spirals must have an odd number dimension');

    const grid = new Array(n).fill(null).map(() => new Array(n).fill(null));
    const center = Math.ceil(n / 2) - 1;
    let x = y = center;
    let value = dx = 1;
    let dy = 0;

    while (x >= 0 && x < n && y >= 0 && y < n) {
        const level = Math.max(Math.abs(center - x), Math.abs(center - y));
        grid[y][x] = value++;

        if (dx !== 0)
            x += dx / Math.abs(dx);

        if (dy !== 0)
            y += dy / Math.abs(dy);

        if (dx > 1) {
            dx--;
        } else if (dx === 1) {
            dx = 0;
            dy = 2 * level + 1;
        } else if (dx === -1) {
            dx = 0;
            dy = -2 * level;
        } else if (dx < -1) {
            dx++;
        } else if (dy > 1) {
            dy--;
        } else if (dy === 1) {
            dx = -2 * level;
            dy = 0;
        } else if (dy === -1) {
            dx = 2 * level + 1;
            dy = 0;
        } else if (dy < -1) {
            dy++;
        }
    }

    return grid;
}

const sumDiagonals = (sprial) =>
    sprial.reduce((sum, row, x) =>
        sum + row.reduce((sum, value, y) => {
            if (y === x || y === row.length - x - 1)
                return sum + value;

            return sum;
        }, 0), 0);

const result = sumDiagonals(createSpiral(1001));

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);