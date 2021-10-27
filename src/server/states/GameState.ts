import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./player";
import { RoundState } from "./RoundState";

export class GameState extends Schema {
  @type({array: Player})
  players: Player[] = [new Player(''),new Player(''),new Player(''),new Player('')]

  /**
   * 当前是谁的回合，对应 players 的下标
   */
  @type('number')
  round: number = 0

  /**
   * 当前回合的状态
   */
  @type('number')
  roundState: RoundState = RoundState.WAITING

  /**
   * 当前骰子的点数，因为可以掷多次（当掷到6时）
   */
  @type({array: 'number'})
  diceValues: number[] = []
}