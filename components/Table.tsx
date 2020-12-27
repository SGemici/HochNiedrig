import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageSourcePropType,
  View,
} from "react-native";
import { cards } from "../business/cards";
import { COLORS } from "../styles/colors";
import { RotatableTextTable } from "./atoms/RotatableText";
import { CardDeck } from "./CardDeck";

// Karte-Element

export class TableModul extends React.Component<{
  game: boolean;
  card: ImageSourcePropType;
  handleCardClicked: () => void;
  laidsCards: number;
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
        fontSize: 95,
        color: COLORS.startTextColor,
        textDecorationLine: "underline",
        fontStyle: "italic",
      },
    });

    const laidsCardsStr = this.props.laidsCards + "/" + cards.length;
    return (
      <TouchableOpacity
        style={ImageModulStyles.imageModul}
        onPress={() => this.props.handleCardClicked()}
      >
        {this.props.game ? (
          <View>
            <RotatableTextTable
              text={laidsCardsStr}
              rotate={true}
            ></RotatableTextTable>
            <CardDeck card={this.props.card} />
            <RotatableTextTable text={laidsCardsStr}></RotatableTextTable>
          </View>
        ) : (
          <Text style={ImageModulStyles.TextStyle}> Start </Text>
        )}
      </TouchableOpacity>
    );
  }
}
// -----
