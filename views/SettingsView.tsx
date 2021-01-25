import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckButton } from "../components/atoms/CheckButton";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";

import { COLORS } from "../styles/colors";

type Props = {
  handleExit: Function;

  changeSameButtonVisibleVar: Boolean;
  changeSameButtonVisible: Function;

  changeRedblackButtonVisibleVar: Boolean;
  changeRedblackButtonVisible: Function;

  changeStatisticVisibleVar: Boolean;
  changeStatisticVisible: Function;

  changePopupWrongActionReduceVar: Boolean;
  changePopupWrongActionReduce: Function;
};

export default class SettingsView extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={[styles.containerMainMenu, {}]}>
          <View style={[styles.HOCHNIEDRIG_LOGO, {}]}>
            <RotatableText
              text="Hoch-Niedrig"
              rotate={false}
              style={[
                styles.HOCHNIEDRIG_LOGO_TEXT,
                { fontSize: 50, width: "100%" },
              ]}
            />
          </View>

          <View style={[styles.SettingsView, {}]}>
            <View style={[styles.SettingsViewText, {}]}>
              <RotatableText
                text="Einstellungen"
                rotate={false}
                style={styles.SettingsViewText}
              />
            </View>
            <View style={[styles.SettingsList, {}]}>
              <CheckButton
                state={this.props.changeSameButtonVisibleVar}
                onClick={() => this.props.changeSameButtonVisible()}
              >
                Verwenden "Gleich-Button"
              </CheckButton>
              <CheckButton
                state={this.props.changeRedblackButtonVisibleVar}
                onClick={() => this.props.changeRedblackButtonVisible()}
              >
                Verwenden "Rot/Schwarz"
              </CheckButton>
              <CheckButton
                state={this.props.changeStatisticVisibleVar}
                onClick={() => this.props.changeStatisticVisible()}
              >
                Anzeigen "Statistik"
              </CheckButton>
              <CheckButton
                state={this.props.changePopupWrongActionReduceVar}
                onClick={() => this.props.changePopupWrongActionReduce()}
              >
                Falsche Aktion: 1 Sekunde
              </CheckButton>
            </View>
          </View>

          <View style={[styles.SettingsBackView, {}]}>
            <TextButton
              onClick={() => this.props.handleExit()}
              textStyle={styles.GameControlSettingsButtons}
            >
              ⏪
            </TextButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMainMenu: {
    display: "flex",
    height: "100%",
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },

  HOCHNIEDRIG_LOGO: {
    backgroundColor: "red",
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  HOCHNIEDRIG_LOGO_TEXT: {
    color: COLORS.brightText,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
  },

  SettingsView: {
    display: "flex",
    flexGrow: 0.1,
    margin: 20,
    width: "95%",
    borderWidth: 1,
    borderRadius: 20,
    alignContent: "center",
  },
  SettingsList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "space-between",
    margin: 10,
  },
  SettingsViewText: {
    color: COLORS.brightText,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },

  SettingsBackView: {
    margin: 30,
    width: "100%",
    // backgroundColor: COLORS.alertBackgroundRed,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  GameControlSettingsButtons: {
    fontSize: 45,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
