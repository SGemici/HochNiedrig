/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player } from "../business/types";

type InfoElementProps = {
  Player: Player;
};
export class PlayerStatistics extends React.Component<InfoElementProps> {
  render() {
    const InfoStyle = StyleSheet.create({
      InfoModul: {
        flexDirection: "row",
        justifyContent: "center",
        display: "flex",
        width: "100%",
      },
      TextModul: {
        color: "white",
      },
    });
    return (
      <View
        style={InfoStyle.InfoModul}
      >
        <Text style={InfoStyle.TextModul}>
          🍺 {this.props.Player.statisticDrinkNumber}{" "}
        </Text>
      </View>
    );
  }
}
