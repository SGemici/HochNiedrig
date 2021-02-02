import React from "react";
import { StyleSheet, View } from "react-native";
import { CircularButton } from "../components/atoms/CircularButon";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";

import { COLORS } from "../styles/colors";
import { Shadows } from "../styles/shadows";

type Props = {
  handleOnePlayerGameStartIntent: Function;
  handleTwoPlayerGameStartIntent: Function;
  handleThreePlayerGameStartIntent: Function;
  handleFourPlayerGameStartIntent: Function;
  handleSettingsGameStartIntent: Function;
};

export default class HomeView extends React.Component<Props> {
  render() {
    return (
      <View style={Shadows.default}>
        <View style={[styles.containerMainMenu, Shadows.default]}>
          <View style={[styles.HOCHNIEDRIG_LOGO, Shadows.default]}>
            <RotatableText
              text="Hoch-Niedrig"
              rotate={false}
              style={[
                styles.HOCHNIEDRIG_LOGO_TEXT,
                { fontSize: 50, width: "100%" },
                Shadows.default,
              ]}
            />
          </View>

          <View style={[styles.MainGamePlayer, Shadows.default]}>
            <View style={[styles.MainGamePlayerText, {}]}>
              <RotatableText
                text="Spiel starten:"
                rotate={false}
                style={styles.MainGamePlayerText}
              />
            </View>
            <TextButton
              onClick={() => this.props.handleOnePlayerGameStartIntent()}
              buttonStyle={{
                borderWidth: 2,
                borderColor: COLORS.brightText,
                borderRadius: 30,
                marginBottom: 15,
                padding: 5,
              }}
              textStyle={{
                color: COLORS.brightText,
                fontSize: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              1 Spieler
            </TextButton>
            <TextButton
              onClick={() => this.props.handleTwoPlayerGameStartIntent()}
              buttonStyle={{
                borderWidth: 2,
                borderColor: COLORS.brightText,
                borderRadius: 30,
                marginBottom: 15,
                padding: 5,
              }}
              textStyle={{
                color: COLORS.brightText,
                fontSize: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              2 Spieler
            </TextButton>
            <TextButton
              onClick={() => this.props.handleThreePlayerGameStartIntent()}
              buttonStyle={{
                borderWidth: 2,
                borderColor: COLORS.brightText,
                borderRadius: 30,
                marginBottom: 15,
                padding: 5,
              }}
              textStyle={{
                color: COLORS.brightText,
                fontSize: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              3 Spieler
            </TextButton>
            <TextButton
              onClick={() => this.props.handleFourPlayerGameStartIntent()}
              buttonStyle={{
                borderWidth: 2,
                borderColor: COLORS.brightText,
                borderRadius: 30,
                marginBottom: 15,
                padding: 5,
              }}
              textStyle={{
                color: COLORS.brightText,
                fontSize: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              4 Spieler
            </TextButton>
          </View>

          <View style={[styles.MainGameSettings, {}]}>
            <CircularButton
              onClick={() => this.props.handleSettingsGameStartIntent()}
              symbol="⚙️"
              upsideDown={false}
            />
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
    alignSelf: "center",
    marginTop: 40,
    overflow: "hidden",
  },
  HOCHNIEDRIG_LOGO_TEXT: {
    color: COLORS.brightText,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.brightText,
    borderRadius: 50,
    padding: 25,
  },
  MainGamePlayer: {
    display: "flex",
    flexGrow: 0.1,
    margin: 20,
    width: "80%",
    alignContent: "center",
  },
  MainGamePlayerChoice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  MainGamePlayerText: {
    color: COLORS.brightText,
    fontSize: 40,
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  MainGamePlayerButtons: {
    // backgroundColor: "red",
    margin: 5,
    fontSize: 70,
    color: COLORS.brightText,
    overflow: "hidden",
  },

  MainGameSettings: {
    margin: 30,
    width: "100%",
    // backgroundColor: COLORS.alertBackgroundRed,
    borderRadius: 12,

    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },

  PlayerSpecials: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "center",
    margin: 0,
  },
});
