import { Game } from "phaser";
import { DevConfig } from "./DevConfig";
import { MainScene } from "./scenes/main/MainScene";

export function initGameHelp(game: Game) {
  window['gameHelper'] = {
    addChess(player: number, position: number) {
      (game.scene.getScene('main') as MainScene).addChessTo(player, position)
    },
    move(chess: number, step: number) {
      (game.scene.getScene('main') as MainScene).controler.move(chess, step)
    },
    roll() {
      (game.scene.getScene('main') as MainScene).controler.roll()
    },
    autoSelectChess(chess: number) {
      DevConfig.autoSelectChess = chess
    },
    autoPlay(chess: number) {
      DevConfig.autoRoll = true
      DevConfig.autoSelectChess = chess
    }
  }
}