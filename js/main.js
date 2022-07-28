let dictionary = {
  1: {
    'a': true,
    'i': true,
  },
  2: {
    'an': true,
    'at': true,
    'if': true,
    'in': true,
    'my': true,
  },
  3: {
    'cat': true,
    'dog': true,
    'fog': true,
    'ham': true,
    'get': true,
    'got': true,
    'can': true,
    'man': true,
  },
  4: {
    'true': true,
    'band': true,
    'bend': true,
    'each': true,
    'evil': true,
    'look': true,
    'long': true,
    'real': true,
    'rock': true,
  },
  5: {
    'apple': true,
    'grand': true,
    'false': true,
    'about': true,
    'maybe': true,
    'lunch': true,
    'eagle': true,
    'kabab': true,
    'oasis': true,
    'xenon': true,
  },
};

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

  //Make an empty grid.
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }

  //We store the sizes of each polyomino in this array.
  //Values in the grid that are 0 represent empty spots on the grid.
  //Each time we generate a polyomino it gets represented by a number starting with 1.
  //polyominoSizes[1] will store the size of the first polyomino, and so on.
  let polyominoSizes = [0];
  
  //Generate polyominoes inside grid
  let done = true;
  do {
    //random number from 3 to 5 as an example.
    let size = Math.floor(Math.random() * 5) + 3;
    let actualSize = 0;

    let currentID = polyominoSizes.length;

    //Store the coordinates of all empty neighbors of a polyomino. This will change as
    //add blocks to polyominos. It can be an array of objects where the key is the row,
    //and the value is the column. This way we can store pairs of coordinates in an array.
    let neighbors = [];

    //TODO
    //Pick a random spot in the grid
    //Check if it is 0, if yes, then we can start, otherwise, we need a new random spot.

    //TODO
    //Fill the selected spot with the current id, increment actual size.
    //Check up, down, left, right of this spot, and for all neighbors that have value 0,
    //we can add them into the neighbors array.
    //Select a random neighbor.
    //Fill that spot with the current id, increment actual size. Remove it from neighbors.
    //Check up, down, left, right of this spot, and for all neighbors that have value 0,
    //we can add them into the neighbors array. One of the spots will for sure have this
    //polyominoes id, so maybe ignore checking that spot.
    //Repeat this process until actual size == polyominoSize or there are no more pairs
    //in the neighbors array.

    //Update polyominoSizes with the correct size of this polyomino.
    polyominoSizes.push(actualSize);

    //TODO
    //Repeat until every spot in grid is filled with polyomino.
    //The grid will have no entry with 0 left at this point.
  } while (!done);

  //record size of each polyomino and select random words from dictionary

  //place each letter of word randomly in each polyomino

  return grid;
}

//Drawing
function draw(ctx, grid) {
  //Use Canvas to draw the grid.
}

//Main
function main() {
  let grid = generateGrid(5, 5);
  printGrid(grid);

  //Get the canvas.
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw(ctx, grid);
}

main();