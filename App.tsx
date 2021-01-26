import React from "react";
import { Text, View } from "react-native";
import HomeView from "./views/HomeView";
import PartyModeGame from "./views/GameView";
import SettingsView from "./views/SettingsView";

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
  showPlayerPosition: Boolean;
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
      showPlayerPosition: true,
    };
  }

  showView(activeView: GameView) {
    this.setState({ activeView });
  }

  getPartyModeGameView(numberOfPlayers: number) {
    return (
      <PartyModeGame
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        sameButtonVisible={this.state.sameButtonVisible}
        redblackButtonVisible={this.state.redblackButtonVisible}
        statisticVisible={this.state.statisticVisible}
        popupWrongActionReduce={this.state.popupWrongActionReduce}
        showPlayerPosition={this.state.showPlayerPosition}
        numberOfPlayers={numberOfPlayers}
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
  changeShowPlayerPosition() {
    this.setState({ showPlayerPosition: !this.state.showPlayerPosition });
  }
  getSettingsGameView() {
    return (
      <SettingsView
        handleExit={() => this.showView(GameView.HOME_VIEW)}
        changeSameButtonVisibleVar={this.state.sameButtonVisible}
        changeSameButtonVisible={() => this.changeSameButtonVisible()}
        changeRedblackButtonVisibleVar={this.state.redblackButtonVisible}
        changeRedblackButtonVisible={() => this.changeRedblackButtonVisible()}
        changeStatisticVisibleVar={this.state.statisticVisible}
        changeStatisticVisible={() => this.changeStatisticsVisible()}
        changePopupWrongActionReduceVar={this.state.popupWrongActionReduce}
        changePopupWrongActionReduce={() => this.changePopupWrongActionReduce()}
        changeShowPlayerPositionVar={this.state.showPlayerPosition}
        changeShowPlayerPosition={() => this.changeShowPlayerPosition()}
      />
    );
  }

  getHomeView() {
    return (
      <HomeView
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
        return this.getPartyModeGameView(1);

      case GameView.TWO_PLAYER_VIEW:
        return this.getPartyModeGameView(2);

      case GameView.THREE_PLAYER_VIEW:
        return this.getPartyModeGameView(3);

      case GameView.FOUR_PLAYER_VIEW:
        return this.getPartyModeGameView(4);

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
