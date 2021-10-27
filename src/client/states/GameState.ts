// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.28
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Player } from './Player'

export class GameState extends Schema {
    @type([ Player ]) public players: ArraySchema<Player> = new ArraySchema<Player>();
    @type("number") public round!: number;
    @type("number") public roundState!: number;
    @type([ "number" ]) public diceValues: ArraySchema<number> = new ArraySchema<number>();
}
