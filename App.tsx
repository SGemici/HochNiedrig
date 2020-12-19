import React from "react";
import {
  Button,
  ColorPropType,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cards } from "./business/cards";
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
let shuffleCards = cards;
export default class App extends React.Component {
  state = {
    game: false,
    activePlayer: players[0],
    activeCard: this.getFirstCard(),
    PreviousCard: 0,
    cardIndex: 1,
  };

  resetStates() {
    this.setState({
      game: false,
      activePlayer: players[0],
      activeCard: this.getFirstCard(),
      PreviousCard: 0,
      cardIndex: 1,
    });
  }
  resetStatistics() {
    var i;
    for (i = 0; i < players.length; i++) {
      players[i].statisticDrinkNumber = 0;
    }
  }

  startGame() {
    //this.setState({ game: !this.state.game })
    this.setState({ game: true });
  }

  shuffle(arra1: Array<ImageSourcePropType>) {
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

  getFirstCard() {
    shuffleCards = this.shuffle(cards);
    return cards[0];
  }
  getRandomCard() {
    // const i = Math.floor(Math.random() * cards.length);
    // return cards[i];
    console.log("Cardindex: " + this.state.cardIndex);
    return shuffleCards[this.state.cardIndex];
  }

  nextPlayer() {
    const currentPlayerIndex = this.state.activePlayer.index;
    const maxLength = players.length - 1;
    if (maxLength == currentPlayerIndex) {
      this.setState({ activePlayer: players[0] });
    } else {
      this.setState({ activePlayer: players[currentPlayerIndex + 1] });
    }
  }

  checkPlayerAction(action: PlayerAction) {
    // Wertzuweisung
    console.log("Prüfung:");
    // Richtige Operationen
    // ( ACTION = CHOOSE_EQUAL ) && ( PreviousCard ==  activeCard )
    // ( ACTION = CHOOSE_LOWER ) && ( PreviousCard > activeCard )
    // ( ACTION = CHOOSE_HIGHER ) && ( PreviousCard <  activeCard )
    // -----------
    // Ausgabe wenn die Operation falsch war

    return false;
    // -----------
  }

  nextCard() {
    const newCardIndex = this.state.cardIndex + 1;
    this.setState({
      cardIndex: newCardIndex,
      activeCard: this.getRandomCard(),
    });
    this.nextPlayer();
  }

  onPlayerAction(action: PlayerAction, player: Player) {
    console.log("Start Action");

    const message = `Player: ${player.name} pressed action ${action}`;
    console.log(message);
    this.setState({ PreviousCard: this.state.activeCard });
    console.log("Alte Karte: " + this.state.PreviousCard);
    this.nextCard();
    console.log("Neue Karte: " + this.state.activeCard);
    if (!this.checkPlayerAction(action)) {
      players[player.index].statisticDrinkNumber =
        players[player.index].statisticDrinkNumber + 1;
    }

    if (this.state.cardIndex == shuffleCards.length) {
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
          card={this.state.activeCard}
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
