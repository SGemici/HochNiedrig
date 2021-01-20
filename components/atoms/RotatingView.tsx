/**
 * Created by nirlevy on 02/07/2017.
 * MIT Licence
 */
import React, { Component } from "react";
import { Animated, Easing, ViewProps } from "react-native";

type ViewState = {
  spinValue: Animated.Value;
};

type RotatingViewProps = ViewProps & {
  degree: number;
  toValue?: number;
  duration?: number;
  onFinishedAnimating?: (result: { finished: boolean }) => void;
};

export class RotatingView extends Component<RotatingViewProps, ViewState> {
  state = {
    spinValue: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      this.state.spinValue, // The animated value to drive
      {
        toValue: this.props.toValue || 1, // Animate to 360/value
        duration: this.props.duration || 2000, // Make it take a while
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(this.props.onFinishedAnimating); // Starts the animation
  }

  render() {
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", `${this.props.degree}deg`],
    });
    return (
      <Animated.View
        style={{
          ...((this.props.style as object) || {}),
          transform: [{ rotate: spin }], // Bind rotation to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

/*
USAGE:
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <RotatingView
            style={{height: 200, width: 200,}}
            duration={3000}
            onFinishedAnimating={( (status) => {console.log(status)} )}
        >
            <Image
                style={{height:'100%', width: '100%', resizeMode: 'contain'}}
                resizeMode='contain'
                source={require("image.png")}/>
        </RotatingView>
    </View>
*/
