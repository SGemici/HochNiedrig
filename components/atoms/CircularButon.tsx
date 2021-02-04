import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { COLORS } from "../../styles/colors";
import { Shadows } from "../../styles/shadows";

const width = 50;

const styles = StyleSheet.create({
  button: {
    width,
    height: width,
    borderWidth: 2,
    borderColor: COLORS.brightText,
    borderRadius: width / 2,
  },
  text: {
    width,
    height: width,
    fontSize: 30,
    color: COLORS.brightText,
    textAlign: "center",
    lineHeight: width,
    position: "relative",
    left: -2,
    top: -3,
  },
  upsideDown: { transform: [{ rotateZ: "180deg" }] },
});

type ButtonProps = {
  onClick: Function;
  symbol: string;
  upsideDown: boolean;
};
export class CircularButton extends React.Component<ButtonProps> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={[styles.button, Shadows.default]}
      >
        <Text style={[styles.text, this.props.upsideDown && styles.upsideDown]}>
          {this.props.symbol}
        </Text>
      </TouchableOpacity>
    );
  }
}
