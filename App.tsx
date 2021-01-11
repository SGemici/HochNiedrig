import React from "react";
import { Text, View } from "react-native";
import FourPlayerGame from "./views/FourPlayerGame";
import Home from "./views/Home";
import OnePlayerGame from "./views/OnePlayerGame";
import ThreePlayerGame from "./views/ThreePlayerGame";
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
};
export default class App extends React.Component<{}, AppSate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeView: GameView.HOME_VIEW,
    };
  }

  showView(activeView: GameView) {
    this.setState({ activeView });
  }
  getOnePlayerGameView() {
    return (
      <OnePlayerGame handleExit={() => this.showView(GameView.HOME_VIEW)} />
    );
  }
  getTwoPlayerGameView() {
    return (
      <TwoPlayerGame handleExit={() => this.showView(GameView.HOME_VIEW)} />
    );
  }
  getThreePlayerGameView() {
    return (
      <ThreePlayerGame handleExit={() => this.showView(GameView.HOME_VIEW)} />
    );
  }
  getFourPlayerGameView() {
    return (
      <FourPlayerGame handleExit={() => this.showView(GameView.HOME_VIEW)} />
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
        return this.getThreePlayerGameView();

      case GameView.FOUR_PLAYER_VIEW:
        return this.getFourPlayerGameView();

      default:
        return (
          <View>
            <Text>ERROR</Text>
          </View>
        );
    }
  }
}
