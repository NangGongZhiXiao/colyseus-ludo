import { Client } from "colyseus.js";
import { Room } from "colyseus.js";
import { CONSTANT } from "../../constants";
import { DevConfig } from "../../DevConfig";
import { GameState } from "../../states/GameState";
import { Player } from "../../states/Player";
import { RoundState } from "../../states/RoundState";
import { MainScene } from "./MainScene";

export class MainControler {
  private scene: MainScene
  private client: Client
  room: Room<GameState>
  private get state(): GameState {
    return this.room.state
  }
  private get me(): Player {
    return this.state.players.find(e => e.id == this.room.sessionId)
  }
  private get index(): number {
    return this.state.players.findIndex(e => e.id == this.room.sessionId)
  }
  constructor(scene: MainScene) {
    this.scene = scene
  }

  async connect() {
    try {
      this.room = await this.client.joinOrCreate<GameState>("ludo");

      console.log(this.state.players);
      
      this.room.state.players.onAdd = (player, playerIndex) => {
        this.scene.addChessGroup()
        player.chess.onAdd = (chess, index) => {
          chess.listen('pos', (v, p) => {
            this.scene.move(playerIndex, index, player.lastRoad.map(i=>i), player.lastRoad.length)
            console.log(`用户${playerIndex}的棋子${index}移动到${v}`);
          })
        }
      }
      this.room.state.listen('round', v => {
        if(this.index == v) {
          console.log("开始到我掷骰子了", this.index, this.me.toJSON());
          DevConfig.autoRoll ? setTimeout(() => this.roll(), 1000) : this.scene.waitingRoll(this.roll.bind(this))
        }
      })
      this.room.state.listen('roundState', v => {
        if(v == RoundState.SELECT_CHESS && this.index == this.room.state.round) {
          console.log("开始选择棋子")
          DevConfig.autoSelectChess >= 0 
            ? this.selectChess(DevConfig.autoSelectChess) 
            : this.scene.waitingSelectChess()
        } else if (v != RoundState.ROLL) {
          this.scene.stopRoll()
        }
      })
      this.room.state.listen('diceValues', (v) => {
        console.log("获取到后台掷骰子值为", v.join())
      })

      this.room.onStateChange((newState) => {
        console.log("New state:", newState.toJSON());
      });

      this.room.onLeave((code) => {
        console.log("You've been disconnected.");
      });

      this.room.onMessage('broadcast', (message) => {
        console.log(`i receive broadcast `, message);
      })
    } catch (e) {
      console.error("Couldn't connect:", e);
    }
  }

  async onPreload() {
    this.client = new Client("ws://localhost:8080");
    await this.connect()
  }

  move(chess: number, step: number) {
    this.room.send('move', {chess: chess, position: this.me.chess[chess].pos + step})
  }

  selectChess(chess: number): boolean {
    if(this.me.chess[chess].isFinal) return false
    if(this.me.chess[chess].pos <= 0 && this.state.diceValues[0] != CONSTANT.diceMaxValue) return false
    this.room.send('selectChess', {chess: chess})
    return true
  }

  // 投掷骰子
  roll() {
    if(this.state.roundState == RoundState.WAITING_ROLL && this.state.round == this.index) {
      console.log('开始投掷骰子，后台计算出骰子的值');
      this.room.send('roll')
    }
  }
}