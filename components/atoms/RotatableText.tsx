import React from "react";
import { Text } from "react-native";
import { TextStyles } from "../../styles/text";
type Props = {
  text: string;
  rotate?: boolean;
};

export class RotatableText extends React.Component<Props> {
  render() {
    const transform = this.props.rotate ? [{ rotateZ: "180deg" }] : [];
    return (
      <Text style={[TextStyles.popup, { transform }]}>{this.props.text}</Text>
    );
  }
}
