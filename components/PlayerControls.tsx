import React from "react";
import { StyleSheet, View } from "react-native";
import { Player, PlayerAction } from "../business/types";
import { GleichButton, HochButton, NiedrigerButton } from "./Buttons";

// STEUER-ELEMENT
type ControlElementProps = {
  inverseOrder: boolean;
  transformRotateZ: string;
  gameState: boolean;
  handlePlayerAction: (action: PlayerAction) => void;
  activePlayer: Player;
  ownerPlayerOfTheControl: Player;
};
export class PlayerControls extends React.Component<ControlElementProps> {
  render() {
    const ownerIsActivePlayer =
      this.props.ownerPlayerOfTheControl == this.props.activePlayer
        ? true
        : false;

    const disableButton =
      this.props.gameState && ownerIsActivePlayer ? false : true;

    const opacityValue = this.props.gameState && ownerIsActivePlayer ? 1 : 0.2;

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
          disabled={disableButton}
        />
        <GleichButton
          GameState={this.props.gameState}
          handleClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_EQUAL)
          }
          disabled={disableButton}
        />
        <HochButton
          GameState={this.props.gameState}
          handleClick={() =>
            this.props.handlePlayerAction(PlayerAction.CHOOSE_HIGHER)
          }
          disabled={disableButton}
        />
      </View>
    );
  }
}
// -----
