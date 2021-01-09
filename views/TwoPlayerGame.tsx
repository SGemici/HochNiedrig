import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "../business/cards";
import { Game } from "../business/game";
import {
  Player,
  PlayerAction,
  PlayerActionResult,
} from "../business/types";
import { Emoji, EmojiButton } from "../components/atoms/EmojiButton";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";
import { PlayerControls } from "../components/PlayerControls";
import { PlayerStatistics } from "../components/PlayerStatistics";
import { Popup } from "../components/Popup";
import { TableModul } from "../components/Table";
import { COLORS } from "../styles/colors";

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

type Props = {
  handleExit: Function
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
  laidsCards: number;
  PopupWrongActionTime: number;
  showRestartPopup: Boolean;
  showExitGamePopup: Boolean;
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
    laidsCards: 1,
    PopupWrongActionTime: 5,
    showRestartPopup: false,
    showExitGamePopup: false,
  };
}
function getInitialStateForNewGame(game: Game) {
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
    laidsCards: 1,
    PopupWrongActionTime: 5,
    showRestartPopup: false,
    showExitGamePopup: false,
  };
}

export default class TwoPlayerGame extends React.Component<Props, AppSate> {
  popuptimerIntevalId?: number;
  popuptimerAlertId?: number;

  // TODO: instantiation not required because reset() is called in constructor
  game: Game = new Game();

  constructor(props: Props) {
    super(props);
    this.state = getInitialStateForGame(this.game);
  }

  //#region Start Game
  reset() {
    this.game = new Game();
    this.setState(getInitialStateForGame(this.game));
  }
  restartGame() {
    this.game = new Game();
    this.setState(getInitialStateForNewGame(this.game));
  }

  syncGameState() {
    this.setState({
      activePlayer: this.game.activePlayer,
      activeCard: this.game.activeCard,
      previousCard: this.game.previousCard,
      laidsCards: this.state.laidsCards + 1,
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

  startPopuptimer() {
    clearInterval(this.popuptimerIntevalId);
    clearTimeout(this.popuptimerAlertId);
    this.popuptimerIntevalId = window.setInterval((): void => {
      const PopupWrongActionTime = this.state.PopupWrongActionTime - 1;
      this.setState({ PopupWrongActionTime });
    }, 1000 + 1);
  }

  hideIncorrectActionPopup() {
    console.log("hideIncorrectActionPopup");
    clearInterval(this.popuptimerIntevalId);
    this.setState({
      showWrongActionPopup: false,
      PopupWrongActionTime: 5,
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

    this.startPopuptimer();

    return new Promise<void>(
      (resolve) =>
        (this.popuptimerAlertId = window.setTimeout(() => {
          clearInterval(this.popuptimerIntevalId);
          this.setState({
            showWrongActionPopup: false,
            PopupWrongActionTime: 5,
          });
          resolve();
          // TODO add contant for 4500 millis
        }, 5000))
    );
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  endGame() {
    this.setState({ showEndGamePopup: true, gameStarted: true });
  }

  onGameSettingsRestartButton() {
    if (this.state.gameStarted) {
      this.setState({ showRestartPopup: true });
    }
  }

  onGameSettingsRestartYes() {
    this.restartGame();
  }
  onGameSettingsRestartNo() {
    this.setState({ showRestartPopup: false });
  }

  onGameSettingsExitGameButton() {
    this.setState({ showExitGamePopup: true });
  }
  onGameExit() {
    this.props.handleExit();
  }
  onGameSettingsExitNo() {
    this.setState({ showExitGamePopup: false });
  }

  render() {
    console.log(JSON.stringify(this.state, null, 4));

    const showWrongActionPopup = this.state.showWrongActionPopup;
    //const showWrongActionPopup = true;
    const showEndGamePopup = this.state.showEndGamePopup;
    //const showEndGamePopup = true;

    const showRestartPopup = this.state.showRestartPopup;
    //const showRestartPopup = true;
    const showExitGamePopup = this.state.showExitGamePopup;
    //const showExitGamePopup = true;
    let showRestartOrMainTextPopup = "";
    if (showRestartPopup) {
      showRestartOrMainTextPopup = "Spiel neustarten?";
    } else if (showExitGamePopup) {
      showRestartOrMainTextPopup = "Spiel beenden?";
    }

    const opacityValue =
      showEndGamePopup ||
      showWrongActionPopup ||
      showRestartPopup ||
      showExitGamePopup
        ? 0.25
        : 1;

    const opacityValuePlayerSpecials = this.state.gameStarted ? 1 : 0.2;

    const Popuptime = "" + this.state.PopupWrongActionTime;

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
              laidsCards={this.state.laidsCards}
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
            margin="5%"
          />
          <View style={styles.GameControlSettings}>
            <TextButton
              onClick={() => this.onGameSettingsExitGameButton()}
              style={styles.GameControlSettingsButtons}
            >
              ⏪
            </TextButton>
            <TextButton
              enabled={this.state.gameStarted}
              onClick={() => this.onGameSettingsRestartButton()}
              style={[
                styles.GameControlSettingsButtons,
                { opacity: opacityValuePlayerSpecials },
              ]}
            >
              🔄
            </TextButton>
          </View>
        </View>

        {showWrongActionPopup && (
          <Popup showBackgroundAlert={this.state.showPopupBackgroundAlert}>
            <RotatableText text="FALSCH - TRINK🍺" rotate={true} />
            <View style={styles.PopupTime}>
              <RotatableText text={Popuptime} rotate={true} />
              <TextButton
                onClick={() => this.hideIncorrectActionPopup()}
                style={styles.popupPlay}
              >
                ❎
              </TextButton>
              <RotatableText text={Popuptime} />
            </View>
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

            <TextButton
              onClick={() => this.restartGame()}
              style={styles.popupPlay}
            >
              🔄
            </TextButton>

            <RotatableText
              text={`🍺 = ${this.state.firstPlayer.statisticDrinkNumber}`}
            />
            <RotatableText text="Spiel beendet" />
          </Popup>
        )}

        {(showRestartPopup || showExitGamePopup) && (
          <Popup>
            <RotatableText text={showRestartOrMainTextPopup} />
            <View style={styles.PopupRestartExit}>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.onGameSettingsRestartYes()
                    : this.onGameExit()
                }
                style={[styles.popupPlay, { marginRight: 15 }]}
              >
                ✅
              </TextButton>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.onGameSettingsRestartNo()
                    : this.onGameSettingsExitNo()
                }
                style={[styles.popupPlay, { marginLeft: 15 }]}
              >
                ❎
              </TextButton>
            </View>
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
    fontSize: 65,
  },

  ContainerCenter: {
    alignSelf: "stretch",
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },

  PlayerSpecials: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "center",
    margin: 0,
  },
  PopupTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
  },

  GameControlSettings: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  GameControlSettingsButtons: {
    fontSize: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },

  PopupRestartExit: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    margin: 10,
  },
});
