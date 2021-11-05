import { GameObjects, Scene, Tweens } from "phaser";
import { CHESS_POSITION_MAP, CONSTANT } from "../../constants";
import { DataChange } from "@colyseus/schema";
import { Client, Room } from "colyseus.js";
import { Player } from "../../states/Player";
import { MainControler } from "./MainControler";
import { MapPosition } from "./type";
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import { debounce } from "underscore";

export class MainScene extends Scene {
  controler: MainControler
  private chessGroups: GameObjects.Shape[][] = []
  private dice: GameObjects.Text
  private diceRotationTween: Tweens.Tween
  private rexGestures: GesturesPlugin

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
    this.chessGroups.push([0, 1, 2, 3].map(chess => {
      return this.add.circle(...this.getBoardCordination(player, chess), CONSTANT.chessRaius, CONSTANT.playerColors[player])
    }))
  }

  move(playerIndex: number, chessIndex: number, positions: number[], count: number) {
    this.tweens.timeline({
      targets: [this.chessGroups[playerIndex][chessIndex]],
      duration: 200,  
      tweens: new Array(count).fill(0).map((_,i)=>{
          const [x, y] = this.getCoordination(positions[i]) || [this.chessGroups[playerIndex][chessIndex].x, this.chessGroups[playerIndex][chessIndex].y]
          return {x, y, delay: 100}
        }),
    })
  }

  /// 根据position返回在界面上 x y 坐标，一个数组，方便函数调用的解构使用
  getCoordination(position: number): number[] {
    if((position || 0) <= 0) return null
    const p2d = {x: CHESS_POSITION_MAP[position][0], y: CHESS_POSITION_MAP[position][1]}
    return [(p2d.x+0.5)*CONSTANT.cellWidth, (p2d.y+0.5)*CONSTANT.cellWidth]
  }

  /// 开始位置的坐标
  getBoardCordination(playerIndex: number, chess: number) {
    const map = CONSTANT.playerBoardsPositionMap[playerIndex][chess]
    const p2d = {x: map[0], y: map[1]}
    return [p2d.x*CONSTANT.cellWidth, p2d.y*CONSTANT.cellWidth]
  }

  /// 准备掷骰子
  waitingRoll(roll: Function) {
    if(this.dice == null) {
      this.dice = this.add.text(CONSTANT.width / 2, CONSTANT.height / 2, '🎲', {fontSize: '80px'})
        .setOrigin(0.5, 0.5)
      this.diceRotationTween = this.tweens.add({
        targets: [this.dice],
        duration: 200,
        loop: -1,
        rotation: 2 * Math.PI
      })
      this.diceRotationTween.stop()
      this.input.on('gameobjectdown', function(){ console.log(arguments)})
      this.rexGestures.add.tap(this.dice).on('tap', debounce(() => {
        this.diceRotationTween.restart()
        roll()
      }, 500))
    }
  }

  /**
   * 选择移动的棋子
   */
  waitingSelectChess() {
    this.diceRotationTween.stop()
    while(!this.controler.selectChess(parseInt(prompt("选择棋子")))){}
  }

  addChessTo(player: number, position: number): boolean {
    if(position >= 1 && position <= 52) {
      const p2d = {x: CHESS_POSITION_MAP[position][0], y: CHESS_POSITION_MAP[position][1]}
      this.add.circle((p2d.x+0.5)*CONSTANT.cellWidth, (p2d.y+0.5)*CONSTANT.cellWidth, CONSTANT.chessRaius, CONSTANT.playerColors[player])
      return true
    }
    return false
  }

  stopRoll() {
    this.diceRotationTween.stop()
  }
}