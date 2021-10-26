import { Schema, type } from "@colyseus/schema";
import { Position } from "./Position";

export class Player extends Schema {
  @type("string")
  id: string = ''

  @type({array: Position})
  position: Position[] = [new Position(),new Position(),new Position(),new Position()]

  constructor(id: string) {
    super();
    this.id = id
  }
}