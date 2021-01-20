import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
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
  textStyle?: TextStyle | TextStyle[];
  buttonStyle?: ViewStyle | ViewStyle[] ;
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
      <Text style={[this.props.textStyle || textStyle, {}]}>
        {this.props.children}
      </Text>
    );

    if (this.props.withGradient) {
      return this.withGradient(textElement);
    } else {
      return textElement;
    }
  }

  render() {

    // this sucks hard
    // use default props
    let enabled;
    if (this.props.enabled === false) {
      // enabled is undefined
      // fallback to true
      enabled = false;
    } else {
      enabled = true;
    }

    return (
      <TouchableOpacity
        disabled={!enabled}
        onPress={() => this.props.onClick()}
        style={this.props.buttonStyle}
      >
        {this.getContent()}
      </TouchableOpacity>
    );
  }
}
