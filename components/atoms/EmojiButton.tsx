import React from "react";
import { StyleSheet } from "react-native";
import { TextButton } from "./TextButton";
import { COLORS } from "../../styles/colors";

const ButtonElementsStyle = StyleSheet.create({
  buttonStyle: {
    fontSize: 35,
    borderWidth: 1,
    borderRadius: 5,
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
};

export class EmojiButton extends React.Component<ButtonProps> {
  render() {
    return (
      <TextButton
        enabled={this.props.enabled}
        style={ButtonElementsStyle.buttonStyle}
        onClick={() => this.props.onClick()}
      >
        {this.props.emoji}
      </TextButton>
    );
  }
}
