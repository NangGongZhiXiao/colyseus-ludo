import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./player";

export class GameState extends Schema {
  @type({array: Player})
  players: Player[] = [new Player(''),new Player(''),new Player(''),new Player('')]
}