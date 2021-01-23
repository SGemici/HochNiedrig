import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

type PopupProps = {
  showBackgroundAlert?: COLORS;
};

export class Popup extends React.Component<PopupProps> {
  render() {
    const styles = StyleSheet.create({
      popup: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.91,
        backgroundColor: this.props.showBackgroundAlert,
      },
      popupContent: {
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 30,
        borderColor: COLORS.secondaryBorder,
        borderWidth: 2,
        backgroundColor: COLORS.appBackground,
        padding: 15,
      },
    });

    return (
      <View style={styles.popup}>
        <View style={styles.popupContent}>{this.props.children}</View>
      </View>
    );
  }
}
