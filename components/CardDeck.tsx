import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";

type Props = {
  card: ImageSourcePropType;
};

export class CardDeck extends React.Component<Props> {
  render() {
    const width = 180;

    const ratio = 726 / 500;
    const height = width * ratio;

    return (
      <View>
        <Image source={this.props.card} style={{ width, height }} />
      </View>
    );
  }
}
