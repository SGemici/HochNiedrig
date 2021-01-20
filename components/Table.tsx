import React from "react";
import { StyleSheet, ImageSourcePropType, View, Text } from "react-native";
import { cards } from "../business/cards";
import { COLORS } from "../styles/colors";
import { CardDeck } from "./CardDeck";

const styles = StyleSheet.create({
  text: {
    color: COLORS.brightText,
  },
  wrapper: {
    alignSelf: "stretch",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export class TableModul extends React.Component<{
  card: ImageSourcePropType;
  laidsCards: number;
  showBothSideLaids?: boolean;
}> {
  render() {
    const laidsCardsStr = this.props.laidsCards + "/" + cards.length;
    return (
      <View style={styles.wrapper}>
        <View>
          <CardDeck card={this.props.card} />
          <Text style={styles.text}>{laidsCardsStr}</Text>
        </View>
      </View>
    );
  }
}
