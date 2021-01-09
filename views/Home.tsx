import React from "react";
import { StyleSheet, View } from "react-native";
import { RotatableText } from "../components/atoms/RotatableText";
import { TextButton } from "../components/atoms/TextButton";

import { COLORS } from "../styles/colors";

type Props = {
  handleTwoPlayerGameStartIntent: Function
}

export default class Home extends React.Component<Props> {
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

          <View style={[styles.MainGamePlayer, {}]}>
            <View style={[styles.MainGamePlayerText, {}]}>
              <RotatableText
                text="Spieleranzahl"
                rotate={false}
                style={styles.MainGamePlayerText}
              />
            </View>
            <View style={[styles.MainGamePlayerChoice, {}]}>
              <TextButton
                enabled={false}
                onClick={() => console.log("1")}
                style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
              >
                1️⃣
              </TextButton>
              <TextButton
                onClick={this.props.handleTwoPlayerGameStartIntent}
                style={styles.MainGamePlayerButtons}
              >
                2️⃣
              </TextButton>
            </View>
            <View style={[styles.MainGamePlayerChoice, {}]}>
              <TextButton
                enabled={false}
                onClick={() => console.log("3")}
                style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
              >
                3️⃣
              </TextButton>
              <TextButton
                enabled={false}
                onClick={() => console.log("4")}
                style={[styles.MainGamePlayerButtons, { opacity: 0.2 }]}
              >
                4️⃣
              </TextButton>
            </View>
          </View>

          <View style={[styles.MainGameSettings, {}]}>
            <TextButton
              enabled={false}
              onClick={() => console.log("tutorial")}
              style={[styles.MainGameSettingsButtons, { opacity: 0.2 }]}
            >
              📖
            </TextButton>
            <TextButton
              enabled={false}
              onClick={() => console.log("")}
              style={[styles.MainGameSettingsButtons, { opacity: 0.2 }]}
            >
              ⚙️
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
    color: COLORS.startTextColor,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
  },

  MainGameSettingsButtons: {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 40,
    borderColor: COLORS.primaryBorder,
    overflow: "hidden",
  },
  MainGamePlayer: {
    display: "flex",
    flexGrow: 0.1,
    margin: 20,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    alignContent: "center",
  },
  MainGamePlayerChoice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  MainGamePlayerText: {
    color: COLORS.startTextColor,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    margin: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  MainGamePlayerButtons: {
    // backgroundColor: "red",
    margin: 5,
    fontSize: 70,
    color: COLORS.startTextColor,
    overflow: "hidden",
    borderColor: COLORS.primaryBorder,
  },

  MainGameSettings: {
    margin: 30,
    width: "100%",
    // backgroundColor: COLORS.alertBackgroundRed,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  PlayerSpecials: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "center",
    margin: 0,
  },  
});
