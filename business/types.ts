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


export enum GameView {
  MAIN_VIEW,
  SETTINGS_VIEW,
  GAME_INSTRUCTIONS_VIEW,
  ONE_PLAYER_VIEW,
  TWO_PLAYER_VIEW,
  THREE_PLAYER_VIEW,
  FOUR_PLAYER_VIEW,
}
