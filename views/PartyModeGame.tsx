import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Card } from "../business/cards";
import { Game } from "../business/game";
import {
  GameType,
  Player,
  PlayerAction,
  PlayerActionResult,
} from "../business/types";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";
import { PlayerControlsFull } from "../components/PlayerControlsFull";
import { PlayerStatistics } from "../components/PlayerStatistics";
import { Popup } from "../components/Popup";
import { TableModul } from "../components/Table";
import { COLORS } from "../styles/colors";

type Props = {
  handleExit: Function;
};

type AppSate = {
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
  angleMain: Animated.Value;
  anglePlayer: Animated.Value;
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
    angleMain: new Animated.Value(0),
    anglePlayer: new Animated.Value(0),
  };
}

export default class OnePlayerGame extends React.Component<Props, AppSate> {
  popuptimerIntevalId?: number;
  popuptimerAlertId?: number;

  game: Game = new Game();
  angleMainOffset = -180;

  constructor(props: Props) {
    super(props);
    this.game.gameType = GameType.ONE_PLAYER;
    this.state = getInitialStateForGame(this.game);
  }

  componentWillUnmount(): void {
    var id = window.setTimeout(function () {}, 0);

    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    id = window.setInterval(function () {}, 0);

    while (id--) {
      window.clearInterval(id); // will do nothing if no timeout with id is present
    }
  }

  rotateForRight() {
    console.log("right");
    Animated.timing(this.state.angleMain, {
      toValue: this.angleMainOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.anglePlayer, {
      toValue: 90,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  rotateForLeft() {
    console.log("left");
    Animated.timing(this.state.angleMain, {
      toValue: this.angleMainOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.anglePlayer, {
      toValue: 90,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  rotateForTop() {
    console.log("top");
    this.angleMainOffset += 180;
    Animated.timing(this.state.angleMain, {
      toValue: this.angleMainOffset,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.anglePlayer, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  rotateForBottom() {
    console.log("bottom");
    this.angleMainOffset += 180;
    Animated.timing(this.state.angleMain, {
      toValue: this.angleMainOffset,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.anglePlayer, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  restartGame() {
    this.game = new Game();
    this.setState(getInitialStateForGame(this.game));
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
          this.showEndGamePopup();
        }
      });
    } else {
      if (this.game.isOver()) {
        this.showEndGamePopup();
      } else {
        this.setState({
          showBackgrounAlert: COLORS.alertBackgroundGreen,
        });
        window.setTimeout(() => {
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
    clearInterval(this.popuptimerIntevalId);
    this.setState({
      showWrongActionPopup: false,
      PopupWrongActionTime: 5,
    });
    if (this.game.isOver()) {
      this.showEndGamePopup();
    }
  }

  showIncorrectActionPopup() {
    this.setState({
      showWrongActionPopup: true,
      showPopupBackgroundAlert: COLORS.alertBackgroundRed,
    });
    window.setTimeout(() => {
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

  showEndGamePopup() {
    this.setState({ showEndGamePopup: true });
  }

  showRestartPopup(show: boolean) {
    this.setState({ showRestartPopup: show });
  }

  showExitPopup(show: boolean) {
    this.setState({ showExitGamePopup: show });
  }

  render() {
    //console.log(JSON.stringify(this.state, null, 4));

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

    const Popuptime = "" + this.state.PopupWrongActionTime;

    return (
      <View style={styles.body}>
        <Animated.View
          style={[
            styles.main,
            {
              opacity: opacityValue,
              backgroundColor: this.state.showBackgrounAlert,
            },
            {
              transform: [
                {
                  rotateZ: this.state.angleMain.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", `360deg`],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.cardWrapper,
              {
                transform: [
                  {
                    rotateZ: this.state.anglePlayer.interpolate({
                      inputRange: [0, 360],
                      outputRange: ["0deg", `360deg`],
                    }),
                  },
                ],
              },
            ]}
          >
            <TableModul
              card={this.state.activeCard.image}
              laidsCards={this.state.laidsCards}
              showBothSideLaids={false}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.playerControls,
              {
                transform: [
                  {
                    rotateZ: this.state.anglePlayer.interpolate({
                      inputRange: [0, 360],
                      outputRange: ["0deg", `360deg`],
                    }),
                  },
                ],
              },
            ]}
          >
            <PlayerStatistics Player={this.state.firstPlayer} />
            <PlayerControlsFull
              handlePlayerAction={(action: PlayerAction) => this.onPlayerAction(action)}
            />
          </Animated.View>
        </Animated.View>

        <View style={styles.gameControls}>
          <TextButton onClick={() => this.showExitPopup(true)} textStyle={{ fontSize: 40 }}>
            ⏪
          </TextButton>
          <TextButton
            enabled={true}
            onClick={() => this.showRestartPopup(true)}
            textStyle={{ fontSize: 40 }}
          >
            🔄
          </TextButton>
        </View>
        {showWrongActionPopup && (
          <Popup showBackgroundAlert={this.state.showPopupBackgroundAlert}>
            <RotatableText text="FALSCH - TRINK🍺" rotate={true} />
            <View style={popupStyles.time}>
              <RotatableText text={Popuptime} rotate={true} />
              <TextButton
                onClick={() => this.hideIncorrectActionPopup()}
                textStyle={popupStyles.play}
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
              textStyle={popupStyles.play}
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
            <View style={popupStyles.default}>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.restartGame()
                    : this.props.handleExit()
                }
                textStyle={[popupStyles.default, { marginRight: 15 }]}
              >
                ✅
              </TextButton>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.showRestartPopup(false)
                    : this.showExitPopup(false)
                }
                textStyle={[popupStyles.default, { marginLeft: 15 }]}
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
  body: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.appBackground,
    position: "relative",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    paddingBottom: 60,
  },

  main: {
    height: "100%",
    position: "relative",
  },

  gameControls: {
    height: 60,
    display: "flex",
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    justifyContent: "space-between",
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  cardWrapper: {
    height: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  playerControls: {
    height: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const popupStyles = StyleSheet.create({
  play: {
    fontSize: 65,
  },

  time: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
  },

  default: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    margin: 10,
  },
});
