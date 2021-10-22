
import { DataChange } from "@colyseus/schema";
import { Room, Client } from "colyseus.js";
import { GameState } from "./states/GameState";

const client = new Client("ws://localhost:8080");

async function connect() {
  try {
    const room = await client.joinOrCreate<GameState>("ludo");

    window['dice'] = () => {
      room.send('move', {position: room.state.players[room.sessionId].position + Math.floor(Math.random()*6 + 1)}) 
    }
    
    room.state.players.onAdd = (player, sessionid) => {
      console.log(`wellcom ${sessionid} coming`);

      player.listen('position', (v, p) => {
        console.log(`${sessionid} go to ${v}`);
        window.document.getElementsByTagName("li")[p || 0].style.backgroundColor = 'transparent'
        window.document.getElementsByTagName("li")[v].style.backgroundColor = 'red'
      })
    }

    room.onStateChange((newState) => {
      console.log("New state:", newState);
    });

    room.onLeave((code) => {
      console.log("You've been disconnected.");
    });

    room.onMessage('broadcast', (message) => {
      console.log(`i save broadcast `, message);
    })

    setTimeout(() => {
      room.send('move', {position: 5})
    }, 1000);

  } catch (e) {
    console.error("Couldn't connect:", e);
  }
}

connect()
