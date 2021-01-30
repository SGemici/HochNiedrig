import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Card } from "../business/cards";
import { Game } from "../business/game";
import {
  Player,
  PlayerAction,
  PlayerActionResult,
  PlayerPosition,
} from "../business/types";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";
import { PlayerControlsFull } from "../components/PlayerControlsFull";
import { PlayerPositions } from "../components/PlayerPositions";
import { PlayerStatistics } from "../components/PlayerStatistics";
import { Popup } from "../components/Popup";
import { TableModul } from "../components/Table";
import WithMenubar from "../components/WithMenubar";
import { COLORS } from "../styles/colors";

type Props = {
  handleExit: Function;
  sameButtonVisible: Boolean;
  redblackButtonVisible: Boolean;
  statisticVisible: Boolean;
  popupWrongActionReduce: Boolean;
  numberOfPlayers: number;
  showPlayerPosition: Boolean;
};

type AppSate = {
  activePlayer: Player;
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
  showPlayerInstruction: Boolean;
  opacityPlayerinstruction: number;
};

function getInitialStateForGame(
  game: Game,
  popuptime: number,
  showPlayerInstruction: Boolean
) {
  return {
    gameStarted: false,
    activePlayer: game.activePlayer,
    activeCard: game.activeCard,
    previousCard: game.previousCard,
    showWrongActionPopup: false,
    showEndGamePopup: false,
    showPopupBackgroundAlert: COLORS.transparent,
    showBackgrounAlert: COLORS.appBackgroundGame,
    laidsCards: 1,
    PopupWrongActionTime: popuptime,
    showRestartPopup: false,
    showExitGamePopup: false,
    angleMain: new Animated.Value(0),
    anglePlayer: new Animated.Value(0),
    showPlayerInstruction,
    opacityPlayerinstruction: 1,
  };
}

export default class GameView extends React.Component<Props, AppSate> {
  popuptimerIntevalId?: number;
  popuptimerAlertId?: number;

  game: Game = new Game(this.props.numberOfPlayers);
  angleMainOffset = -180;

  popupTime = this.props.popupWrongActionReduce ? 1 : 5;

  constructor(props: Props) {
    super(props);
    this.state = getInitialStateForGame(
      this.game,
      this.popupTime,
      this.props.showPlayerPosition
    );
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
    this.game = new Game(this.props.numberOfPlayers);
    this.setState(getInitialStateForGame(this.game, this.popupTime, false));
    this.angleMainOffset = 0;
  }

