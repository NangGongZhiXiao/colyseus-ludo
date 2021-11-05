// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.28
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Chess } from './Chess'

export class Player extends Schema {
    @type("string") public id!: string;
    @type([ Chess ]) public chess: ArraySchema<Chess> = new ArraySchema<Chess>();
    @type([ "number" ]) public lastRoad: ArraySchema<number> = new ArraySchema<number>();
}
