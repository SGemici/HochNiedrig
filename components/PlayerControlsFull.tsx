import React from "react";
import { StyleSheet, View } from "react-native";
import { PlayerAction } from "../business/types";
import { COLORS } from "../styles/colors";
import { Shadows } from "../styles/shadows";
import { CircularButton } from "./atoms/CircularButon";
import { ColoredCircularButton } from "./atoms/ColoredCircularButon";

type ControlElementProps = {
  handlePlayerAction: (action: PlayerAction) => void;
  visibleSameButton?: Boolean;
  visibleRedBlackButton?: Boolean;
};
export class PlayerControlsFull extends React.Component<ControlElementProps> {
  render() {
    const visibleSameButton =
      this.props.visibleSameButton === undefined
        ? true
        : this.props.visibleSameButton;
    const visibleRedBlackButton =
      this.props.visibleRedBlackButton === undefined
        ? true
        : this.props.visibleRedBlackButton;

    const styles = StyleSheet.create({
      base: {
        width: "90%",
        maxWidth: 500,
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: COLORS.appBackground,
      },
      wrapper: {
        padding: 20,
        borderRadius: 30,
        flexDirection: "column",
        marginTop: 5,
      },
      colorPicker: {
        marginBottom: 30,
      },
      orderPicker: {
        flexDirection: "row",
      },
    });

    return (
      <View style={[styles.base, styles.wrapper, Shadows.default]}>
        {visibleRedBlackButton && (
          <View style={[styles.base, styles.colorPicker]}>
            <ColoredCircularButton
              onClick={() =>
                this.props.handlePlayerAction(PlayerAction.CHOOSE_RED)
              }
              color="red"
            />
            <ColoredCircularButton
              onClick={() =>
                this.props.handlePlayerAction(PlayerAction.CHOOSE_BLACK)
              }
              color="black"
            />
          </View>
        )}

        <View style={[styles.base, styles.orderPicker]}>
          <CircularButton
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_LOWER)
            }
            upsideDown={true}
            // symbol="⇩"
            symbol="⇧"
          />
          {visibleSameButton && (
            <CircularButton
              onClick={() =>
                this.props.handlePlayerAction(PlayerAction.CHOOSE_EQUAL)
              }
              upsideDown={false}
              symbol="="
            />
          )}
          <CircularButton
            onClick={() =>
              this.props.handlePlayerAction(PlayerAction.CHOOSE_HIGHER)
            }
            upsideDown={false}
            symbol="⇧"
          />
        </View>
      </View>
    );
  }
}
