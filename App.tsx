import React from "react";
import { Text, View } from "react-native";
import Home from "./views/Home";
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

  getTwoPlayerGameView() {
    return <TwoPlayerGame 
      handleExit={() => this.showView(GameView.HOME_VIEW)}
    />;
  }

  getHomeView() {
    return (
      <Home
        handleTwoPlayerGameStartIntent={() =>
          this.showView(GameView.TWO_PLAYER_VIEW)
        }
      />
    );
  }

  render() {
    switch (this.state.activeView) {
      case GameView.HOME_VIEW:
        return this.getHomeView();

      case GameView.TWO_PLAYER_VIEW:
        return this.getTwoPlayerGameView();

      default:
        return (
          <View>
            <Text>ERROR</Text>
          </View>
        );
    }
  }
}
