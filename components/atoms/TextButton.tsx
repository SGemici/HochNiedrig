import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const color = "white";

const ButtonElementsStyle = StyleSheet.create({
  ButtonStyle: {
    display: "flex",
    fontSize: 60,
  },
  ButtonStyleExtra: {
    display: "flex",
    fontSize: 55,
    color,
    position: "relative",
    top: -8,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    maxHeight: 59,
    marginTop: 7,
  },
});

type ButtonProps = {
  enabled?: boolean;
  onClick: Function;
  withGradient?: boolean;
  style?: Object;
};
export class TextButton extends React.Component<ButtonProps> {
  // TODO fix eslint issue, seems like we are not the only ones
  // https://github.com/typescript-eslint/typescript-eslint/issues/2477
  // eslint-disable-next-line no-undef
  withGradient(el: JSX.Element) {
    return (
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={ButtonElementsStyle.linearGradient}
      >
        {el}
      </LinearGradient>
    );
  }

  getContent() {
    const textStyle = this.props.withGradient
      ? ButtonElementsStyle.ButtonStyleExtra
      : ButtonElementsStyle.ButtonStyle;

    const textElement = (
      <Text style={[this.props.style || textStyle, {}]}>{this.props.children}</Text>
    );

    if (this.props.withGradient) {
      return this.withGradient(textElement);
    } else {
      return textElement;
    }
  }

  render() {
    return (
      <TouchableOpacity
        disabled={!(this.props.enabled || true)}
        onPress={() => this.props.onClick()}
      >
        {this.getContent()}
      </TouchableOpacity>
    );
  }
}
