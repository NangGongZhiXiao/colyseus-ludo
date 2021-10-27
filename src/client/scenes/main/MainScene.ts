import { GameObjects, Scene } from "phaser";
import { CHESS_POSITION_MAP, CONSTANT } from "../../constants";
import { DataChange } from "@colyseus/schema";
import { GameState } from "../../states/GameState";
import { Client, Room } from "colyseus.js";
import { Player } from "../../states/Player";
import { MainControler } from "./MainControler";
import { MapPosition } from "./type";

export class MainScene extends Scene {
  controler: MainControler
  private chessGroups: GameObjects.Shape[][] = []

  constructor() {
    super('main')
    this.controler = new MainControler(this)
  }

  async preload() {
    this.load.image('img-bg-ludo', 'src/client/assets/bg-ludo-map.png')
    await this.controler.onPreload()
  }

  async create() {
    this.add.image(Number(this.game.config.width) / 2, Number(this.game.config.height) / 2, 'img-bg-ludo')
  }

  addChessGroup() {
    const player = this.chessGroups.length
    this.chessGroups.push([0, 0, 0, 0].map(position => {
      return this.add.circle(...this.getPosition(position), CONSTANT.chessRaius, CONSTANT.playerColors[player])
    }))
  }

  move(playerIndex: number, chessIndex: number, position: number, prePosition: number) {
    this.chessGroups[playerIndex][chessIndex].setPosition(...this.getPosition(position))
  }

  /// 根据position返回在界面上 x y 坐标，一个数组，方便函数调用的解构使用
  getPosition(position: number): number[] {
    const p2d = {x: CHESS_POSITION_MAP[position][0], y: CHESS_POSITION_MAP[position][1]}
    return [(p2d.x+0.5)*CONSTANT.cellWidth, (p2d.y+0.5)*CONSTANT.cellWidth]
  }

  addChessTo(player: number, position: number): boolean {
    if(position >= 1 && position <= 52) {
      const p2d = {x: CHESS_POSITION_MAP[position][0], y: CHESS_POSITION_MAP[position][1]}
      this.add.circle((p2d.x+0.5)*CONSTANT.cellWidth, (p2d.y+0.5)*CONSTANT.cellWidth, CONSTANT.chessRaius, CONSTANT.playerColors[player])
      return true
    }
    return false
  }
}