import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./player";

export class GameState extends Schema {
  @type({map: Player})
  players: MapSchema<Player> = new MapSchema<Player>()
}