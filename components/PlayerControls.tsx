import React from "react";
import { StyleSheet, View } from "react-native";
import { Player, PlayerAction } from "../business/types";
import { TextButton } from "./atoms/TextButton";
// STEUER-ELEMENT
type ControlElementProps = {
  inverseOrder: boolean;
  transformRotateZ: string;
  handlePlayerAction: (action: PlayerAction) => void;
  enabled: boolean;
  margin?: string;
  visibleSameButton?: Boolean;
};
export class PlayerControls extends React.Component<ControlElementProps> {
  render() {
    const opacityValue = this.props.enabled ? 1 : 0.2;

    const borderColor = "gray";

    const margin = this.props.margin == undefined ? "10%" : this.props.margin;

    const ControlElementsStyle = StyleSheet.create({
      // Steuer-Bereich
      controlModul: {
        margin: margin,
        justifyContent: "space-evenly",
        width: "100%",
        flexDirection: "row",
        padding: 2,
        transform: [{ rotateZ: "0deg" }],
        borderWidth: 2,
        borderRadius: 30,
        borderColor,
        opacity: opacityValue,
      },
    });

    const flexDirection = this.props.inverseOrder ? "row-reverse" : "row";
    const rotate = this.props.transformRotateZ;

    const visibleSameButton =
      this.props.visibleSameButton === undefined
        ? true
        : this.props.visibleSameButton;

    return (
      <View
        style={[
          ControlElementsStyle.controlModul,
          {
            flexDirection: flexDirection,
            transform: [{ rotateZ: rotate }],
          },
        ]}
      >
        <TextButton
          enabled={this.props.enabled}
          onClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_LOWER)
          }
        >
          ⬇️
        </TextButton>
        {visibleSameButton && (
          <TextButton
            enabled={this.props.enabled}
            withGradient={true}
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_EQUAL)
            }
          >
            =
          </TextButton>
        )}
        <TextButton
          enabled={this.props.enabled}
          onClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_HIGHER)
          }
        >
          ⬆️
        </TextButton>
      </View>
    );
  }
}
// -----
