/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player } from "../business/types";
import { COLORS } from "../styles/colors";
import { Shadows } from "../styles/shadows";

type InfoElementProps = {
  transformRotateZ?: string;
  Player: Player;
};
export class PlayerStatistics extends React.Component<InfoElementProps> {
  render() {
    const InfoStyle = StyleSheet.create({
      InfoModul: {
        flexDirection: "row",
        justifyContent: "space-between",
        display: "flex",
        width: "75%",
        maxWidth: 500,
        alignSelf: "center",
      },
      TextModulName: {
        color: COLORS.brightText,
        fontSize: 25,
        display: "flex",
        alignSelf: "flex-end",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      TextModulStatistic: {
        color: COLORS.brightText,
        fontSize: 20,
        display: "flex",
        alignSelf: "flex-end",
        fontWeight: "bold",
      },
    });
    return (
      <View
        style={[
          InfoStyle.InfoModul,
          { transform: [{ rotateZ: this.props.transformRotateZ || "0deg" }] },
          Shadows.default,
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