  syncGameState() {
    console.log("Active Player: ", this.game.activePlayer);
    const activePlayer = this.game.activePlayer;
    this.setState({
      activePlayer: activePlayer,
      activeCard: this.game.activeCard,
      previousCard: this.game.previousCard,
      laidsCards: this.state.laidsCards + 1,
    });
    if (this.props.numberOfPlayers === 1) {
      // do nothing - no rotation required
    } else if (this.props.numberOfPlayers === 2) {
      switch (this.game.cardIndex % 2) {
        case 0:
          this.rotateForBottom();
          break;
        case 1:
          this.rotateForTop();
          break;
        default:
          console.log("ERROR!");
      }
    } else {
      switch (this.game.cardIndex % this.props.numberOfPlayers) {
        case 0:
          this.rotateForBottom();
          break;
        case 1:
          this.rotateForLeft();
          break;
        case 2:
          this.rotateForTop();
          break;
        case 3:
          this.rotateForRight();
          break;
        default:
          console.log("ERROR!");
      }
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.syncGameState();
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
            showBackgrounAlert: COLORS.appBackgroundGame,
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
      PopupWrongActionTime: this.popupTime,
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
            PopupWrongActionTime: this.popupTime,
          });
          resolve();
          // TODO add contant for 4500 millis
        }, this.popupTime * 1000))
    );
  }

  showEndGamePopup() {
    this.setState({ showEndGamePopup: true });
  }

  showRestartPopup(show: boolean) {
    this.setState({ showRestartPopup: show });
  }

  showExitPopup(show = true) {
    this.setState({ showExitGamePopup: show });
  }

  showExitPlayerInstruction(slow = true) {
    if (slow) {
      let interval = window.setInterval(() => {
        let opacityPlayerinstructionValue = this.state.opacityPlayerinstruction;
        opacityPlayerinstructionValue = opacityPlayerinstructionValue - 0.18;
        this.setState({
          opacityPlayerinstruction: opacityPlayerinstructionValue,
        });
        if (this.state.opacityPlayerinstruction <= 0) {
          this.setState({
            showPlayerInstruction: false,
            opacityPlayerinstruction: 1,
          });
        }
      }, 110);
    } else {
      this.setState({
        showPlayerInstruction: false,
        opacityPlayerinstruction: 1,
      });
    }
  }
  getPlayerPosition(position: PlayerPosition) {
    if (this.game.players.length == 2) {
      if (position == PlayerPosition.BOTTOM) {
        return this.game.players[0].name;
      } else if (position == PlayerPosition.TOP) {
        return this.game.players[1].name;
      }
    } else if (this.game.players.length == 3) {
      if (position == PlayerPosition.BOTTOM) {
        return this.game.players[0].name;
      } else if (position == PlayerPosition.LEFT) {
        return this.game.players[1].name;
      } else if (position == PlayerPosition.TOP) {
        return this.game.players[2].name;
      }
    } else if (this.game.players.length == 4) {
      if (position == PlayerPosition.BOTTOM) {
        return this.game.players[0].name;
      } else if (position == PlayerPosition.LEFT) {
        return this.game.players[1].name;
      } else if (position == PlayerPosition.TOP) {
        return this.game.players[2].name;
      } else if (position == PlayerPosition.RIGHT) {
        return this.game.players[3].name;
      }
    }
  }

  renderContent() {
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
        ? 0.5
        : 1;

    const Popuptime = "" + this.state.PopupWrongActionTime;

    const showPlayerPosition =
      this.state.showPlayerInstruction && this.game.players.length != 1;
    //const showPlayerPosition = true;

    return (
      // STEUERUNG-Setting

      <View>
        <View
          style={[
            styles.body,
            {
              opacity: opacityValue,
              backgroundColor: this.state.showBackgrounAlert,
            },
          ]}
        >
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
              {/* <View>
                <RotatableText text={this.state.activePlayer.name} />
              </View> */}
              {this.props.statisticVisible && (
                <PlayerStatistics Player={this.state.activePlayer} />
              )}
              <PlayerControlsFull
                handlePlayerAction={(action: PlayerAction) =>
                  this.onPlayerAction(action)
                }
                visibleSameButton={this.props.sameButtonVisible}
                visibleRedBlackButton={this.props.redblackButtonVisible}
              />
            </Animated.View>
          </Animated.View>
        </View>

        {showPlayerPosition && (
          <PlayerPositions
            handleExit={() => this.showExitPlayerInstruction()}
            //handleExit={() => console.log("asd")}
            numberSecondsShowAnimation={200}
            //showBottom={this.game.players[0].name}
            showBottom={this.getPlayerPosition(PlayerPosition.BOTTOM)}
            showLeft={this.getPlayerPosition(PlayerPosition.LEFT)}
            showTop={this.getPlayerPosition(PlayerPosition.TOP)}
            showRight={this.getPlayerPosition(PlayerPosition.RIGHT)}
            opacity={this.state.opacityPlayerinstruction}
          ></PlayerPositions>
        )}

        {showWrongActionPopup && (
          <Popup>
            <RotatableText text="❌ FALSCH ❌" rotate={true} />
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
            <RotatableText text="❌ FALSCH ❌" />
          </Popup>
        )}

        {showEndGamePopup && (
          <Popup>
            <RotatableText text="Spiel beendet" />
            {this.props.statisticVisible &&
              this.game.getGameStatistics().map((statistic) => {
                return (
                  <RotatableText
                    text={`${statistic.playerName} - ❌ ${statistic.numberOfdrinks}`}
                    style={popupStyles.statistic}
                    key={statistic.playerName}
                  />
                );
              })}
            <TextButton
              onClick={() => this.restartGame()}
              textStyle={popupStyles.play}
            >
              🔄
            </TextButton>
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
                textStyle={[popupStyles.play, { marginRight: 15 }]}
              >
                ✅
              </TextButton>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.showRestartPopup(false)
                    : this.showExitPopup(false)
                }
                textStyle={[popupStyles.play, { marginLeft: 15 }]}
              >
                ❎
              </TextButton>
            </View>
          </Popup>
        )}
      </View>
    );
  }

  getMenubarAndContent() {
    const showPlayerInstructionMenubar = this.state.showPlayerInstruction
      ? true
      : false;
    if (showPlayerInstructionMenubar) {
      return (
        <WithMenubar
          exitName="Zum Spiel"
          handleExit={() => this.showExitPlayerInstruction(false)}
          titleName={`Spielanleitung`}
        >
          {this.renderContent()}
        </WithMenubar>
      );
    } else {
      return (
        <WithMenubar
          exitName="Beenden"
          handleExit={() => this.showExitPopup()}
          titleName={`${this.props.numberOfPlayers} Spieler`}
          optionName="Neustart"
          handleOption={() => this.showRestartPopup(true)}
        >
          {this.renderContent()}
        </WithMenubar>
      );
    }
  }

  render() {
    return this.getMenubarAndContent();
  }
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.appBackgroundGame,
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
    display: "flex",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",

    backgroundColor: "rgb(36,36,38)",
    padding: 5,
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

  statistic: {
    fontSize: 18,
    color: COLORS.brightText,
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
    fontSize: 65,
  },
});
