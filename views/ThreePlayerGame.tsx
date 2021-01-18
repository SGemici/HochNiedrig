import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "../business/cards";
import { Game } from "../business/game";
import {
  GameType,
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

function getInitialStateForGame(game: Game, popupTime: number) {
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
    PopupWrongActionTime: popupTime,
    showRestartPopup: false,
    showExitGamePopup: false,
  };
}

export default class ThreePlayerGame extends React.Component<Props, AppSate> {
  popuptimerIntevalId?: number;
  popuptimerAlertId?: number;

  game: Game = new Game();

  popupTime = this.props.popupWrongActionReduce ? 1 : 5;

  constructor(props: Props) {
    super(props);
    this.game.gameType = GameType.THREE_PLAYER;
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
    this.game = new Game();
    this.game.gameType = GameType.THREE_PLAYER;
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
          <PlayerControls
            inverseOrder={false}
            transformRotateZ={"180deg"}
            enabled={this.state.activePlayer === this.state.secondPlayer}
            handlePlayerAction={(action) => this.onPlayerAction(action)}
            visibleSameButton={this.props.sameButtonVisible}
          />
          {this.props.statisticVisible && (
            <PlayerStatistics
              transformRotateZ={"180deg"}
              Player={this.state.secondPlayer}
            />
          )}

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
              Player={this.state.firstPlayer}
            />
          )}

          <PlayerControls
            inverseOrder={false}
            transformRotateZ={"0deg"}
            handlePlayerAction={(action) => this.onPlayerAction(action)}
            enabled={this.state.activePlayer === this.state.firstPlayer}
            margin="5%"
            visibleSameButton={this.props.sameButtonVisible}
          />
          <View style={styles.GameControlSettings}>
            <TextButton
              onClick={() => this.showExitPopup(true)}
              style={styles.GameControlSettingsButtons}
            >
              ⏪
            </TextButton>
            <TextButton
              enabled={true}
              onClick={() => this.showRestartPopup(true)}
              style={[styles.GameControlSettingsButtons]}
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
            {this.props.statisticVisible && (
              <RotatableText
                rotate={true}
                text={`🍺 = ${this.state.secondPlayer.statisticDrinkNumber}`}
              />
            )}

            <TextButton
              onClick={() => this.restartGame()}
              style={styles.popupPlay}
            >
              🔄
            </TextButton>
            {this.props.statisticVisible && (
              <RotatableText
                text={`🍺 = ${this.state.firstPlayer.statisticDrinkNumber}`}
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
                style={[styles.popupPlay, { marginRight: 15 }]}
              >
                ✅
              </TextButton>
              <TextButton
                onClick={() =>
                  showRestartPopup
                    ? this.showRestartPopup(false)
                    : this.showExitPopup(false)
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
