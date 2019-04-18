console.info('Calculating solution for Project Euler Problem 15...\r\n');
const start = Date.now();

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

const result = countPaths(20, 20);

console.log('Result:', result);
console.log('\r\nExecution Time:', `${Date.now() - start}ms`);