const generatingSudoku = new SudokuGenerator();

function setup() {
  createCanvas(800, 800);
}

function draw() {
  if (generatingSudoku.isGenerated === false) {
    generatingSudoku.generateNum();
  }

  printSudoku(generatingSudoku);
}

function printSudoku(sudoku) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let x = i;
      let y = j;
      rect(x * 40, y * 40, 40, 40);
      textSize(20);
      text(sudoku.ceils[i][j].val, x * 40 + 15, y * 40 + 27);
    }
  }
}
