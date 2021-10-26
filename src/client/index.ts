
import { Room, Client } from "colyseus.js";
import { GameState } from "./states/GameState";
import {MainScene} from './scenes/main/main-scene'
import { initGameHelp } from "./game-help";

const game = new Phaser.Game({
  width: 560,
  height: 560,
  type: Phaser.CANVAS,
  parent: "ludo",
  scene: [MainScene]
})

game.scene.start('main')

initGameHelp(game)

export default game