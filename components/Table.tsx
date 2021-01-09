import React from "react";
import { StyleSheet, ImageSourcePropType, View } from "react-native";
import { cards } from "../business/cards";
import { RotatableTextTable } from "./atoms/RotatableText";
import { CardDeck } from "./CardDeck";

// Karte-Element

export class TableModul extends React.Component<{
  card: ImageSourcePropType;
  laidsCards: number;
}> {
  render() {
    const borderColor = "transparent";
    const laidsCardsStr = this.props.laidsCards + "/" + cards.length;

    const ImageModulStyles = StyleSheet.create({
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
    });

    return (
      <View style={ImageModulStyles.imageModul}>
        <View>
          <RotatableTextTable
            text={laidsCardsStr}
            rotate={true}
          ></RotatableTextTable>
          <CardDeck card={this.props.card} />
          <RotatableTextTable text={laidsCardsStr}></RotatableTextTable>
        </View>
      </View>
    );
  }
}
// -----
