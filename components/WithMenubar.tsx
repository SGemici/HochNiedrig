import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextButton } from "./atoms/TextButton";

import { COLORS } from "../styles/colors";
import Spacings from "../styles/spacings";

type Props = {
  exitName: string;
  handleExit: Function;

  titleName: string;

  optionName?: string;
  handleOption?: Function;
};

export default class WithMenubar extends React.Component<Props> {
  render() {
    const optionName = this.props.optionName != undefined ? true : false;
    const optionFunction =
      this.props.optionName != undefined ? this.props.handleOption : null;
    return (
      <View>
        <View style={styles.menubar}>
          <TextButton
            onClick={() => this.props.handleExit()}
            textStyle={styles.menubarreturn}
          >
            {"< " + this.props.exitName}
          </TextButton>

          <Text style={styles.menubartitle}>{this.props.titleName}</Text>

          {optionName && optionFunction && (
            <TextButton
              onClick={() => optionFunction()}
              textStyle={styles.menubaroptions}
            >
              {this.props.optionName}
            </TextButton>
          )}
        </View>
        <View style={styles.childrenWrapper}>{this.props.children}</View>
      </View>
    );
  }
}

const menuBarHeight = 80;

const styles = StyleSheet.create({
  childrenWrapper: {
    paddingTop: menuBarHeight,
    zIndex: 0,
  },

  menubar: {
    position: "absolute",
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: menuBarHeight,
    minHeight: menuBarHeight,
    maxHeight: menuBarHeight,
    backgroundColor: COLORS.iosSystemGray6,
    paddingBottom: Spacings.Small,
    paddingTop: 45,
  },
  menubaroptions: {
    fontSize: 17,
    textAlign: "right",
    minWidth: "30%",
    color: COLORS.iosSystemBlue,
    paddingRight: Spacings.Small,
  },
  menubarreturn: {
    paddingLeft: Spacings.Small,
    fontSize: 17,
    color: COLORS.iosSystemBlue,
    minWidth: "30%",
  },
  menubartitle: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.brightText,
    minWidth: "40%",
  },
});
