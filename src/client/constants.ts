
export const CHESS_POSITION_MAP = [
  [-1, -1],
  [6, 0],
  [7, 0],
  [8, 0],
  [8, 1],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [9, 6],
  [10, 6],
  [11, 6],
  [12, 6],
  [13, 6],
  [14, 6],
  [14, 7],
  [14, 8],
  [13, 8],
  [12, 8],
  [11, 8],
  [10, 8],
  [9, 8],
  [8, 9],
  [8, 10],
  [8, 11],
  [8, 12],
  [8, 13],
  [8, 14],
  [7, 14],
  [6, 14],
  [6, 13],
  [6, 12],
  [6, 11],
  [6, 10],
  [6, 9],
  [5, 8],
  [4, 8],
  [3, 8],
  [2, 8],
  [1, 8],
  [0, 8],
  [0, 7],
  [0, 6],
  [1, 6],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 5],
  [6, 4],
  [6, 3],
  [6, 2],
  [6, 1],
  [1, 7],
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 1],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [7, 6],
  [13, 7],
  [12, 7],
  [11, 7],
  [10, 7],
  [9, 7],
  [8, 7],
  [7, 13],
  [7, 12],
  [7, 11],
  [7, 10],
  [7, 9],
  [7, 8],
]

const width = 560

export const CONSTANT = {
  width: width,
  height: width,
  chessRaius: 15,
  cellWidth: width / 15,
  playerColors: [0x64DD17, 0xDD2C00, 0x2962FF, 0xFFD600],
  playerBoardsPositionMap: [
    [[3, 2], [4, 3], [3, 4], [2, 3]],
    [[12, 2], [13, 3], [12, 4], [11, 3]],
    [[12, 11], [13, 12], [12, 13], [11, 12]],
    [[3, 11], [4, 12], [3, 13], [2, 12]],
  ],
  circumference: 52, // 地图外圈一周的长度
  diceMaxValue: 6, // 一个骰子的最大点数
}