let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  
  let gridContainer = document.getElementById('grid-container');
  let startButton = document.getElementById('start-btn');
  let resetButton = document.getElementById('reset-btn');
  let upButton = document.getElementById('up-btn');
  let leftButton = document.getElementById('left-btn');
  let rightButton = document.getElementById('right-btn');
  let downButton = document.getElementById('down-btn');
  
  // Function to render the grid on the screen
  function renderGrid() {
    gridContainer.innerHTML = '';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        let value = grid[row][col];
        if (value > 0) {
          tile.textContent = value;
          tile.classList.add(`tile-${value}`);
        }
        gridContainer.appendChild(tile);
      }
    }
  }
  
  // Function to add a new tile to a random empty spot
  function addRandomTile() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          emptyTiles.push([row, col]);
        }
      }
    }
    if (emptyTiles.length === 0) return; // No empty tiles left
    let [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
  }
  
  // Function to merge the grid tiles to the left
  function moveLeft() {
    for (let row = 0; row < 4; row++) {
      let newRow = grid[row].filter(val => val !== 0); // Remove zeros
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2; // Double the value
          newRow[i + 1] = 0; // Mark the second tile as merged
        }
      }
      newRow = newRow.filter(val => val !== 0); // Remove any zeros after merging
      while (newRow.length < 4) {
        newRow.push(0); // Fill remaining space with zeros
      }
      grid[row] = newRow;
    }
  }
  
  // Function to handle right, up, and down moves by rotating the grid
  function moveRight() {
    for (let row = 0; row < 4; row++) {
      grid[row].reverse();
    }
    moveLeft();
    for (let row = 0; row < 4; row++) {
      grid[row].reverse();
    }
  }
  
  function moveUp() {
    grid = transpose(grid);
    moveLeft();
    grid = transpose(grid);
  }
  
  function moveDown() {
    grid = transpose(grid);
    moveRight();
    grid = transpose(grid);
  }
  
  // Function to transpose the grid (for up/down moves)
  function transpose(grid) {
    let transposed = [];
    for (let col = 0; col < 4; col++) {
      transposed.push([]);
      for (let row = 0; row < 4; row++) {
        transposed[col][row] = grid[row][col];
      }
    }
    return transposed;
  }
  
  // Event Listeners for buttons
  upButton.addEventListener('click', () => {
    moveUp();
    addRandomTile();
    renderGrid();
    checkGameOver();
  });
  
  leftButton.addEventListener('click', () => {
    moveLeft();
    addRandomTile();
    renderGrid();
    checkGameOver();
  });
  
  rightButton.addEventListener('click', () => {
    moveRight();
    addRandomTile();
    renderGrid();
    checkGameOver();
  });
  
  downButton.addEventListener('click', () => {
    moveDown();
    addRandomTile();
    renderGrid();
    checkGameOver();
  });
  
  startButton.addEventListener('click', () => {
    grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    addRandomTile();
    addRandomTile();
    renderGrid();
  });
  
  resetButton.addEventListener('click', () => {
    grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    addRandomTile();
    renderGrid();
  });
  
  // Function to check if the game is over
  function checkGameOver() {
    let gameOver = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) {
          gameOver = false; // Empty space available
        }
        if (col < 3 && grid[row][col] === grid[row][col + 1]) {
          gameOver = false; // Merge possible in row
        }
        if (row < 3 && grid[row][col] === grid[row + 1][col]) {
          gameOver = false; // Merge possible in column
        }
      }
    }
    if (gameOver) {
      alert("Game Over!");
    }
  }
  
  // Start the game
  addRandomTile();
  addRandomTile();
  renderGrid();
  