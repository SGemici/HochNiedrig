/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player } from "../business/types";

type InfoElementProps = {
  transformRotateZ?: string;
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
        style={[
          InfoStyle.InfoModul,
          { transform: [{ rotateZ: this.props.transformRotateZ || "0deg" }] },
        ]}
      >
        <Text style={InfoStyle.TextModul}>
          ❌ {this.props.Player.statisticDrinkNumber}
        </Text>
      </View>
    );
  }
}
