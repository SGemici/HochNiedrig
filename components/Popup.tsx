import React from "react";
import { View, StyleSheet } from "react-native";

export function Popup(props: { children: React.ReactNode }) {
  const styles = StyleSheet.create({
    // Bild-Bereich
    popup: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
    },
    popupContent: {
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 30,
      borderColor: "black",
      borderWidth: 2,
      backgroundColor: "#ADD8E6",
    },
  });

  return (
    <View style={styles.popup}>
      <View style={styles.popupContent}>{props.children}</View>
    </View>
  );
}
