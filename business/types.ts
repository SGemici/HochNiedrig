export enum PlayerAction {
  CHOOSE_EQUAL,
  CHOOSE_LOWER,
  CHOOSE_HIGHER,
  CHOOSE_RED,
  CHOOSE_BLACK,
}

export type Player = {
  name: string;
  index: number;
  statisticDrinkNumber: number;
};
