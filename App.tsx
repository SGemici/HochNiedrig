import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PlayerControls } from './components/PlayerControls';
import { PlayerStatistics } from './components/PlayerStatistics';
import { TableModul } from './components/Table';



export default class App extends React.Component {

  state = { game: false };

  startGame() {
    //this.setState({ game: !this.state.game })
    this.setState({ game: true })
  }

  render() {

    return (
      <View style={styles.container} >

        <PlayerControls inverseOrder={false} transformRotateZ={'180deg'} gameState={this.state.game} />

        <PlayerStatistics transformRotateZ={'180deg'} GameState={this.state.game} />

        <TableModul game={this.state.game} handleCardClicked={() => this.startGame()} />

        <PlayerStatistics transformRotateZ={'0deg'} GameState={this.state.game} />

        <PlayerControls inverseOrder={false} transformRotateZ={'0deg'} gameState={this.state.game} />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    padding: 30,
    flexDirection: 'column',
    //borderColor: 'red',
    //borderWidth: 2
  }
});
