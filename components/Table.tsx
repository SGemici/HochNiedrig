import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from "react-native";
import { COLORS } from "../styles/colors";
import { CardDeck } from "./CardDeck";

// Karte-Element

export class TableModul extends React.Component<{
  game: boolean;
  card: ImageSourcePropType;
  handleCardClicked: () => void;
}> {
  render() {
    const borderColor = this.props.game ? "transparent" : "gray";

    const ImageModulStyles = StyleSheet.create({
      // Bild-Bereich
      imageModul: {
        alignSelf: "stretch",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
        borderWidth: 2,
        borderRadius: 30,
        borderColor,
      },
      TextStyle: {
        fontSize: 100,
        color: COLORS.startTextColor,
      },
    });

    return (
      <TouchableOpacity
        style={ImageModulStyles.imageModul}
        onPress={() => this.props.handleCardClicked()}
      >
        {this.props.game ? (
          <CardDeck card={this.props.card} />
        ) : (
          <Text style={ImageModulStyles.TextStyle}> Start </Text>
        )}
      </TouchableOpacity>
    );
  }
}
// -----
