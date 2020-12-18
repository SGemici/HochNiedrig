import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
export class TableModul extends React.Component<{
  game: boolean;
  handleCardClicked: () => void;
}> {
  _checkGameState() {
    if (this.props.game) {
      alert("Spiel beginnt");
    }
  }

  render() {
    const borderColor = "gray";
    const ImageModulStyles = StyleSheet.create({
      // Bild-Bereich
      imageModul: {
        alignSelf: "stretch",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor,
      },
      TextStyle: {
        fontSize: 100,
      },
    });

    return (
      <TouchableOpacity
        style={ImageModulStyles.imageModul}
        onPress={() => this.props.handleCardClicked()}
      >
        <Text style={ImageModulStyles.TextStyle}>
          {" "}
          {this.props.game ? "🃏" : "Spiel start"}
        </Text>
      </TouchableOpacity>
    );
  }
}
