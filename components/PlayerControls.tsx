import React from "react";
import { StyleSheet, View } from "react-native";
import { PlayerAction } from "../business/types";
import { GleichButton, HochButton, NiedrigerButton } from "./Buttons";

// STEUER-ELEMENT
type ControlElementProps = {
  inverseOrder: boolean;
  transformRotateZ: string;
  gameState: boolean;
  handlePlayerAction: (action: PlayerAction) => void;
};
export class PlayerControls extends React.Component<ControlElementProps> {
  render() {
    const opacityValue = this.props.gameState ? 1 : 0.2;

    const borderColor = "gray";

    const ControlElementsStyle = StyleSheet.create({
      // Steuer-Bereich
      controlModul: {
        margin: "5%",
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
        {/* <NiedrigerButton GameState={this.props.gameState} /> */}
        <NiedrigerButton
          GameState={this.props.gameState}
          handleClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_LOWER)
          }
        />
        <GleichButton
          GameState={this.props.gameState}
          handleClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_EQUAL)
          }
        />
        <HochButton
          GameState={this.props.gameState}
          handleClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_HIGHER)
          }
        />
      </View>
    );
  }
}
// -----
