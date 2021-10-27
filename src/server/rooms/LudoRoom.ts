import { Room } from "@colyseus/core";
import { registerType } from "@colyseus/schema";
import { number } from "@colyseus/schema/lib/encoding/decode";
import { LudoConstant } from "../constants";
import { GameState } from "../states/GameState";
import { Player } from "../states/player";
import { RoundState } from "../states/RoundState";

export class LudoRoom extends Room<GameState, any> {
  
  maxClients = LudoConstant.maxClient
  
  findPlayer(id: string): Player {
    return this.state.players.find(e => e.id == id)!
  }

  findPlayerIndex(id: String): number {
    return this.state.players.findIndex(e => e.id == id)
  }

  startRoll(playerIndex: number) {
    this.state.round = playerIndex
    this.state.roundState = RoundState.WAITING_ROLL
  }

  /**
   * 找到下一个有玩家的位置
   */
  nextPlayerStart() {
    let i = (this.state.round + 1) % LudoConstant.maxClient
    while(!this.state.players[i].id) {
      i = (i + 1) % LudoConstant.maxClient
    }
    this.startRoll(i)
  }

  // room has been created: bring your own logic
  async onCreate(options) {
    this.setState(new GameState())
    this.onMessage('move', (client, message) => {
      this.findPlayer(client.sessionId).position = message.position
    })
    this.onMessage('roll', client => {
      if(this.findPlayerIndex(client.sessionId) != this.state.round) return
      this.state.roundState = RoundState.ROLL
      const values: number[] = []
      while((values[values.length - 1] || LudoConstant.diceMaxValue) == LudoConstant.diceMaxValue) {
        values.push(Math.ceil(Math.random() * LudoConstant.diceMaxValue))
      }
      this.clock.setTimeout(() => {
        this.state.roundState = RoundState.SELECT_CHESS
        this.state.diceValues = values
      }, LudoConstant.rollTime)
    })
    this.onMessage('selectChess', (client, message) => {
      const p = this.findPlayer(client.sessionId)
      p.position[message.chess].pos = p.position[message.chess].pos + this.state.diceValues.reduce((c,p)=> c+p, 0)
      this.state.roundState = RoundState.WAITING_ROLL
      this.nextPlayerStart()
    })

    this.clock.setTimeout(() => {
      this.broadcast('broadcast', '现在开始游戏')
      this.startRoll(0)
    }, 1000)
  }

  // client joined: bring your own logic
  async onJoin(client, options) { 
    console.log('onJoin', client, options);
    for (const player of this.state.players) {
      if(!player.id) {
        player.id = client.sessionId
        return
      }
    }
  }
 
  // client left: bring your own logic
  async onLeave(client, consented) { 
    console.log('onLeave', client, consented);
    for (const player of this.state.players) {
      if(player.id == client.sessionId) {
        player.id = ''
        return
      }
    }
  }

  // room has been disposed: bring your own logic
  async onDispose() { 
    console.log('onDispose');
    
  }
}