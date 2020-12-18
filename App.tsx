import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { cards } from "./business/cards";
import { Player, PlayerAction } from "./business/types";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerStatistics } from "./components/PlayerStatistics";
import { TableModul } from "./components/Table";

function getPlayer(name: string): Player {
  return {
    name: name,
  };
}

const players = [getPlayer("clb"), getPlayer("sgm")];
export default class App extends React.Component {
  state = { game: false, activePlayer: players[0], card: this.getRandomCard() };

  startGame() {
    //this.setState({ game: !this.state.game })
    this.setState({ game: true });
  }

  getRandomCard() {
    const i = Math.floor(Math.random() * cards.length);
    return cards[i];
  }

  nextCard() {
    this.setState({
      card: this.getRandomCard(),
    });
    console.log(this.state);
  }

  // _checkOperation() {
  //   if (this.state.operation.length > 0) {
  //     if ()
  //   }
  // }

  onPlayerAction(action: PlayerAction, player: Player) {
    const message = `${player.name} pressed action ${action}`;
    console.log(message);
    this.nextCard();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ASD</Text>

        <PlayerControls
          inverseOrder={false}
          transformRotateZ={"180deg"}
          gameState={this.state.game}
          handlePlayerAction={(action) =>
            this.onPlayerAction(action, players[0])
          }
        />

        <PlayerStatistics
          transformRotateZ={"180deg"}
          GameState={this.state.game}
        />

        <TableModul
          game={this.state.game}
          handleCardClicked={() => this.startGame()}
          card={this.state.card}
        />

        <PlayerStatistics
          transformRotateZ={"0deg"}
          GameState={this.state.game}
        />

        <PlayerControls
          inverseOrder={false}
          transformRotateZ={"0deg"}
          gameState={this.state.game}
          handlePlayerAction={(action) =>
            this.onPlayerAction(action, players[1])
          }
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
