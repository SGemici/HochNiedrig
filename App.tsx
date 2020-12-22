import React from "react";
import {
  Button,
  ColorPropType,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cardProperties, cards, cardType } from "./business/cards";
import { Player, PlayerAction } from "./business/types";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerStatistics } from "./components/PlayerStatistics";
import { Popup } from "./components/Popup";
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
    showWrongActionPopup: false,
    showRestartPopup: false,
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
      showWrongActionPopup: false,
      showRestartPopup: false,
    });
  }
  resetStatistics() {
    var i;
    for (i = 0; i < players.length; i++) {
      players[i].statisticDrinkNumber = 0;
    }
  }

  startGame() {
    if (!this.state.game) {
      this.resetStates();
    }
    console.log(
      "Start GAME =  current Card: ",
      shuffleCards[this.state.cardIndex].name
    );
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
    // CARDA = PREVIOUSCARD
    // CARDB = ACTIVE
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
    } else if (
      // ACTION == CHOOSE_RED &&  activeCard.Type == red
      action == PlayerAction.CHOOSE_RED &&
      cardB.type == cardType.red
    ) {
      CorrectAction = true;
    } else if (
      // ACTION == CHOOSE_BLACK &&  activeCard.Type == BLACK
      action == PlayerAction.CHOOSE_BLACK &&
      cardB.type == cardType.black
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
      this.setState({ showWrongActionPopup: true });
      currentPlayer.statisticDrinkNumber =
        currentPlayer.statisticDrinkNumber + 1;
      setTimeout(() => {
        this.continueGame();
      }, 4500);
    } else if (cardIndex == shuffleCards.length - 1) {
      this.setState({ showRestartPopup: true });
    }
    console.log("End Action");
    console.log("-------------------");
  }

  continueGame() {
    if (this.state.cardIndex != shuffleCards.length - 1) {
      this.setState({ showWrongActionPopup: false });
    } else {
      this.setState({ showWrongActionPopup: false, showRestartPopup: true });
    }
  }

  restart() {
    this.resetStatistics();
    this.resetStates();
  }

  render() {
    const displayPopup = this.state.showWrongActionPopup;
    //const displayPopup = true;
    const displayPopupEndgame = this.state.showRestartPopup;
    //const displayPopupEndgame = true;
    const opacityValue = displayPopup || displayPopupEndgame ? 0.25 : 1;
    //const displayPopupEndgame = true;

    const opacityValuePlayerSpecials = this.state.game ? 1 : 0.2;

    return (
      <View>
        <View style={[styles.container, { opacity: opacityValue }]}>
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

          <View style={styles.ContainerCenter}>
            <View
              style={[
                styles.PlayerSpecials,
                {
                  opacity: opacityValuePlayerSpecials,
                },
              ]}
            >
              <TouchableOpacity
                disabled={!this.state.game}
                onPress={() =>
                  this.onPlayerAction(
                    PlayerAction.CHOOSE_RED,
                    this.state.activePlayer
                  )
                }
              >
                <Text style={styles.ButtonRedBlack}>🔴</Text>
              </TouchableOpacity>
            </View>

            <TableModul
              game={this.state.game}
              handleCardClicked={() => this.startGame()}
              card={this.state.activeCard.image}
            />

            <View
              style={[
                styles.PlayerSpecials,
                {
                  opacity: opacityValuePlayerSpecials,
                },
              ]}
            >
              <TouchableOpacity
                disabled={!this.state.game}
                onPress={() =>
                  this.onPlayerAction(
                    PlayerAction.CHOOSE_BLACK,
                    this.state.activePlayer
                  )
                }
              >
                <Text style={styles.ButtonRedBlack}>⚫️</Text>
              </TouchableOpacity>
            </View>
          </View>

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

        {displayPopup && !displayPopupEndgame && (
          <Popup>
            <Text
              style={[
                styles.popupText,
                {
                  transform: [{ rotateZ: "180deg" }],
                },
              ]}
            >
              FALSCH - TRINK🍺
            </Text>
            <TouchableOpacity onPress={() => this.continueGame()}>
              <Text style={styles.popupPlay}>❎</Text>
            </TouchableOpacity>
            <Text style={styles.popupText}>FALSCH TRINK 🍺</Text>
          </Popup>
        )}

        {displayPopupEndgame && (
          <Popup>
            <Text
              style={[
                styles.popupText,
                {
                  transform: [{ rotateZ: "180deg" }],
                },
              ]}
            >
              Spiel beendet
            </Text>
            <Text
              style={[
                styles.popupText,
                {
                  transform: [{ rotateZ: "180deg" }],
                },
              ]}
            >
              🍺 = {players[1].statisticDrinkNumber}
            </Text>
            <TouchableOpacity onPress={() => this.restart()}>
              <Text style={styles.popupPlay}>🔄</Text>
            </TouchableOpacity>
            <Text style={styles.popupText}>
              🍺 = {players[0].statisticDrinkNumber}
            </Text>
            <Text style={styles.popupText}>Spiel beendet</Text>
          </Popup>
        )}
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
    padding: 20,
    flexDirection: "column",
    //borderColor: 'red',
    //borderWidth: 2
  },
  popupText: {
    fontSize: 30,
    margin: 30,
    color: "red",
  },
  popupPlay: {
    fontSize: 80,
  },

  ContainerCenter: {
    alignSelf: "stretch",
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    // borderWidth: 2,
    // borderRadius: 30,
  },

  PlayerSpecials: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "center",
    margin: 0,
    // borderWidth: 1,
    // borderRadius: 30,
  },
  ButtonRedBlack: {
    fontSize: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
});
