import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "./business/cards";
import { Game } from "./business/game";
import {
  GameView,
  Player,
  PlayerAction,
  PlayerActionResult,
} from "./business/types";
import { Emoji, EmojiButton } from "./components/atoms/EmojiButton";
import { RotatableText } from "./components/atoms/RotatableText";
import { TextButton } from "./components/atoms/TextButton";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerStatistics } from "./components/PlayerStatistics";
import { Popup } from "./components/Popup";
import { TableModul } from "./components/Table";
import { COLORS } from "./styles/colors";
import { TextStyles } from "./styles/text";

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
  laidsCards: number;
  PopupWrongActionTime: number;
  gameView: GameView;
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
    gameView: GameView.MAIN_VIEW,
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

export default class App extends React.Component<{}, AppSate> {
  PopuptimerIntevalId: any = null;
  PopuptimerAlertId: any = null;

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
    clearInterval(this.PopuptimerIntevalId);
    clearTimeout(this.PopuptimerAlertId);
    this.PopuptimerIntevalId = setInterval((): void => {
      const PopupWrongActionTime = this.state.PopupWrongActionTime - 1;
      this.setState({ PopupWrongActionTime });
    }, 1000 + 1);
  }

  hideIncorrectActionPopup() {
    console.log("hideIncorrectActionPopup");
    clearInterval(this.PopuptimerIntevalId);
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
        (this.PopuptimerAlertId = setTimeout(() => {
          clearInterval(this.PopuptimerIntevalId);
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

  onGameTypeChoice(typ: GameView) {
    this.setState({ gameView: GameView.TWO_PLAYER_VIEW });
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
  onGameSettingsExitYes() {
    this.reset();
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

    const showMainMenu =
      this.state.gameView == GameView.MAIN_VIEW ? true : false;
    const showTwoPlayerGame =
      this.state.gameView == GameView.TWO_PLAYER_VIEW ? true : false;

    return (
      <View>
        {showMainMenu && (
          <View>
            <View style={[styles.containerMainMenu, {}]}>
              <View style={[styles.HOCHNIEDRIG_LOGO, {}]}>
                <RotatableText
                  text="Hoch-Niedrig"
                  rotate={false}
                  style={[
                    styles.HOCHNIEDRIG_LOGO_TEXT,
                    { fontSize: 50, width: "100%" },
                  ]}
                />
              </View>

              <View style={[styles.MainGamePlayer, {}]}>
                <View style={[styles.MainGamePlayerText, {}]}>
                  <RotatableText
                    text="Spieleranzahl"
                    rotate={false}
                    style={styles.MainGamePlayerText}
                  />
                </View>
                <View style={[styles.MainGamePlayerChoice, {}]}>
                  <TextButton
                    enabled={false}
                    onClick={() => this.reset()}
                    style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
                  >
                    1️⃣
                  </TextButton>
                  <TextButton
                    onClick={() =>
                      this.onGameTypeChoice(GameView.TWO_PLAYER_VIEW)
                    }
                    style={styles.MainGamePlayerButtons}
                  >
                    2️⃣
                  </TextButton>
                </View>
                <View style={[styles.MainGamePlayerChoice, {}]}>
                  <TextButton
                    enabled={false}
                    onClick={() => this.reset()}
                    style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
                  >
                    3️⃣
                  </TextButton>
                  <TextButton
                    enabled={false}
                    onClick={() => this.reset()}
                    style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
                  >
                    4️⃣
                  </TextButton>
                </View>
              </View>

              <View style={[styles.MainGameSettings, {}]}>
                <TextButton
                  enabled={false}
                  onClick={() => this.reset()}
                  style={[styles.MainGameSettingsButtons, { opacity: 0.2 }]}
                >
                  📖
                </TextButton>
                <TextButton
                  enabled={false}
                  onClick={() => this.reset()}
                  style={[styles.MainGameSettingsButtons, { opacity: 0.2 }]}
                >
                  ⚙️
                </TextButton>
              </View>
            </View>
          </View>
        )}

        {showTwoPlayerGame && (
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
        )}

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
                    : this.onGameSettingsExitYes()
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
  containerMainMenu: {
    display: "flex",
    height: "100%",
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },

  HOCHNIEDRIG_LOGO: {
    backgroundColor: "red",
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  HOCHNIEDRIG_LOGO_TEXT: {
    color: COLORS.startTextColor,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
  },

  MainGameSettingsButtons: {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 40,
    borderColor: COLORS.primaryBorder,
    overflow: "hidden",
  },
  MainGamePlayer: {
    // backgroundColor: COLORS.alertBackgroundGreen,
    display: "flex",
    flexGrow: 0.1,
    margin: 20,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    alignContent: "center",
    //flexDirection: "row",
  },
  MainGamePlayerChoice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  MainGamePlayerText: {
    color: COLORS.startTextColor,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  MainGamePlayerButtons: {
    // backgroundColor: "red",
    margin: 5,
    fontSize: 70,
    color: COLORS.startTextColor,
    overflow: "hidden",
    borderColor: COLORS.primaryBorder,
  },

  MainGameSettings: {
    margin: 30,
    width: "100%",
    // backgroundColor: COLORS.alertBackgroundRed,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
  },

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
