// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.28
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Position } from './Position'

export class Player extends Schema {
    @type("string") public id!: string;
    @type([ Position ]) public position: ArraySchema<Position> = new ArraySchema<Position>();
}
