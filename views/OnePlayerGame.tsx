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
function withVeticalAlignment(el: JSX.Element) {
  return <View style={[styles.PlayerSpecials]}>{el}</View>;
}

type Props = {
  handleExit: Function;
  sameButtonVisible: Boolean;
  redblackButtonVisible: Boolean;
  statisticVisible: Boolean;
  popupWrongActionReduce: Boolean;
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
};

function getInitialStateForGame(game: Game, popupTime: number) {
  return {
    gameStarted: false,
    activePlayer: game.activePlayer,
    activeCard: game.activeCard,
    previousCard: game.previousCard,
    showWrongActionPopup: false,
    showEndGamePopup: false,
    showPopupBackgroundAlert: COLORS.transparent,
    showBackgrounAlert: COLORS.appBackground,
    laidsCards: 1,
    PopupWrongActionTime: popupTime,
    showRestartPopup: false,
    showExitGamePopup: false,
  };
}

export default class OnePlayerGame extends React.Component<Props, AppSate> {
  popuptimerIntevalId?: number;
  popuptimerAlertId?: number;

  game: Game = new Game(1);

  popupTime = this.props.popupWrongActionReduce ? 1 : 5;

  constructor(props: Props) {
    super(props);
    this.state = getInitialStateForGame(this.game, this.popupTime);
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

  restartGame() {
    this.game = new Game(1);
    this.setState(getInitialStateForGame(this.game, this.popupTime));
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
          <View style={[{ margin: "16%" }]}></View>

          <View style={styles.ContainerCenter}>
            {this.props.redblackButtonVisible &&
              withVeticalAlignment(
                <EmojiButton
                  enabled={true}
                  emoji={Emoji.redCircle}
                  onClick={() => this.onPlayerAction(PlayerAction.CHOOSE_RED)}
                />
              )}

            <TableModul
              card={this.state.activeCard.image}
              laidsCards={this.state.laidsCards}
              showBothSideLaids={false}
            />

            {this.props.redblackButtonVisible &&
              withVeticalAlignment(
                <EmojiButton
                  enabled={true}
                  emoji={Emoji.blackCircle}
                  onClick={() => this.onPlayerAction(PlayerAction.CHOOSE_BLACK)}
                />
              )}
          </View>
          {this.props.statisticVisible && (
            <PlayerStatistics
              transformRotateZ={"0deg"}
              Player={this.state.activePlayer}
            />
          )}

          <PlayerControls
            inverseOrder={false}
            transformRotateZ={"0deg"}
            handlePlayerAction={(action) => this.onPlayerAction(action)}
            enabled={this.state.activePlayer === this.state.activePlayer}
            margin="15%"
            visibleSameButton={this.props.sameButtonVisible}
          />
          <View style={styles.GameControlSettings}>
            <TextButton
              onClick={() => this.showExitPopup(true)}
              textStyle={{ fontSize: 40 }}
            >
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
        </View>

        {showWrongActionPopup && (
          <Popup showBackgroundAlert={this.state.showPopupBackgroundAlert}>
            <RotatableText text="FALSCH 🍺" rotate={true} />
            <View style={styles.PopupTime}>
              <RotatableText text={Popuptime} rotate={true} />
              <TextButton
                onClick={() => this.hideIncorrectActionPopup()}
                textStyle={styles.popupPlay}
              >
                ❎
              </TextButton>
              <RotatableText text={Popuptime} />
            </View>
            <RotatableText text="FALSCH 🍺" />
          </Popup>
        )}

        {showEndGamePopup && (
          <Popup>
            <RotatableText rotate={false} text="Spiel beendet" />
            <TextButton
              onClick={() => this.restartGame()}
              textStyle={styles.popupPlay}
            >
              🔄
            </TextButton>
            {this.props.statisticVisible && (
              <RotatableText
                text={`🍺 = ${this.state.activePlayer.statisticDrinkNumber}`}
              />
            )}
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
                    ? this.restartGame()
                    : this.props.handleExit()
                }
                textStyle={[styles.popupPlay, { marginRight: 15 }]}
              >
                ✅
              </TextButton>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.showRestartPopup(false)
                    : this.showExitPopup(false)
                }
                textStyle={[styles.popupPlay, { marginLeft: 15 }]}
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
