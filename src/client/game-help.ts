import { number } from '@colyseus/schema/lib/encoding/decode'
import game from './game'
const CHESS_POSITION_MAP = [
  [],
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
]

abstract class Seat {
  constructor(color: number) {
    this.color = color
  }
  color: number
  addChessTo(position: number): boolean {
    if(position >= 1 && position <= 52) {
      const p2d = {x: CHESS_POSITION_MAP[position][0], y: CHESS_POSITION_MAP[position][1]}
      game.scene.getScene('main').add.circle((p2d.x+0.5)*helper.cellWidth, (p2d.y+0.5)*helper.cellWidth, helper.chessRaius, this.color)
      return true
    }
    return false
  }
}

export const helper = {
  center: {x: Number(game.config.width) / 2, y: Number(game.config.height) / 2},
  cellWidth: Number(game.config.width) / 15,
  chessRaius: 15,
  seat1: new Seat(0x64DD17) {
    se
  },
  seat2: {color: 0xDD2C00},
  seat3: {color: 0xFFD600},
  seat4: {color: 0x2962FF}
}

window['gameHelper'] = helper