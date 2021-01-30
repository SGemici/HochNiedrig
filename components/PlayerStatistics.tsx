/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player } from "../business/types";
import { COLORS } from "../styles/colors";

type InfoElementProps = {
  transformRotateZ?: string;
  Player: Player;
};
export class PlayerStatistics extends React.Component<InfoElementProps> {
  render() {
    const InfoStyle = StyleSheet.create({
      InfoModul: {
        flexDirection: "row",
        justifyContent: "space-around",
        display: "flex",
        width: "92%",
        alignItems: "stretch",
        alignSelf: "center",
      },
      TextModulName: {
        color: COLORS.iosSystemGray6,
        fontSize: 25,
        display: "flex",
        alignSelf: "flex-end",
      },
      TextModulStatistic: {
        color: COLORS.iosSystemGray6,
        fontSize: 20,
        display: "flex",
        alignSelf: "flex-end",
      },
    });
    return (
      <View
        style={[
          InfoStyle.InfoModul,
          { transform: [{ rotateZ: this.props.transformRotateZ || "0deg" }] },
        ]}
      >
        <Text style={InfoStyle.TextModulName}>{this.props.Player.name}</Text>
        <Text style={InfoStyle.TextModulStatistic}>
          ❌ {this.props.Player.statisticDrinkNumber}
        </Text>
      </View>
    );
  }
}
