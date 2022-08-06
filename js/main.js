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
  while (unvisited.size > 0) {
    //random number from 3 to 5 as an example.
    let size = Math.floor(Math.random() * 3) + 3;
    //let size = Math.floor(Math.random() * (rows * cols) + 1);
    let actualSize = 0;

    //As we update the polyominoSizes at the end of this loop,
    //we will be updating the length as well, so it increments each iteration.
    let currentID = polyominoSizes.length;

    //Store the coordinates of neighbors.
    //Each time a new neighbor is selected, it is removed from the array.
    //Each time we select a new piece of the polyomino, we find
    //any new neighbors and add them into the array.
    let neighbors = new Array();
    //We use neighborsSet to avoid storing the same value twice in neighbors.
    //This is important to avoid giving a neighbor more chance to be selected.
    let neighborsSet = new Set();

    //Pick a random unvisted spot in the grid.
    let startIndex
    if (unvisited.size == 0) {
      console.log("This shouldn't happen");
      break;
    }
    else {
      //Grab a random index from unvisited.
      startIndex = unvisited.values().next().value;
      //Remote the index from unvisited because we are visiting it now.
      unvisited.delete(startIndex);
    }

    //TODO
    //Fill the selected spot with the current id, increment actual size.
    grid[startIndex] = currentID;
    actualSize += 1;

    //Check up, down, left, right of this spot, and for all neighbors that have value 0,
    //we can add them into the neighbors array.
    // 3 x 3 Grid
    // cols = 3
    // 0: 0 1 2
    // 1: 3 4 5
    // 2: 6 7 8
    // 3 x 4 Grid
    // cols = 4
    // 0: 0 1 2  3
    // 1: 4 5 6  7
    // 2: 8 9 10 11
    let currentIndex = startIndex;
    do {
      console.log('selecting: ' + currentIndex);
      // To find coordinate of up: find current index - columns. If value < 0, there is no up.
      let up = currentIndex - cols;
      if (up >= 0 && grid[up] == 0) {
        if (!neighborsSet.has(up)) {
          neighborsSet.add(up);
          neighbors.push(up);
        }
        else {
          console.log('*************** found and ignoring duplicate value ' + up);
        }
      }

      //To find coordinate of down: find current index + columns. If value >= grid.length, there is no down.
      let down = currentIndex + cols;
      if (down < grid.length && grid[down] == 0) {
        if (!neighborsSet.has(down)) {
          neighborsSet.add(down);
          neighbors.push(down);
        }
        else {
          console.log('*************** found and ignoring duplicate value ' + down);
        }
      }

      //To find coordinate of left: find current index - 1. If we are in the first column, there is no left.
      let left = currentIndex - 1;
      let currentCol = currentIndex % cols;
      if (currentCol > 0 && grid[left] == 0) {
        if (!neighborsSet.has(left)) {
          neighborsSet.add(left);
          neighbors.push(left);
        }
        else {
          console.log('*************** found and ignoring duplicate value ' + left);
        }
      }
      //To find coordinate of right: find current index + 1. If we are in last column, there is no right.
      let right = currentIndex + 1;
      if (currentCol < (cols - 1) && grid[right] == 0) {
        if (!neighborsSet.has(right)) {
          neighborsSet.add(right);
          neighbors.push(right);
        }
        else {
          console.log('*************** found and ignoring duplicate value ' + right);
        }
      }

      console.log(neighbors);

      //Select a random neighbor.
      let randomNeighborIndex = Math.floor(Math.random() * neighbors.length);
      let randomNeighbor = neighbors[randomNeighborIndex];

      //Fill that spot with the current id, increment actual size. Remove it from neighbors.
      //We also need to remove it from unvisited.
      unvisited.delete(randomNeighbor);
      grid[randomNeighbor] = currentID;
      actualSize += 1;
      //Store the last element in neighbors array where the random neighbor is.
      neighbors[randomNeighborIndex] = neighbors.at(-1);
      //Reduce size of neighbors by deleting the redunant last element.
      //This is how we can 'delete' the random neighbor we already selected.
      neighbors.pop();

      //Check up, down, left, right of this spot, and for all neighbors that have value 0,
      //we can add them into the neighbors array. One of the spots will for sure have this
      //polyominoes id, so maybe ignore checking that spot.
      //Repeat this process until actual size == polyominoSize or there are no more pairs
      //in the neighbors array.
      currentIndex = randomNeighbor;

    } while(actualSize != size && neighbors.length != 0);

    //Update polyominoSizes with the correct size of this polyomino.
    polyominoSizes.push(actualSize);

    //Repeat until every spot in grid is filled with polyomino.
    //The grid will have no entry with 0 left at this point.
  }

  //record size of each polyomino and select random words from dictionary

  //place each letter of word randomly in each polyomino

  return grid;
}

//TODO
//This function to test if grid is filled and only filled with polyominoes.
function testGrid(grid) {
  return true;
}

//Drawing
function draw(ctx, grid) {
  //Use Canvas to draw the grid.
}

//Main
function main() {
  let grid = generateGrid(5, 5);
  printGrid(grid, 5, 5);
  testGrid(grid);

  //Get the canvas.
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  draw(ctx, grid);
}

main();