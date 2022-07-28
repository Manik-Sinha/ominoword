let grid = generateGrid(5, 5)
printGrid(grid)

let exampleDictionary = {
    "apple": true,
    "banana": true,
    "fog": true,
    "cat": true,
    "diamond": true,
    "monaco": true,
    "true": true,
    "false": true,
    "monkey": true,
    "animal": true,
    "avocado": true,
    "pineapple": true,
    "at": true,
    "in": true,
    "dog": true,
    "band": true,
    "bend": true,
    "grand": true,
}

function printGrid(grid) {
    console.log('printing grid')
    let rows = grid.length;
    let printString = '';
    for (let r = 0; r < rows; r++) {
        let cols = grid[r].length;
        for (let c = 0; c < cols; c++) {
            printString += grid[r][c] + ' ';
        }
        printString += '\n';
    }
    console.log(printString);
}

function generateGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
    //generate polyominoes inside grid
    let done = true;
    do {
        //random number from 3 to 5 as an example.
        let polyominoSize = Math.floor(Math.random() * 5) + 3;
        //We may want to do this inline instead of a function.
        generatePolyomino(grid, polyominoSize);
    } while (!done);

    //record size of each polyomino and select random words from dictionary

    //place each letter of word randomly in each polyomino

    return grid;
}

function generatePolyomino(grid, maxSize)
{
    let rows = grid.length;
    let cols = grid[0].length;
}