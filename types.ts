export enum CellType {
  WALL,
  PATH,
  CAKE,
  BROCCOLI,
  SAFE,
  SAFE_OPEN,
  CARROT,
}

export enum GameStatus {
  START,
  PLAYING,
  WON,
  LOST,
}

export interface Position {
  x: number;
  y: number;
}
