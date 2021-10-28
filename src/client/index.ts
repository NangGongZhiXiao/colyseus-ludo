
import {MainScene} from './scenes/main/MainScene'
import { initGameHelp } from "./GameHelper";
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';

const game = new Phaser.Game({
  width: 560,
  height: 560,
  type: Phaser.CANVAS,
  parent: "ludo",
  scene: [MainScene],
  plugins: {
    scene: [
      {
        key: 'rexGestures',
        plugin: GesturesPlugin,
        mapping: 'rexGestures'
      }
    ]
  }
})

game.scene.start('main')

initGameHelp(game)

export default game