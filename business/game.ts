import { Player, PlayerAction, PlayerActionResult } from "./types";
import { Card, cards, cardType } from "./cards";

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
    this.players = [getPlayer("Player ONE", 0), getPlayer("Player TWO", 0)];
    this.activePlayer = this.players[0];
    this.firstPlayer = this.players[0];
    this.secondPlayer = this.players[1];
    this.activeCard = cards[0];
    this.previousCard = cards[0];
    this.cards = this.shuffle(cards);
  }

  shuffle(arra1: Array<Card>) {
    var ctr = arra1.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
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
    this.activeCard = cards[this.cardIndex];
    this.previousCard = cards[this.cardIndex - 1];

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
