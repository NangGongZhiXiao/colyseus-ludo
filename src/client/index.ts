
import {MainScene} from './scenes/main/MainScene'
import { initGameHelp } from "./GameHelper";

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