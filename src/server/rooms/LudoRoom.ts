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
      this.state.players[client.sessionId].position = message.position
    })
  }

  // client joined: bring your own logic
  async onJoin(client, options) { 
    console.log('onJoin', client, options);
    this.state.players[client.sessionId] = new Player(client.sessionId)
  }
 
  // client left: bring your own logic
  async onLeave(client, consented) { 
    console.log('onLeave', client, consented);
    this.state.players.delete(client.sessionId)
  }

  // room has been disposed: bring your own logic
  async onDispose() { 
    console.log('onDispose');
    
  }
}