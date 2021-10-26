import { Room } from "@colyseus/core";
import { registerType } from "@colyseus/schema";
import { number } from "@colyseus/schema/lib/encoding/decode";
import { LudoConstant } from "../constants";
import { GameState } from "../states/GameState";
import { Player } from "../states/player";

export class LudoRoom extends Room<GameState, any> {
  
  maxClients = LudoConstant.maxClient

  // room has been created: bring your own logic
  async onCreate(options) {
    this.setState(new GameState())
    this.onMessage('move', (client, message) => {
      for (const player of this.state.players) {
        if(player.id == client.sessionId) {
          player.position[message.chess].pos = message.position
        }
      }
    })
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