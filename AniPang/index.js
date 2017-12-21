const board = []
let row
let column
function init () {
  const maxNumber = 2
  for (let i = 0; i < row; i++) {
    board.push([])
    for (let j = 0; j < column; j++) {
      board[i].push(Math.floor(Math.random() * maxNumber + 1))
    }
  }
  for (let i = 2; i < 5; i++) board[i][2] = 1
}

const yyyy = [0, 1, 0, -1]
const xxxx = [-1, 0, 1, 0]
const xxyy = [1, 0, 1, 0]
const check = function (x, y) {
  const {minX, maxX, minY, maxY} = returnXY(x, y)
  let isZeroPush = maxX - minX >= 2 || maxY - minY >= 2
  if (maxX - minX >= 2) {
    for (let i = maxX; i >= minX; i--) { board[i][y] = 0 } // 상하 3개이상 클리어
  }
  if (maxY - minY >= 2) {
    for (let i = maxY; i >= minY; i--) { board[x][i] = 0 } // 좌우 3개이상 클리어
  }
  if (isZeroPush) zeroPush(y)
}
const returnXY = function (x, y) {
  let minX = x
  let maxX = x
  let minY = y
  let maxY = y
  for (let i = 0; i < 4; i++) {
    switch (xxyy[i]) { // 상 우 하 좌
      case 1: // 상하
        let tempX = x
        while (isLineTrue(tempX, y, xxxx[i], 0)) {
          tempX += xxxx[i]
          if (tempX < minX) minX = tempX
          if (tempX > maxX) maxX = tempX
        }
        break
      case 0: // 좌우
        let tempY = y
        while (isLineTrue(x, tempY, 0, yyyy[i])) {
          tempY += yyyy[i]
          if (tempY < minY) minY = tempY
          if (tempY > maxY) maxY = tempY
        }
        break
    }
  }
  return {minX, maxX, minY, maxY}
}
const isLineTrue = function (x, y, xSumValue, ySumValue) {
  if (board[x][y] === 0 || x + xSumValue < 0 || y + ySumValue < 0 || x + xSumValue >= row || y + ySumValue >= column) return false
  return board[x][y] === board[x + xSumValue][y + ySumValue]
}
const zeroPush = function (y) {
  for (let i = 0; i < row - 1; i++) {
    if (board[i + 1][y] === 0 && board[i][y]) {
      board[i + 1][y] = board[i][y]
      board[i][y] = 0
    }
  }

  for (let i = 0; i < row - 1; i++) {
    for (let j = 0; j < column; j++) {
      if (board[i + 1][j] === 0 && board[i][j]) {
        return zeroPush(j)
      }
    }
  }
}
const showBoard = function () {
  for (let i = 0; i < row; i++) {
    let str = ''
    for (let j = 0; j < column; j++) {
      str += board[i][j] + ' '
    }
    console.log(str)
  }
  console.log()
  console.log()
}

module.exports = (_row, _column) => {
  row = _row
  column = _column
  init()
  return {
    zeroPush,
    isLineTrue,
    check,
    showBoard,
    returnXY
  }
}
