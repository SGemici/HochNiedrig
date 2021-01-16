import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/colors";

type Props = {
  state: Boolean;
  onClick: Function;
  style?: Object;
  enabled?: boolean;
};

export class CheckButton extends React.Component<Props, {}> {
  getContent(state: Boolean) {
    const stylesText =
      this.props.style == undefined
        ? stylesCheckBox.StandardStyleText
        : this.props.style;

    const color = state
      ? COLORS.alertBackgroundGreen
      : COLORS.alertBackgroundRed;
    const CheckButtonElement = (
      <View style={stylesCheckBox.Container}>
        <Text style={stylesText}>{this.props.children}</Text>
        <View
          style={[stylesCheckBox.ButtonView, { backgroundColor: color }]}
        ></View>
      </View>
    );
    return CheckButtonElement;
  }

  render() {
    let enabled;
    if (this.props.enabled === false) {
      enabled = false;
    } else {
      enabled = true;
    }

    return (
      <TouchableOpacity
        disabled={!enabled}
        onPress={() => this.props.onClick()}
      >
        {this.getContent(this.props.state)}
      </TouchableOpacity>
    );
  }
}

const stylesCheckBox = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primaryBorder,
    margin: 10,
  },

  StandardStyleText: {
    display: "flex",
    justifyContent: "center",
    marginRight: 10,
    minWidth: "78%",
    maxWidth: "78%",
    fontSize: 16,
    color: COLORS.startTextColor,
    margin: 2,
  },

  ButtonView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primaryBorder,
    minWidth: "15%",
    maxWidth: "15%",
    marginTop: 2,
    marginBottom: 2,
    marginRight: 3,
  },
});
