class Ceil {
  constructor(y, x) {
    this.val = 0;
    this.valids = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true
    };
    this.row = y;
    this.column = x;
    this.area = Math.floor(y / 3) + 3 * Math.floor(x / 3);
  }
}

//000111222
