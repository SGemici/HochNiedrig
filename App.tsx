import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "./business/cards";
import { Game } from "./business/game";
import { Player, PlayerAction, PlayerActionResult } from "./business/types";
import { Emoji, EmojiButton } from "./components/atoms/EmojiButton";
import { RotatableText } from "./components/atoms/RotatableText";
import { TextButton } from "./components/atoms/TextButton";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerStatistics } from "./components/PlayerStatistics";
import { Popup } from "./components/Popup";
import { TableModul } from "./components/Table";
import { COLORS } from "./styles/colors";

// eslint-disable-next-line no-undef
function withVeticalAlignment(el: JSX.Element, opacity: number) {
  return (
    <View
      style={[
        styles.PlayerSpecials,
        {
          opacity,
        },
      ]}
    >
      {el}
    </View>
  );
}

type AppSate = {
  gameStarted: boolean;
  activePlayer: Player;
  firstPlayer: Player;
  secondPlayer: Player;
  activeCard: Card;
  previousCard: Card;
  showWrongActionPopup: boolean;
  showEndGamePopup: boolean;
  showPopupBackgroundAlert: COLORS;
  showBackgrounAlert: COLORS;
};

function getInitialStateForGame(game: Game) {
  return {
    gameStarted: false,
    activePlayer: game.activePlayer,
    firstPlayer: game.firstPlayer,
    secondPlayer: game.secondPlayer,
    activeCard: game.activeCard,
    previousCard: game.previousCard,
    showWrongActionPopup: false,
    showEndGamePopup: false,
    showPopupBackgroundAlert: COLORS.transparent,
    showBackgrounAlert: COLORS.appBackground,
  };
}

export default class App extends React.Component<{}, AppSate> {
  // TODO: instantiation not required because reset() is called in constructor
  game: Game = new Game();

  constructor(props: {}) {
    super(props);
    this.state = getInitialStateForGame(this.game);
  }

  //#region Start Game
  reset() {
    this.game = new Game();
    this.setState(getInitialStateForGame(this.game));
  }

  syncGameState() {
    this.setState({
      activePlayer: this.game.activePlayer,
      activeCard: this.game.activeCard,
      previousCard: this.game.previousCard,
    });
  }

  onPlayerAction(action: PlayerAction) {
    const result = this.game.applyAction(action);
    if (result === PlayerActionResult.INCORRECT) {
      this.showIncorrectActionPopup().then(() => {
        if (this.game.isOver()) {
          this.endGame();
        }
      });
    } else {
      if (this.game.isOver()) {
        this.endGame();
      } else {
        this.setState({
          showBackgrounAlert: COLORS.alertBackgroundGreen,
        });
        setTimeout(() => {
          this.setState({
            showBackgrounAlert: COLORS.appBackground,
          });
        }, 160);
      }
    }
    this.syncGameState();
  }

  hideIncorrectActionPopup() {
    console.log("hideIncorrectActionPopup");
    this.setState({
      showWrongActionPopup: false,
    });
    if (this.game.isOver()) {
      this.endGame();
    }
  }

  showIncorrectActionPopup() {
    this.setState({
      showWrongActionPopup: true,
      showPopupBackgroundAlert: COLORS.alertBackgroundRed,
    });
    setTimeout(() => {
      this.setState({
        showPopupBackgroundAlert: COLORS.transparent,
      });
    }, 160);

    return new Promise<void>((resolve) =>
      setTimeout(() => {
        this.setState({
          showWrongActionPopup: false,
        });
        resolve();
        // TODO add contant for 4500 millis
      }, 4500)
    );
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  endGame() {
    this.setState({ showEndGamePopup: true, gameStarted: false });
  }

  render() {
    console.log(JSON.stringify(this.state, null, 4));

    const showWrongActionPopup = this.state.showWrongActionPopup;
    //const showWrongActionPopup = true;
    const showEndGamePopup = this.state.showEndGamePopup;
    //const showEndGamePopup = true;
    const opacityValue = showEndGamePopup || showWrongActionPopup ? 0.25 : 1;
    //const displayPopupEndgame = true;

    const opacityValuePlayerSpecials = this.state.gameStarted ? 1 : 0.2;

    return (
      <View>
        <View
          style={[
            styles.container,
            {
              opacity: opacityValue,
              backgroundColor: this.state.showBackgrounAlert,
            },
          ]}
        >
          <PlayerControls
            inverseOrder={false}
            transformRotateZ={"180deg"}
            enabled={
              this.state.gameStarted &&
              this.state.activePlayer === this.state.secondPlayer
            }
            handlePlayerAction={(action) => this.onPlayerAction(action)}
          />

          <PlayerStatistics
            transformRotateZ={"180deg"}
            GameState={this.state.gameStarted}
            Player={this.state.secondPlayer}
          />

          <View style={styles.ContainerCenter}>
            {withVeticalAlignment(
              <EmojiButton
                enabled={this.state.gameStarted}
                emoji={Emoji.redCircle}
                onClick={() => this.onPlayerAction(PlayerAction.CHOOSE_RED)}
              />,
              opacityValuePlayerSpecials
            )}

            <TableModul
              game={this.state.gameStarted}
              handleCardClicked={() => this.startGame()}
              card={this.state.activeCard.image}
            />

            {withVeticalAlignment(
              <EmojiButton
                enabled={this.state.gameStarted}
                emoji={Emoji.blackCircle}
                onClick={() => this.onPlayerAction(PlayerAction.CHOOSE_BLACK)}
              />,
              opacityValuePlayerSpecials
            )}
          </View>

          <PlayerStatistics
            transformRotateZ={"0deg"}
            GameState={this.state.gameStarted}
            Player={this.state.firstPlayer}
          />

          <PlayerControls
            inverseOrder={false}
            transformRotateZ={"0deg"}
            handlePlayerAction={(action) => this.onPlayerAction(action)}
            enabled={
              this.state.gameStarted &&
              this.state.activePlayer === this.state.firstPlayer
            }
          />
        </View>

        {showWrongActionPopup && (
          <Popup showBackgroundAlert={this.state.showPopupBackgroundAlert}>
            <RotatableText text="FALSCH - TRINK🍺" rotate={true} />
            <TextButton
              onClick={() => this.hideIncorrectActionPopup()}
              style={styles.popupPlay}
            >
              ❎
            </TextButton>
            <RotatableText text="FALSCH - TRINK🍺" />
          </Popup>
        )}

        {showEndGamePopup && (
          <Popup>
            <RotatableText rotate={true} text="Spiel beendet" />
            <RotatableText
              rotate={true}
              text={`🍺 = ${this.state.secondPlayer.statisticDrinkNumber}`}
            />

            <TextButton onClick={() => this.reset()} style={styles.popupPlay}>
              🔄
            </TextButton>

            <RotatableText
              text={`🍺 = ${this.state.firstPlayer.statisticDrinkNumber}`}
            />
            <RotatableText text="Spiel beendet" />
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
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
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
});
