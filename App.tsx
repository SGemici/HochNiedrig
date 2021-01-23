import React from "react";
import { Text, View } from "react-native";
import { GameType } from "./business/types";
import Home from "./views/Home";
import OnePlayerGame from "./views/OnePlayerGame";
import PartyModeGame from "./views/PartyModeGame";
import Settings from "./views/Settings";
import TwoPlayerGame from "./views/TwoPlayerGame";

export enum GameView {
  HOME_VIEW,
  SETTINGS_VIEW,
  GAME_INSTRUCTIONS_VIEW,
  ONE_PLAYER_VIEW,
  TWO_PLAYER_VIEW,
  THREE_PLAYER_VIEW,
  FOUR_PLAYER_VIEW,
}

type AppSate = {
  activeView: GameView;

  sameButtonVisible: Boolean;
  redblackButtonVisible: Boolean;
  statisticVisible: Boolean;
  popupWrongActionReduce: Boolean;
};
export default class App extends React.Component<{}, AppSate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeView: GameView.HOME_VIEW,
      sameButtonVisible: true,
      redblackButtonVisible: true,
      statisticVisible: true,
      popupWrongActionReduce: false,
    };
  }

  showView(activeView: GameView) {
    this.setState({ activeView });
  }
  getOnePlayerGameView() {
    return (
      <OnePlayerGame
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        sameButtonVisible={this.state.sameButtonVisible}
        redblackButtonVisible={this.state.redblackButtonVisible}
        statisticVisible={this.state.statisticVisible}
        popupWrongActionReduce={this.state.popupWrongActionReduce}
      />
    );
  }
  getTwoPlayerGameView() {
    return (
      <TwoPlayerGame
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        sameButtonVisible={this.state.sameButtonVisible}
        redblackButtonVisible={this.state.redblackButtonVisible}
        statisticVisible={this.state.statisticVisible}
        popupWrongActionReduce={this.state.popupWrongActionReduce}
      />
    );
  }

  getPartyModeGameView(gameView: GameView) {
    let Gametyp = GameType.ONE_PLAYER;
    if (gameView == GameView.THREE_PLAYER_VIEW) {
      Gametyp = GameType.THREE_PLAYER;
    } else if (gameView == GameView.FOUR_PLAYER_VIEW) {
      Gametyp = GameType.FOUR_PLAYER;
    }
    return (
      <PartyModeGame
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        sameButtonVisible={this.state.sameButtonVisible}
        redblackButtonVisible={this.state.redblackButtonVisible}
        statisticVisible={this.state.statisticVisible}
        popupWrongActionReduce={this.state.popupWrongActionReduce}
        PlayerMode={Gametyp}
      />
    );
  }

  changeSameButtonVisible() {
    this.setState({ sameButtonVisible: !this.state.sameButtonVisible });
  }
  changeRedblackButtonVisible() {
    this.setState({ redblackButtonVisible: !this.state.redblackButtonVisible });
  }
  changeStatisticsVisible() {
    this.setState({ statisticVisible: !this.state.statisticVisible });
  }
  changePopupWrongActionReduce() {
    this.setState({
      popupWrongActionReduce: !this.state.popupWrongActionReduce,
    });
  }
  getSettingsGameView() {
    return (
      <Settings
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        changeSameButtonVisibleVar={this.state.sameButtonVisible}
        changeSameButtonVisible={() => this.changeSameButtonVisible()}
        changeRedblackButtonVisibleVar={this.state.redblackButtonVisible}
        changeRedblackButtonVisible={() => this.changeRedblackButtonVisible()}
        changeStatisticVisibleVar={this.state.statisticVisible}
        changeStatisticVisible={() => this.changeStatisticsVisible()}
        changePopupWrongActionReduceVar={this.state.popupWrongActionReduce}
        changePopupWrongActionReduce={() => this.changePopupWrongActionReduce()}
      />
    );
  }

  getHomeView() {
    return (
      <Home
        handleOnePlayerGameStartIntent={() =>
          this.showView(GameView.ONE_PLAYER_VIEW)
        }
        handleTwoPlayerGameStartIntent={() =>
          this.showView(GameView.TWO_PLAYER_VIEW)
        }
        handleThreePlayerGameStartIntent={() =>
          this.showView(GameView.THREE_PLAYER_VIEW)
        }
        handleFourPlayerGameStartIntent={() =>
          this.showView(GameView.FOUR_PLAYER_VIEW)
        }
        handleSettingsGameStartIntent={() =>
          this.showView(GameView.SETTINGS_VIEW)
        }
      />
    );
  }

  render() {
    switch (this.state.activeView) {
      case GameView.HOME_VIEW:
        return this.getHomeView();

      case GameView.ONE_PLAYER_VIEW:
        return this.getOnePlayerGameView();

      case GameView.TWO_PLAYER_VIEW:
        return this.getTwoPlayerGameView();

      case GameView.THREE_PLAYER_VIEW:
        return this.getPartyModeGameView(GameView.THREE_PLAYER_VIEW);

      case GameView.FOUR_PLAYER_VIEW:
        return this.getPartyModeGameView(GameView.FOUR_PLAYER_VIEW);

      case GameView.SETTINGS_VIEW:
        return this.getSettingsGameView();

      default:
        return (
          <View>
            <Text>ERROR</Text>
          </View>
        );
    }
  }
}
