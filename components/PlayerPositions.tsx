/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RotatableText } from "./atoms/RotatableText";
import { COLORS } from "../styles/colors";

type Props = {
  handleExit: Function;
  numberSecondsShowAnimation?: number;
  showBottom?: string;
  showLeft?: string;
  showTop?: string;
  showRight?: string;
  opacity?: number;
};

type AppSate = {
  showBottom: string;
  showLeft: string;
  showTop: string;
  showRight: string;
};

function getInitialStateForGame() {
  return {
    showBottom: "",
    showLeft: "",
    showTop: "",
    showRight: "",
  };
}

export class PlayerPositions extends React.Component<Props, AppSate> {
  intervalId?: number;
  intervalSpeed = 1000;

  constructor(props: Props) {
    super(props);
    this.state = getInitialStateForGame();
  }

  showAnimation() {
    const afterSeconds = this.props.numberSecondsShowAnimation;
    console.log(afterSeconds);

    window.setTimeout(() => {
      this.doAnimationBottom();
    }, afterSeconds);
  }

  doAnimationBottom() {
    const showBottom = this.props.showBottom;
    if (showBottom != "" && showBottom != undefined) {
      this.setState({ showBottom });
      this.intervalId = window.setInterval((): void => {
        this.setState({ showBottom: "" });
        this.doAnimationLeft();
      }, this.intervalSpeed);
    } else {
      this.doAnimationLeft();
    }
  }

  doAnimationLeft() {
    const showLeft = this.props.showLeft;
    if (showLeft != "" && showLeft != undefined) {
      this.setState({ showLeft });
      this.intervalId = window.setInterval((): void => {
        this.setState({ showLeft: "" });
        this.doAnimationTop();
      }, this.intervalSpeed);
    } else {
      this.doAnimationTop();
    }
  }
  doAnimationTop() {
    const showTop = this.props.showTop;
    if (showTop != "" && showTop != undefined) {
      this.setState({ showTop });
      this.intervalId = window.setInterval((): void => {
        this.setState({ showTop: "" });
        this.doAnimationRight();
      }, this.intervalSpeed);
    } else {
      this.doAnimationRight();
    }
  }
  doAnimationRight() {
    const showRight = this.props.showRight;
    if (showRight != "" && showRight != undefined) {
      this.setState({ showRight });
      this.intervalId = window.setInterval((): void => {
        this.setState({ showRight: "" });
        this.props.handleExit();
      }, this.intervalSpeed);
    } else {
      this.props.handleExit();
    }
  }

  componentDidMount() {
    this.showAnimation();
  }

  componentWillUnmount(): void {
    var id = window.setTimeout(function () {}, 0);

    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    id = window.setInterval(function () {}, 0);

    while (id--) {
      window.clearInterval(id); // will do nothing if no timeout with id is present
    }
  }

  render() {
    const playerBottom =
      this.state.showBottom != "" ? this.state.showBottom + "\n ↓" : "";

    const playerLeft =
      this.state.showLeft != "" ? this.state.showLeft + "\n ↓" : "";

    const playerTop =
      this.state.showTop != "" ? this.state.showTop + "\n ↓" : "";

    const playerRight =
      this.state.showRight != "" ? this.state.showRight + "\n ↓" : "";

    const opacity = this.props.opacity != undefined ? this.props.opacity : 1;
    return (
      <View style={[styles.container, { opacity: opacity }]}>
        <LinearGradient
          //colors={["rgba(0,0,0,0.8)", "transparent"]}
          colors={["#f4791f", "#659999"]}
          style={styles.background}
          start={[0, 0]}
          end={[1, 1]}
          locations={[0.1, 0.8]}
        ></LinearGradient>

        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.background2}
        ></LinearGradient>

        <View style={styles.PlayerView1}>
          <RotatableText
            text={playerBottom}
            rotate={true}
            rotateValue={"0deg"}
            style={styles.PlayerText}
          ></RotatableText>
        </View>
        <View style={styles.PlayerView2}>
          <RotatableText
            text={playerLeft}
            rotate={true}
            rotateValue={"90deg"}
            style={styles.PlayerText}
          ></RotatableText>
        </View>
        <View style={styles.PlayerView3}>
          <RotatableText
            text={playerTop}
            rotate={true}
            style={styles.PlayerText}
          ></RotatableText>
        </View>
        <View style={styles.PlayerView4}>
          <RotatableText
            text={playerRight}
            rotate={true}
            rotateValue={"270deg"}
            style={styles.PlayerText}
          ></RotatableText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 1,
    backgroundColor: "#659999",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "80%",
  },
  background2: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "20%",
  },

  PlayerView1: {
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  PlayerView2: {
    position: "absolute",
    left: "10%",
    top: "45%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  PlayerView3: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
  },
  PlayerView4: {
    position: "absolute",
    top: "45%",
    right: "10%",
    alignSelf: "center",
    flexDirection: "row",
  },

  PlayerText: {
    fontSize: 45,
    fontFamily: "Helvetica",
    color: COLORS.secondaryBorder,
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    textShadowRadius: 7,
    textShadowColor: "white",
    shadowOpacity: 0,
    letterSpacing: 1,
  },
});
