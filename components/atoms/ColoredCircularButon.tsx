import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
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
    backgroundColor: COLORS.red,
  },
});

type ButtonColor = "red" | "black";

type ButtonProps = {
  onClick: Function;
  color: ButtonColor;
};
export class ColoredCircularButton extends React.Component<ButtonProps> {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={[styles.button, { backgroundColor: "white" }, Shadows.default]}
      >
        <View
          style={[
            styles.button,
            {
              borderWidth: 0,
              width: 46,
              height: 46,
              backgroundColor:
                this.props.color === "red" ? COLORS.red : COLORS.black,
            },
          ]}
        ></View>
      </TouchableOpacity>
    );
  }
}
