import React from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";

type Props = {
  card: ImageSourcePropType;
  previouscard?: ImageSourcePropType;
};

export class CardDeck extends React.Component<Props> {
  render() {
    const width = 200;

    const ratio = 726 / 500;
    const height = width * ratio;

    const previouscard =
      this.props.previouscard === undefined ||
      this.props.card == this.props.previouscard
        ? 0
        : this.props.previouscard;
    return (
      <View>
        <Image
          source={previouscard}
          style={[sytles.previousCard, { width, height }]}
        />
        <Image source={this.props.card} style={{ width, height }} />
      </View>
    );
  }
}

const sytles = StyleSheet.create({
  previousCard: {
    position: "absolute",
    transform: [{ rotateZ: "153deg" }],
    opacity: 0.15,
  },
});
