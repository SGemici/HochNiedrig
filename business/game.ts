import { Player, PlayerAction, PlayerActionResult } from "./types";
import { Card, cards as ALL_CARDS, cardType } from "./cards";

function getPlayer(name: string, statisticDrinkNumber: number): Player {
  return {
    name: name,
    statisticDrinkNumber: statisticDrinkNumber,
  };
}

export class Game {
  readonly players: Player[];
  private cards: Card[];

  activePlayer: Player;
  firstPlayer: Player;
  secondPlayer: Player;
  activeCard: Card;
  previousCard: Card;
  cardIndex = 0;

  constructor() {
    this.cards = this.shuffle(ALL_CARDS);
    // this.cards = [ALL_CARDS[1], ALL_CARDS[4], ALL_CARDS[8]];
    this.players = [getPlayer("Player ONE", 0), getPlayer("Player TWO", 0)];
    this.activePlayer = this.players[0];
    this.firstPlayer = this.players[0];
    this.secondPlayer = this.players[1];
    this.activeCard = this.cards[0];
    this.previousCard = this.cards[0];
  }

  shuffle(source: Array<Card>) {
    let list = [...source];
    let ctr = list.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = list[ctr];
      list[ctr] = list[index];
      list[index] = temp;
    }
    return list;
  }

  checkAction(action: PlayerAction) {
    if (
      action == PlayerAction.CHOOSE_EQUAL &&
      this.activeCard.rang == this.previousCard.rang
    ) {
      return PlayerActionResult.CORRECT;
    } else if (
      action == PlayerAction.CHOOSE_LOWER &&
      this.activeCard.rang < this.previousCard.rang
    ) {
      return PlayerActionResult.CORRECT;
    } else if (
      action == PlayerAction.CHOOSE_HIGHER &&
      this.activeCard.rang > this.previousCard.rang
    ) {
      return PlayerActionResult.CORRECT;
    } else if (
      action == PlayerAction.CHOOSE_RED &&
      this.activeCard.type == cardType.red
    ) {
      return PlayerActionResult.CORRECT;
    } else if (
      action == PlayerAction.CHOOSE_BLACK &&
      this.activeCard.type == cardType.black
    ) {
      return PlayerActionResult.CORRECT;
    }
    return PlayerActionResult.INCORRECT;
  }

  getNextPlayer() {
    if (this.activePlayer === this.firstPlayer) {
      return this.secondPlayer;
    } else {
      return this.firstPlayer;
    }
  }

  applyAction(action: PlayerAction): PlayerActionResult {
    this.cardIndex++;
    this.activeCard = this.cards[this.cardIndex];
    this.previousCard = this.cards[this.cardIndex - 1];

    const result = this.checkAction(action);
    if (result === PlayerActionResult.INCORRECT) {
      this.activePlayer.statisticDrinkNumber++;
    }

    this.activePlayer = this.getNextPlayer();

    return result;
  }

  isOver() {
    return this.cardIndex === this.cards.length - 1;
  }
}
