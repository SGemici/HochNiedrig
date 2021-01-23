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
  activeCard: Card;
  previousCard: Card;
  cardIndex = 0;

  constructor(numberOfPlayers: number) {
    this.cards = this.shuffle(ALL_CARDS);
    //this.cards = [ALL_CARDS[1], ALL_CARDS[4], ALL_CARDS[8], ALL_CARDS[8], ALL_CARDS[8]];
    this.players = Array.from({ length: numberOfPlayers }, (_, i) =>
      getPlayer(`Player ${i + 1}`, 0)
    );
    this.activePlayer = this.players[0];
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
    let result;
    switch(action) {
      case PlayerAction.CHOOSE_EQUAL:
        result = this.activeCard.rang == this.previousCard.rang;
        break;
      case PlayerAction.CHOOSE_LOWER:
        result = this.activeCard.rang < this.previousCard.rang;
        break;
      case PlayerAction.CHOOSE_HIGHER:
        result = this.activeCard.rang > this.previousCard.rang;
        break;
      case PlayerAction.CHOOSE_BLACK:
        result = this.activeCard.type == cardType.black;
        break;
      case PlayerAction.CHOOSE_RED:
        result = this.activeCard.type == cardType.red;
        break;
      default:
        result = false;
    }
    return result ? PlayerActionResult.CORRECT : PlayerActionResult.INCORRECT;
  }

  getNextPlayer() {
    console.log("players", this.players.length);
    const activePlayerIndex = this.players.findIndex(
      (player: Player) => {
        console.log(player.name, this.activePlayer.name);
        return player.name === this.activePlayer.name;
      }
    );

    if (!activePlayerIndex && activePlayerIndex !== 0) {
      throw new Error("Unexpected state: player not found!");
    }

    let nextPlayerIndex = activePlayerIndex + 1;
    console.log({nextPlayerIndex})

    if (nextPlayerIndex >= this.players.length) {
      nextPlayerIndex = 0;
    }

    const nextPlayer = this.players[nextPlayerIndex];
    console.log({nextPlayer})

    return nextPlayer;
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

    console.log(JSON.stringify(this.getGameStatistics(), null, 4));

    return result;
  }

  isOver() {
    return this.cardIndex === this.cards.length - 1;
  }

  getGameStatistics() {
    return this.players.map((player) => {
      return {
        playerName: player.name,
        numberOfdrinks: player.statisticDrinkNumber
      }
    })
  }
}
