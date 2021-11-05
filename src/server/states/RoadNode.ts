export class RoadNode {
  position: number
  next: RoadNode | undefined

  // 是否反向部分
  isReverse: boolean = false

  constructor(position: number, next: RoadNode | undefined) {
    this.position = position
    this.next = next
  }
}