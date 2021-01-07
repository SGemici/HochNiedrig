import React from "react";
import { Text } from "react-native";
import { TextStyles } from "../../styles/text";
type Props = {
  text: string;
  rotate?: boolean;
  style?: Object;
};

export class RotatableText extends React.Component<Props> {
  render() {
    const styles =
      this.props.style == undefined ? TextStyles.popup : this.props.style;

    const transform = this.props.rotate ? [{ rotateZ: "180deg" }] : [];
    return <Text style={[styles, { transform }]}>{this.props.text}</Text>;
  }
}

export class RotatableTextTable extends React.Component<Props> {
  render() {
    const transform = this.props.rotate ? [{ rotateZ: "180deg" }] : [];
    const marginRight = this.props.rotate ? 10 : 0;
    const marginLeft = !this.props.rotate ? 10 : 0;
    return (
      <Text
        style={[TextStyles.CardInfos, { transform, marginRight, marginLeft }]}
      >
        {this.props.text}
      </Text>
    );
  }
}
