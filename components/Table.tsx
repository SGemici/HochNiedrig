import React from "react";
import { StyleSheet, ImageSourcePropType, View } from "react-native";
import { cards } from "../business/cards";
import { Shadows } from "../styles/shadows";
import { RotatableTextTable } from "./atoms/RotatableText";
import { CardDeck } from "./CardDeck";

// Karte-Element

export class TableModul extends React.Component<{
  card: ImageSourcePropType;
  laidsCards: number;
  showBothSideLaids?: boolean;
  previouscard?: ImageSourcePropType;
}> {
  render() {
    const laidsCardsStr = this.props.laidsCards + "/" + cards.length;
    const showBothSideLaids =
      this.props.showBothSideLaids || this.props.showBothSideLaids == undefined
        ? true
        : false;
    const ImageModulStyles = StyleSheet.create({
      imageModul: {
        alignSelf: "stretch",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
      },
    });

    return (
      <View style={[ImageModulStyles.imageModul, Shadows.default]}>
        <View>
          {showBothSideLaids && (
            <RotatableTextTable
              text={laidsCardsStr}
              rotate={true}
            ></RotatableTextTable>
          )}
          <CardDeck
            card={this.props.card}
            previouscard={this.props.previouscard}
          />
          <RotatableTextTable text={laidsCardsStr}></RotatableTextTable>
        </View>
      </View>
    );
  }
}
// -----
