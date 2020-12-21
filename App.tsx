import React from "react";
import {
  Button,
  ColorPropType,
  DevSettings,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cardProperties, cards } from "./business/cards";
import { Player, PlayerAction } from "./business/types";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerStatistics } from "./components/PlayerStatistics";
import { TableModul } from "./components/Table";

function getPlayer(
  name: string,
  index: number,
  statisticDrinkNumber: number
): Player {
  return {
    name: name,
    index: index,
    statisticDrinkNumber: statisticDrinkNumber,
  };
}

const players = [getPlayer("clb", 0, 0), getPlayer("sgm", 1, 0)];
var shuffleCards = cards;
export default class App extends React.Component {
  state = {
    game: false,
    activePlayer: players[0],
    activeCard: shuffleCards[0],
    previousCard: shuffleCards[0],
    cardIndex: 0,
  };

  //#region Start Game
  resetStates() {
    shuffleCards = this.shuffle(cards);
    this.setState({
      game: false,
      activePlayer: players[0],
      activeCard: shuffleCards[0],
      previousCard: shuffleCards[0],
      cardIndex: 0,
    });
  }
  resetStatistics() {
    var i;
    for (i = 0; i < players.length; i++) {
      players[i].statisticDrinkNumber = 0;
    }
  }

  startGame() {
    this.resetStates();
    console.log("Start GAME =  First Card: ", shuffleCards[0].name);
    this.setState({ game: true });
  }
  //#endregion

  //#region Card Actions
  shuffle(arra1: Array<cardProperties>) {
    var ctr = arra1.length,
      temp,
      index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
  //#endregion

  //#region Nächster Player
  getNextPlayer() {
    const currentPlayerIndex = this.state.activePlayer.index;
    const maxLength = players.length - 1;
    if (maxLength == currentPlayerIndex) {
      return players[0];
    } else {
      return players[currentPlayerIndex + 1];
    }
  }
  //#endregion

  checkCards(
    action: PlayerAction,
    cardA: cardProperties,
    cardB: cardProperties
  ) {
    // Wertzuweisung
    let CorrectAction = false;
    // Richtige Operationen
    if (
      // ( ACTION = CHOOSE_EQUAL ) && ( PreviousCard ==  activeCard )
      action == PlayerAction.CHOOSE_EQUAL &&
      cardB.rang == cardA.rang
    ) {
      CorrectAction = true;
    } else if (
      // ( ACTION = CHOOSE_LOWER ) && ( PreviousCard > activeCard )
      action == PlayerAction.CHOOSE_LOWER &&
      cardB.rang < cardA.rang
    ) {
      CorrectAction = true;
    } else if (
      // ( ACTION = CHOOSE_HIGHER ) && ( PreviousCard <  activeCard )
      action == PlayerAction.CHOOSE_HIGHER &&
      cardB.rang > cardA.rang
    ) {
      CorrectAction = true;
    }

    // -----------
    // Ausgabe wenn die Operation falsch war
    console.log(
      "Action from player: ",
      CorrectAction,
      " = PreviousCard: ",
      cardA.name,
      " - ActiveCard: ",
      cardB.name
    );
    return CorrectAction;
    // -----------
  }

  onPlayerAction(action: PlayerAction, player: Player) {
    console.log("-------------------");
    console.log("Start Action");

    console.log(
      `Player: ${player.name} pressed Action: ` + PlayerAction[action]
    ); // ${action});

    const previousCard = shuffleCards[this.state.cardIndex];
    const activeCard = shuffleCards[this.state.cardIndex + 1];
    const cardIndex = this.state.cardIndex + 1;
    const currentPlayer = this.state.activePlayer;
    const activePlayer = this.getNextPlayer();

    this.setState({
      previousCard,
      cardIndex,
      activeCard,
      activePlayer,
    });

    if (!this.checkCards(action, previousCard, activeCard)) {
      alert("falsch");
      currentPlayer.statisticDrinkNumber =
        currentPlayer.statisticDrinkNumber + 1;
    }
    if (cardIndex == shuffleCards.length - 1) {
      alert("Ende");
      this.resetStatistics();
      this.resetStates();
    }
    console.log("End Action");
    console.log("-------------------");
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerControls
          inverseOrder={false}
          transformRotateZ={"180deg"}
          gameState={this.state.game}
          handlePlayerAction={(action) =>
            this.onPlayerAction(action, players[1])
          }
          activePlayer={players[1]}
          ownerPlayerOfTheControl={this.state.activePlayer}
        />

        <PlayerStatistics
          transformRotateZ={"180deg"}
          GameState={this.state.game}
          Player={players[1]}
        />

        <TableModul
          game={this.state.game}
          handleCardClicked={() => this.startGame()}
          card={this.state.activeCard.image}
        />

        <PlayerStatistics
          transformRotateZ={"0deg"}
          GameState={this.state.game}
          Player={players[0]}
        />

        <PlayerControls
          inverseOrder={false}
          transformRotateZ={"0deg"}
          gameState={this.state.game}
          handlePlayerAction={(action) =>
            this.onPlayerAction(action, players[0])
          }
          activePlayer={players[0]}
          ownerPlayerOfTheControl={this.state.activePlayer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    padding: 30,
    flexDirection: "column",
    //borderColor: 'red',
    //borderWidth: 2
  },
});
