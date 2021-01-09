import React from "react";
import { View } from "react-native";

type ViewProps = {
  blinking: boolean;
  style?: Object;
};

export class BlinkView extends React.Component<ViewProps> {
  intervalId?: number;

  state = { opacityValue: 1 };
  constructor(props: ViewProps) {
    super(props);
    this.state = { opacityValue: 1 };
  }

  componentDidMount(): void {
    console.log("componentDidMount")
    if (this.props.blinking == true) {
      clearInterval(this.intervalId);
      this.intervalId = window.setInterval((): void => {
        if (this.state.opacityValue == 1.0) {
          this.setState({ opacityValue: 0.1 });
        } else if (this.state.opacityValue == 0.1) {
          this.setState({ opacityValue: 1.0 });
        }
      }, 1000 + 1);
    }
  }
  
  componentWillUnmount(): void {
    console.log("componentWillUnmount")
    clearInterval(this.intervalId);
  }

  render() {
    const blink = this.props.blinking;
    const opacityValue = blink ? this.state.opacityValue : 1;

    return (
      <View style={[this.props.style, { opacity: opacityValue }]}>
        {this.props.children}
      </View>
    );
  }
}
