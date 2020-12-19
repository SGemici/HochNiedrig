export enum PlayerAction {
  CHOOSE_EQUAL,
  CHOOSE_LOWER,
  CHOOSE_HIGHER,
}

export type Player = {
  name: string;
  index: number;
  statisticDrinkNumber: number;
};
