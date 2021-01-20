import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { TextButton } from "./TextButton";
import { COLORS } from "../../styles/colors";

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    borderColor: COLORS.primaryBorder,
  },
});

export enum Emoji {
  redCircle = "🔴",
  blackCircle = "⚫️",
}

type ButtonProps = {
  enabled: boolean;
  onClick: Function;
  emoji: Emoji;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
};

export class EmojiButton extends React.Component<ButtonProps> {
  render() {
    return (
      <TextButton
        enabled={this.props.enabled}
        textStyle={(this.props.textStyle || {}, styles.text)}
        buttonStyle={(this.props.buttonStyle)}
        onClick={() => this.props.onClick()}
      >
        {this.props.emoji}
      </TextButton>
    );
  }
}
