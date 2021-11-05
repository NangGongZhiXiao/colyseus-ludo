import { Schema, type } from "@colyseus/schema";

export class Chess extends Schema {
  @type('number')
  pos: number = 0

  @type('boolean')
  isFinal: boolean = false

  private finalPosition: number = 0

  setPosition(pos: number) {
    this.pos = pos
    this.isFinal = pos == this.finalPosition
  }

  constructor(pos: number, finalPosition: number) {
    super()
    this.pos = pos
    this.finalPosition = finalPosition
  }
}