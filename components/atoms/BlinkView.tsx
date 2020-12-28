import React from "react";
import { View } from "react-native";

type ViewProps = {
  blinking: boolean;
  style?: Object;
};

export class BlinkView extends React.Component<ViewProps> {
  intervalId: any = null;

  state = { opacityValue: 1 };
  constructor(props: ViewProps) {
    super(props);
    this.state = { opacityValue: 1 };
  }

  componentDidMount(): void {
    if (this.props.blinking == true) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval((): void => {
        if (this.state.opacityValue == 1.0) {
          this.setState({ opacityValue: 0.1 });
        } else if (this.state.opacityValue == 0.1) {
          this.setState({ opacityValue: 1.0 });
        }
      }, 1000 + 1);
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.intervalId);
  }

  render() {
    const blink = this.props.blinking;
    const opacityValue = blink ? this.state.opacityValue : 1;
    if (!blink) {
      // Discuss Claudio: https://github.com/BricePissard/react-native-blink-view
      // Why must a componentWillUnmount
      // <BlinkView blinking={blink}> before TABEL.tsx =return (<TouchableOpacity ...
      // Then it flashes continue but blink=False
      this.componentWillUnmount();
    } else {
      this.componentDidMount();
    }

    return (
      <View style={[this.props.style, { opacity: opacityValue }]}>
        {this.props.children}
      </View>
    );
  }
}
