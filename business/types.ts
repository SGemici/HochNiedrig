export enum PlayerAction {
  CHOOSE_EQUAL,
  CHOOSE_LOWER,
  CHOOSE_HIGHER,
  CHOOSE_RED,
  CHOOSE_BLACK,
}

export enum PlayerActionResult {
  INCORRECT,
  CORRECT,
}

export type Player = {
  name: string;
  statisticDrinkNumber: number;
};

