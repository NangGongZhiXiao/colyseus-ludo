
import Phaser, { Scene } from 'phaser'
import { constants } from './constants'
import { helper } from './game-help'

const game = new Phaser.Game({
  width: 560,
  height: 560,
  type: Phaser.CANVAS,
  parent: "ludo"
})

game.scene.add('main', {
  preload: function() {
    this.load.image('img-bg-ludo', 'src/client/assets/bg-ludo-map.png')
  },
  create: function() {
    this.add.image(constants.width / 2, constants.height / 2, 'img-bg-ludo')
  }
})

export default game