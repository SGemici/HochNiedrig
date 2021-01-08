/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Player } from "../business/types";

// INFO-Bereich
type InfoElementProps = {
  transformRotateZ: string;
  GameState: boolean;
  Player: Player;
};
export class PlayerStatistics extends React.Component<InfoElementProps> {
  render() {
    const OpacityValue = this.props.GameState ? 1 : 0.2;

    const MarginTopValue = this.props.transformRotateZ == "0deg" ? 7 : 0;
    const MarginBottomValue = this.props.transformRotateZ == "180deg" ? 7 : 0;

    const InfoStyle = StyleSheet.create({
      InfoModul: {
        flexDirection: "row",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        opacity: OpacityValue,
        marginTop: MarginTopValue,
        marginBottom: MarginBottomValue,
      },
      TextModul: {
        color: "white",
      },
    });
    return (
      <View
        style={[
          InfoStyle.InfoModul,
          { transform: [{ rotateZ: this.props.transformRotateZ }] },
        ]}
      >
        <Text style={InfoStyle.TextModul}>
          🍺 {this.props.Player.statisticDrinkNumber}{" "}
        </Text>
      </View>
    );
  }
}

// -----
