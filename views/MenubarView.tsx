import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextButton } from "../components/atoms/TextButton";

import { COLORS } from "../styles/colors";

type Props = {
  exitName: string;
  handleExit: Function;

  titleName: string;

  optionName?: string;
  handleOption?: Function;
};

export default class MenubarView extends React.Component<Props> {
  render() {
    const optionName = this.props.optionName != undefined ? true : false;
    const optionFunction =
      this.props.optionName != undefined ? this.props.handleOption : null;
    return (
      <View style={styles.menubar}>
        <View style={styles.menubarTop}></View>
        <View style={styles.menubarBottom}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menubar: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginBottom: 30,
    width: "100%",
    height: "11%",
    minHeight: "11%",
    maxHeight: "11%",
    backgroundColor: COLORS.appBackground,
  },

  menubarTop: {
    display: "flex",
    height: "50%",
    backgroundColor: COLORS.iosSystemGray6,
  },
  menubarBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.iosSystemGray6,
  },
  menubarreturn: {
    fontSize: 17,
    color: COLORS.iosSystemBlue,
    paddingLeft: 10,
    minWidth: "30%",
  },
  menubartitle: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.brightText,
    minWidth: "40%",
  },
  menubaroptions: {
    fontSize: 17,
    textAlign: "right",
    paddingRight: 10,
    minWidth: "30%",
    color: COLORS.iosSystemBlue,
  },
});
