class SudokuGenerator {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.bugx = 99;
    this.bugy = 0;
    this.attempt = 0;
    this.bugcont = 0;

    this.isGenerated = false;
    this.positionCorrect = false;

    this.ceils = new Array(9);

    for (let i = 0; i < 9; i++) {
      this.ceils[i] = new Array(9);
      for (let j = 0; j < 9; j++) {
        this.ceils[i][j] = new Ceil(i, j);
      }
    }
  }

  generateNum() {
    let x = this.x;
    let y = this.y;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        for (let k = 1; k <= 9; k++) {
          this.ceils[i][j].valids[k] = true;
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.ceils[i][j].val !== 0) {
          let val = this.ceils[i][j].val;

          for (let k = 0; k < 9; k++) {
            if (k !== j) {
              this.ceils[i][k].valids[val] = false;
            }
            if (k !== i) {
              this.ceils[k][j].valids[val] = false;
            }
          }

          let area = this.ceils[i][j].area;

          for (let k = 0; k < 9; k++) {
            for (let m = 0; m < 9; m++) {
              if (this.ceils[k][m].area === area && k !== i && m !== j) {
                this.ceils[k][m].valids[val] = false;
              }
            }
          }
        }
      }
    }

    let haveNumbers = false;

    for (let i = 1; i <= 9; i++) {
      if (this.ceils[x][y].valids[i] === true) {
        haveNumbers = true;
      }
    }

    if (!haveNumbers) {
      if (this.bugx <= this.x && this.bugy === this.y) {
        this.bugcont += 0.2;

        for (let i = 0; i < this.bugcont; i++) {
          this.returnCeil();
        }
      } else {
        if (this.bugx > this.x) {
          this.bugcont = 0;
        }

        this.attempt++;
        if (this.attempt > 20) {
          this.bugx = this.x;
          this.bugy = this.y;
        } else {
          this.returnCeil();
        }
      }

      return;
    }

    let num;

    do {
      num = Math.floor(Math.random() * 9) + 1;
    } while (this.ceils[x][y].valids[num] !== true);

    /*     let currentArea = this.ceils[x][y].area;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentArea === this.ceils[i][j].area && num === this.ceils[i][j].num) {
          this.positionCorrect = false;
        }
      }
    } */

    this.ceils[x][y].val = num;
    this.moveCeil();
  }

  moveCeil() {
    this.x++;

    if (this.x > 8) {
      this.x = 0;
      this.y++;
    }

    if (this.y > 8) {
      this.isGenerated = true;
    }
  }

  returnCeil() {
    this.ceils[this.x][this.y].val = 0;
    this.x--;

    if (this.x < 0) {
      this.x = 8;
      this.y--;
    }
  }
}
