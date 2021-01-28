/* eslint-disable react-native/no-color-literals */
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CheckButton } from "../components/atoms/CheckButton";
import { CheckBoxGroup } from "../components/CheckBoxGroup";
import { COLORS } from "../styles/colors";
import MenubarView from "./MenubarView";

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

  changeShowPlayerPositionVar: Boolean;
  changeShowPlayerPosition: Function;
};

export default class SettingsViewIos extends React.Component<Props> {
  render() {
    return (
      <View style={styles.view}>
        <MenubarView
          exitName="Zurück"
          handleExit={() => this.props.handleExit()}
          titleName="Einstellungen"
          // handleOption={() => console.log("asd")}
          // optionName="Einstellungen"
        />
        <ScrollView>
          <CheckBoxGroup groupName="Spielsteuerung">
            <CheckButton
              state={this.props.changeSameButtonVisibleVar}
              onClick={() => this.props.changeSameButtonVisible()}
              title="Gleich-Button"
              subtitle="Verwenden vom Gleich-Button"
            ></CheckButton>
            <CheckButton
              state={this.props.changeRedblackButtonVisibleVar}
              onClick={() => this.props.changeRedblackButtonVisible()}
              title="Rot/Schwarz"
              subtitle="Verwenden von rot/schwarz-Button"
            ></CheckButton>
          </CheckBoxGroup>
          <CheckBoxGroup groupName="Informationen">
            <CheckButton
              state={this.props.changeStatisticVisibleVar}
              onClick={() => this.props.changeStatisticVisible()}
              title="Statistik"
              subtitle="Anzeigen der Spielerstatistik"
            ></CheckButton>
          </CheckBoxGroup>
          <CheckBoxGroup groupName="Spielverhalten">
            <CheckButton
              state={this.props.changePopupWrongActionReduceVar}
              onClick={() => this.props.changePopupWrongActionReduce()}
              title="1 Sekunde"
              subtitle="Dauer einer falschen Aktion reduzieren"
            ></CheckButton>
          </CheckBoxGroup>
          <CheckBoxGroup groupName="Anleitung">
            <CheckButton
              state={this.props.changeShowPlayerPositionVar}
              onClick={() => this.props.changeShowPlayerPosition()}
              title="Spielerposition"
              subtitle="Vor Spielbeginn die Spielerpositionen anzeigen "
            ></CheckButton>
          </CheckBoxGroup>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.secondaryBorder,
    position: "absolute",
    bottom: 0,
    top: 0,
  },
});
