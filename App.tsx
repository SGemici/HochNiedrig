import React from "react";
import { Button, ColorPropType, StyleSheet, Text, View } from "react-native";
import { cards, CardsValue } from "./business/cards";
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
export default class App extends React.Component {
  state = {
    game: false,
    activePlayer: players[0],
    activeCard: this.getRandomCard(),
    PreviousCard: 0,
  };

  startGame() {
    //this.setState({ game: !this.state.game })
    this.setState({ game: true });
  }

  getRandomCard() {
    const i = Math.floor(Math.random() * cards.length);
    return cards[i];
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
    this.setState({
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
