import React from "react";
import { StyleSheet, View } from "react-native";
import { PlayerAction } from "../business/types";
import { Emoji, EmojiButton } from "./atoms/EmojiButton";
import { TextButton } from "./atoms/TextButton";

type ControlElementProps = {
  handlePlayerAction: (action: PlayerAction) => void;
};
export class PlayerControlsFull extends React.Component<ControlElementProps> {
  render() {
    const borderColor = "gray";

    const styles = StyleSheet.create({
      base: {
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
      },
      wrapper: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor,
        flexDirection: "column",
      },
      colorPicker: {
        marginBottom: 10
      },
      orderPicker: {
        flexDirection: "row",
      },
    });

    return (
      <View style={[styles.base, styles.wrapper]}>
        <View style={[styles.base, styles.colorPicker]}>
          <EmojiButton
            enabled={true}
            emoji={Emoji.blackCircle}
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_BLACK)
            }
            buttonStyle={{ margin: 10, padding: 10 }}
          />
          <EmojiButton
            enabled={true}
            emoji={Emoji.redCircle}
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_RED)
            }
            buttonStyle={{ margin: 10, padding: 10 }}
          />
        </View>
        <View style={[styles.base, styles.orderPicker]}>
          <TextButton
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_LOWER)
            }
          >
            ⬇️
          </TextButton>
          <TextButton
            withGradient={true}
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_EQUAL)
            }
          >
            =
          </TextButton>
          <TextButton
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_HIGHER)
            }
          >
            ⬆️
          </TextButton>
        </View>
      </View>
    );
  }
}
