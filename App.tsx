import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlayerControls } from './components/PlayerControls';
import { PlayerStatistics } from './components/PlayerStatistics';
import { TableModul } from './components/Table';


export default function App() {
  return (
    <View style={styles.container}>

      <PlayerControls inverseOrder={false} transformRotateZ={'180deg'} />

      <PlayerStatistics transformRotateZ={'180deg'} />

      <TableModul />

      <PlayerStatistics transformRotateZ={'0deg'} />

      <PlayerControls inverseOrder={false} transformRotateZ={'0deg'} />

    </View>
  );
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
