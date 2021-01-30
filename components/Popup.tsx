import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import { Shadows } from "../styles/shadows";
export class Popup extends React.Component<{}> {
  render() {
    const styles = StyleSheet.create({
      popup: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.popupBackground,
      },
      popupContent: {
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 30,
        backgroundColor: COLORS.appBackground,
        padding: 15,
      },
    });

    return (
      <View style={styles.popup}>
        <View style={[styles.popupContent, Shadows.default]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
