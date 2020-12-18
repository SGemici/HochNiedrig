import React from "react";
import { StyleSheet, View, Text } from "react-native";

// INFO-Bereich
type InfoElementProps = {
  transformRotateZ: string;
  GameState: boolean;
};
export class PlayerStatistics extends React.Component<InfoElementProps> {
  render() {
    const OpacityValue = this.props.GameState ? 1 : 0.2;

    const InfoStyle = StyleSheet.create({
      InfoModul: {
        flexDirection: "row",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        opacity: OpacityValue,
      },
    });
    return (
      <View
        style={[
          InfoStyle.InfoModul,
          { transform: [{ rotateZ: this.props.transformRotateZ }] },
        ]}
      >
        <Text>🍺 0</Text>
      </View>
    );
  }
}

// -----
