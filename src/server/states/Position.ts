import { Schema, type } from "@colyseus/schema";

export class Position extends Schema {
  @type('number')
  pos: number = 0
}