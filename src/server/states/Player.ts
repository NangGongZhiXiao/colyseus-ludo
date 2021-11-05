import { Schema, type } from "@colyseus/schema";
import { LudoConstant } from "../constants";
import { Chess } from "./Chess";
import { RoadNode } from "./RoadNode";

export class Player extends Schema {
  @type("string")
  id: string = ''

  @type({array: Chess})
  chess: Chess[] = []

  /**
   * 上一次的走的路线
   */
  @type({array: 'number'})
  lastRoad: number[] = []

  private positionNode: RoadNode[]

  /**
   * 玩家路线图链表
   */
  private lineLinked: RoadNode

  step(chess: number, step: number) {
    const road: number[] = []
    for(let i = 0; i < step; i++) {
      this.positionNode[chess] = this.positionNode[chess].next!
      road.push(this.positionNode[chess].position)
    }
    // 把朝向转回来
    if(this.positionNode[chess].isReverse) {
      let p: RoadNode = this.positionNode[chess].next!
      while(p.position != this.positionNode[chess].position) {
        p = p.next
      }
      this.positionNode[chess] = p
    }
    this.lastRoad = road
    this.chess[chess].setPosition(this.positionNode[chess].position)
  }

  constructor(id: string, lineMap: number[]) {
    super()
    const finalPosition = lineMap[lineMap.length-1]
    this.id = id
    this.chess = [new Chess(-1, finalPosition), new Chess(-1, finalPosition), new Chess(-1, finalPosition), new Chess(-1, finalPosition)]
    this.lineLinked = new RoadNode(0, undefined)
    this.positionNode = [this.lineLinked, this.lineLinked, this.lineLinked, this.lineLinked]
    let p: RoadNode = this.lineLinked
    let flag: RoadNode | undefined = undefined
    lineMap.concat().forEach((i, index)=>{
      p.next = new RoadNode(i, undefined)
      p = p.next
      if(index == LudoConstant.circumference) {
        flag = p
      }
    })
    lineMap.slice(lineMap.length - 5, lineMap.length - 1).reverse().forEach((i, index)=>{
      p.next = new RoadNode(i, undefined)
      p.isReverse = true
      p = p.next
    })
    p.next = flag
  }
}