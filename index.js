const STATUS = {
	FLAG: 1,
  UNKOWN: 2,
  NOTFLAG: 0
}

class MineSweepers {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.array = [];
    this.bomNumber = 100;
    this.firstStart = false;
  }

  createBoard() {
    for (let i = 0; i < this.row; i++) {
      let arrRow = [];
      for (let j = 0; j < this.column; j++) {
        const para = document.createElement("button");
        para.id = `cell${i}-${j}`;
        para.className = "cell";
        para.innerHTML = "&nbsp;";
        arrRow.push({
          value: 0,
          status: STATUS.NOTFLAG,
          isOpen: false,
        });
        document.getElementById("container").appendChild(para);
        if (j === this.column - 1) {
          const br = document.createElement("br");
          document.getElementById("container").appendChild(br);
        }
      }
      this.array.push(arrRow);
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  createMapBom(rowInit, columnInit) {
    let count = 0;
    while (count < this.bomNumber) {
      let j = this.getRandomInt(this.row);
      let k = this.getRandomInt(this.column);
      if (
        this.array[j][k].value !== 100 &&
        rowInit !== j &&
        columnInit !== k &&
        !this.checkPositionIsArroundCells({ i: rowInit, j: columnInit }, j, k)
      ) {
        this.array[j][k].value = 100;
        count++;
      }
    }

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.array[i][j].value === 0) {
          let number = this.initBom(i, j);
          this.array[i][j].value = number;
        }
      }
    }
    this.array[rowInit][columnInit].value = 0;
  }

  checkPositionIsArroundCells(coordinates, x, y) {
    let arrayAround = [];
    for (let m = coordinates.i - 1; m <= coordinates.i + 1; m++) {
      for (let n = coordinates.j - 1; n <= coordinates.j + 1; n++) {
        if (m !== -1 && n !== -1 && m !== this.row && n !== this.column) {
          arrayAround.push({
            i: m,
            j: n,
          });
        }
      }
    }

    for (const obj of arrayAround) {
      if (obj.i === x && obj.j === y) {
        return true;
      }
    }
    return false;
  }

  initBom(i, j) {
    let number = 0;
    for (let m = i - 1; m <= i + 1; m++) {
      for (let n = j - 1; n <= j + 1; n++) {
        if (m !== -1 && n !== -1 && m !== this.row && n !== this.column) {
          if (this.array[m][n].value === 100) {
            number++;
          }
        }
      }
    }
    return number;
  }

  countBomArrowPosition(i, j, value) {
    let number = 0;
    for (let m = i - 1; m <= i + 1; m++) {
      for (let n = j - 1; n <= j + 1; n++) {
        if (m !== -1 && n !== -1 && m !== this.row && n !== this.column) {
          if (this.array[m][n].status === STATUS.FLAG) {
            number++;
          }
        }
      }
    }

    if (number === value) {
      for (let m = i - 1; m <= i + 1; m++) {
        for (let n = j - 1; n <= j + 1; n++) {
          if(!this.array[m][n].isOpen) { 
            let cellId = document.getElementById(`cell${m}-${n}`);
             if(this.array[m][n].value === 100) {
              cellId.style.background = "url('./image/download.jpg')";
              cellId.style.backgroundSize = "contain";
              this.array[m][n].isOpen = true;
              alert("game vocer")
             } else if(this.array[m][n].value === 0) {
              cellId.style.background = "white";
              this.array[m][n].isOpen = true;
              this.openEmtyAround(m, n);
             } else {
              cellId.innerText  =  this.array[m][n].value;
              this.array[m][n].isOpen = true;
             }
          }
        }
      }
    }

  }

  openEmtyAround(i, j) {
    let openedCellArr = [{ i: i, j: j }];
    let removedAray = [];
    while (openedCellArr.length !== 0) {
      i = openedCellArr[0].i;
      j = openedCellArr[0].j;
      for (let m = i - 1; m <= i + 1; m++) {
        for (let n = j - 1; n <= j + 1; n++) {
          if (m !== -1 && n !== -1 && m !== this.row && n !== this.column) {
            if (
              this.array[m][n].value == 0 &&
              this.checkOpen(removedAray, m, n) === false &&
              this.checkOpen(openedCellArr, m, n) === false
            ) {
              openedCellArr.push({ i: m, j: n });
              removedAray.push(openedCellArr[0]);
            } else {
              let cellId = document.getElementById(`cell${m}-${n}`);
              if (this.array[m][n].value === 0 && !this.array[m][n].isOpen) {
                cellId.style.background = "white";
                this.array[m][n].isOpen = true;
              } else {
                if (!this.array[m][n].isOpen) {
                  cellId.innerText = this.array[m][n].value;
                  this.array[m][n].isOpen = true;
                }
              }
            }
          }
        }
      }
      openedCellArr.shift();
    }
  }

  checkOpen(arr, k, j) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].i === k && arr[i].j === j) {
        return true;
      }
    }
    return false;
  }

  addEvent() {
    //addd left click
    let gameOver =  false;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let cellId = document.getElementById(`cell${i}-${j}`);
        cellId.addEventListener("click", () => {
          if (!this.array[i][j].isOpen) {
            if (this.array[i][j].value === 100) {
              cellId.style.background = "url('./image/download.jpg')";
              cellId.style.backgroundSize = "contain";
              gameOver = true;
              alert("End game");
            } else if (this.array[i][j].value === 0) {
              cellId.style.background = "white";
              this.openEmtyAround(i, j);
            } else {
              cellId.innerText = this.array[i][j].value;
            }
          }
        });

        cellId.addEventListener('dblclick', () => {
          this.countBomArrowPosition(i,j, this.array[i][j].value);
        })
      }
    }

    //add right click

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let cellId = document.getElementById(`cell${i}-${j}`);
        cellId.addEventListener("contextmenu", (e) => {
          if (this.array[i][j].status === STATUS.NOTFLAG) {
            cellId.style.background = "url('./image/images.jpg')";
            cellId.style.backgroundSize = "cover";
            cellId.style.backgroundRepeat = "no-repeat";
            this.array[i][j].isOpen = false;
            this.array[i][j].status = STATUS.FLAG;
          } else if(this.array[i][j].status === STATUS.FLAG ) {
            cellId.style.background = "url('./image/chamhoi.png')";
            cellId.style.backgroundSize = "cover";
            cellId.style.backgroundRepeat = "no-repeat";
            this.array[i][j].isOpen = false;
            this.array[i][j].status = STATUS.UNKOWN;
          } else if(this.array[i][j].status === STATUS.UNKOWN) {
            cellId.style.removeProperty("background");
            cellId.style.removeProperty("backgroundSize");
            cellId.style.removeProperty("backgroundRepeat");
            this.array[i][j].isOpen = false;
            this.array[i][j].status = STATUS.NOTFLAG;
          } 
          e.preventDefault();
        });
      }
    }

    //add double clicj


  }

  

  clear() {
    document.getElementById("container").innerHTML = "";
    this.array = [];
  }

  startGame() {
    this.firstStart = false;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let cellId = document.getElementById(`cell${i}-${j}`);
        cellId.addEventListener("click", (e) => {
          if (!this.firstStart) {
            if (this.array[i][j].status !== STATUS.FLAG) {
              console.log(this.array[i][j].status);
              this.array[i][j].value = -1000;
              this.firstStart = true;
              this.createMapBom(i, j);
              this.openEmtyAround(i, j);
            }
          } else {
            e.preventDefault();
          }
        });
      }
    }
    let second = 0;
    let minutes = 0;
    setInterval(() => {
      second = second + 1;
      if (second > 60) {
        minutes = minutes + 1;
        second = 0;
      }
      document.getElementById("timer").innerHTML = `${minutes}: ${second}`;
    }, 1000);
  }
}

let game = new MineSweepers(16, 30);
document.getElementById("starGame").addEventListener("click", () => {
  game.clear();
  game.createBoard();
  game.startGame();
  game.addEvent();
  //game.addRightlick();
});
