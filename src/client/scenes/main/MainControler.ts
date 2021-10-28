import { Client } from "colyseus.js";
import { Room } from "colyseus.js";
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
        player.position.onAdd = (position, index) => {
          position.listen('pos', (v, p) => {
            this.scene.move(playerIndex, index, v, p)
            console.log(`用户${playerIndex}的棋子${index}移动${v}`);
          })
        }
      }
      this.room.state.listen('round', v => {
        if(this.index == v) {
          console.log("开始到我掷骰子了", this.index, this.me.toJSON());
          this.scene.waitingRoll(this.roll)
        }
      })
      this.room.state.listen('roundState', v => {
        if(v == RoundState.SELECT_CHESS && this.index == this.room.state.round) {
          console.log("回合状态发生变化，开始掷骰子")
          this.scene.waitingSelectChess()
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
    this.room.send('move', {chess: chess, position: this.me.position[chess].pos + step})
  }

  selectChess(chess: number) {
    this.room.send('selectChess', {chess: chess})
  }

  // 投掷骰子
  roll() {
    if(this.state.roundState == RoundState.WAITING_ROLL && this.state.round == this.index) {
      console.log('开始投掷骰子，后台计算出骰子的值');
      this.room.send('roll')
    }
  }
}