import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("string")
  id: string = ''

  @type("number")
  position: number = 0

  constructor(id: string) {
    super();
    this.id = id
  }
}