import { Scene } from "phaser";
import { CHESS_POSITION_MAP, CONSTANT } from "../../constants";
import { DataChange } from "@colyseus/schema";
import { GameState } from "../../states/GameState";
import { Client, Room } from "colyseus.js";
import { Player } from "../../states/Player";

export class MainScene extends Scene {
  private client: Client
  private room: Room
  private get state(): GameState {
    return this.room.state
  }
  private get me(): Player {
    return this.state.players.find(e => e.id == this.room.sessionId)
  }

  constructor() {
    super('main')
  }

  async connect() {
    try {
      this.room = await this.client.joinOrCreate<GameState>("ludo");

      console.log(this.state.players);
      
      this.room.state.players.onAdd = (player, playerIndex) => {
        player.position.onAdd = (position, index) => {
          position.listen('pos', (v, p) => {
            console.log(`position change`, v, p);
            this.addChessTo(playerIndex, v)
          })
        }
      }

      this.room.onStateChange((newState) => {
        console.log("New state:", newState);
      });

      this.room.onLeave((code) => {
        console.log("You've been disconnected.");
      });

      this.room.onMessage('broadcast', (message) => {
        console.log(`i save broadcast `, message);
      })
    } catch (e) {
      console.error("Couldn't connect:", e);
    }
  }

  async preload() {
    this.load.image('img-bg-ludo', 'src/client/assets/bg-ludo-map.png')
    this.client = new Client("ws://localhost:8080");
    await this.connect()
  }

  create() {
    this.add.image(Number(this.game.config.width) / 2, Number(this.game.config.height) / 2, 'img-bg-ludo')
  }

  move(chess: number, step: number) {
    console.log(this.state.players);
    
    this.room.send('move', {chess: chess, position: this.me.position[chess].pos + step})
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