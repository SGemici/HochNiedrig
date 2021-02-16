import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RotatableText } from "./atoms/RotatableText";
import { COLORS } from "../styles/colors";
import { Shadows } from "../styles/shadows";
import { cardLogo1, cardLogo2, cardLogo3, cardLogo4 } from "../business/cards";

export class Logo extends React.Component {
  render() {
    return (
      <View style={[styles.container, Shadows.default]}>
        <LinearGradient
          colors={[COLORS.appBackground, "#eadebd"]}
          style={styles.background}
          start={[0, 0]}
          end={[1, 0.8]}
          locations={[0.1, 0.4]}
        ></LinearGradient>

        <LinearGradient
          colors={["transparent", COLORS.appBackground]}
          style={styles.background}
          start={[0, 0]}
          end={[1, 1]}
          locations={[0.1, 1]}
        ></LinearGradient>

        <View style={[styles.ImagesView, Shadows.default]}>
          <View style={styles.ImageView1}>
            <Image source={cardLogo1} style={styles.image} />
          </View>
          <View style={styles.ImageView2}>
            <Image source={cardLogo2} style={styles.image} />
          </View>
          <View style={styles.ImageView3}>
            <Image source={cardLogo3} style={styles.image} />
          </View>
          <View style={styles.ImageView4}>
            <Image source={cardLogo4} style={styles.image} />
          </View>
        </View>

        <View style={[styles.HOCHNIEDRIG_LOGO, Shadows.default]}>
          <RotatableText
            text={"Hoch-Niedrig"}
            rotate={true}
            rotateValue={"0deg"}
            style={[styles.HOCHNIEDRIG_LOGO_TEXT, Shadows.default]}
          ></RotatableText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    height: "80%",
  },
  container: {
    alignSelf: "center",
    marginTop: 50,
    padding: 7,
    overflow: "hidden",
    width: "100%",
  },
  HOCHNIEDRIG_LOGO: {
    marginTop: 70,
    alignSelf: "center",
  },
  HOCHNIEDRIG_LOGO_TEXT: {
    color: COLORS.brightText,
    fontSize: 45,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textShadowColor: COLORS.iosSystemGreen,
    display: "flex",
    alignItems: "center",

    borderRadius: 50,
    padding: 15,
    width: "100%",
  },

  ImagesView: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  ImageView1: {
    position: "absolute",
    width: 60,
    height: 70,
    transform: [{ rotateZ: "160deg" }],
  },
  ImageView2: {
    position: "absolute",
    width: 60,
    height: 70,
  },
  ImageView3: {
    position: "absolute",
    width: 60,
    height: 70,
    transform: [{ rotateZ: "200deg" }],
  },
  ImageView4: {
    position: "absolute",
    width: 60,
    height: 70,
    transform: [{ rotateZ: "225deg" }],
  },
  image: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
