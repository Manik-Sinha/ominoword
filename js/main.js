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

function printGrid(grid, rows, cols) {
  console.log('printing grid')
  let printString = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      printString += grid[r * cols + c] + ' ';
    }
    printString += '\n';
  }
  console.log(printString);
}

//TODO Test if shuffleArray() is correctly implemented.
function shuffleArray(array) {
  for (let i = array.length; i > 1; i--) {
    //get random index from 0 to i-1, inclusive.
    let randomIndex = Math.floor(Math.random() * i);
    let lastIndex = i - 1;
    let temp = array[lastIndex];
    array[lastIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
}

function generateGrid(rows, cols) {
  // the grid is a 2D array stored in 1D array.
  //    0 1 2
  // 0: 0 1 2
  // 1: 3 4 5
  // 2: 6 7 8
  // index = row * cols + col
  // col = index % cols
  // row = floor(index / cols)
  // alternatively, row = (index - col) / cols

  //Make an empty grid.
  let grid = new Array(rows * cols);
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r * cols + c] = 0;
    }
  }

  //Make a temporarily list of all indices.
  let tempList = new Array(rows * cols);
  for (let i = 0; i < tempList.length; i++) {
    tempList[i] = i;
  }

  //Order them randomly.
  shuffleArray(tempList);

  //Let's store it in a set. Sets are ordered based on insertion order.
  //When we visit a point on the grid, we can remove it from this set.
  //When we need to pick a new random empty point, we can grab the first element of the set.
  //Since we randomized it to begin with it will be a random point.
  const unvisited = new Set(tempList);

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

    //Store the coordinates of all empty neighbors of a polyomino.
    let neighbors = new Set();

    //TODO
    //Pick a random unvisted spot in the grid.
    let startIndex
    if (unvisited.size == 0) {
      //done = true;
      break;
    }
    else {
      startIndex = unvisited.values().next().value;
      unvisited.delete(startIndex);
    }

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
  printGrid(grid, 5, 5);

  //Get the canvas.
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw(ctx, grid);
}

main();