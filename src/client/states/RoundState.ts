export enum RoundState {
  WAITING, // 等待
  WAITING_ROLL, // 等待玩家掷骰子
  ROLL, // 骰子正在转
  SELECT_CHESS, // 玩家正在选择棋子
}