import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/colors";

type Props = {
  state: Boolean;
  onClick: Function;
  title: String;
  subtitle: String;
};

export class CheckButton extends React.Component<Props, {}> {
  getContent(state: Boolean) {
    const color = state ? COLORS.iosSystemGreen : COLORS.iosSystemGray4;

    const alignSelf = state ? "flex-end" : "flex-start";
    // Toogle = true
    const right = state ? 2 : 0;
    const borderColor = state ? COLORS.iosSystemGreen : COLORS.iosSystemGray4;
    // Toogle = false
    const left = state ? 0 : 0.8;

    const textColor = state ? COLORS.brightText : COLORS.iosSystemGray2;

    const CheckButtonElement = (
      <View style={stylesCheckBox.container}>
        <View style={stylesCheckBox.textView}>
          <Text style={[stylesCheckBox.text1, { color: textColor }]}>
            {this.props.title}
          </Text>
          <Text style={[stylesCheckBox.text2, { color: textColor }]}>
            {this.props.subtitle}
          </Text>
        </View>

        <View style={stylesCheckBox.buttonView}>
          <TouchableOpacity
            onPress={() => this.props.onClick()}
            style={[
              stylesCheckBox.buttonPoint,
              { backgroundColor: color, borderColor },
            ]}
          >
            {state && (
              <View
                style={[stylesCheckBox.toogle, { alignSelf, right }]}
              ></View>
            )}
            {!state && (
              <View style={[stylesCheckBox.toogle, { alignSelf, left }]}></View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
    return CheckButtonElement;
  }

  render() {
    return this.getContent(this.props.state);
  }
}

const stylesCheckBox = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "stretch",
    flexDirection: "row",
    height: 65,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.iosSystemGray4,

    borderTopWidth: 0.3,
    borderTopColor: COLORS.iosSystemGray4,
  },
  textView: {
    minWidth: "80%",
    maxWidth: "80%",
    backgroundColor: COLORS.iosSystemGray6,
    padding: 5,
  },
  text1: {
    fontSize: 20,
    color: COLORS.brightText,
    marginTop: 5,
    marginLeft: 5,
  },
  text2: {
    fontSize: 11.8,
    marginTop: 5,
    color: COLORS.brightText,
    marginLeft: 5,
  },
  buttonView: {
    minWidth: "22%",
    backgroundColor: COLORS.iosSystemGray6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: -4,
  },
  buttonPoint: {
    position: "absolute",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: COLORS.iosSystemGray4,
    width: "60%",
    height: "46%",
    backgroundColor: COLORS.iosSystemGray2,
    right: 23,
  },
  toogle: {
    position: "absolute",
    borderRadius: 60,
    borderColor: COLORS.iosSystemGray2,
    width: "50%",
    height: "88%",
    backgroundColor: COLORS.brightText,
    display: "flex",
    alignSelf: "flex-start",
    marginLeft: 1,
    marginTop: 0.5,
    top: 1.175,
  },
  // Container: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignContent: "flex-start",
  //   width: "100%",
  //   padding: 7,
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   borderColor: COLORS.primaryBorder,
  //   margin: 10,
  // },

  // StandardStyleText: {
  //   display: "flex",
  //   justifyContent: "center",
  //   marginRight: 10,
  //   minWidth: "78%",
  //   maxWidth: "78%",
  //   fontSize: 17,
  //   color: COLORS.brightText,
  //   margin: 2,
  // },

  // ButtonView: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   borderColor: COLORS.primaryBorder,
  //   minWidth: "15%",
  //   maxWidth: "15%",
  //   marginTop: 2,
  //   marginBottom: 2,
  //   marginRight: 3,
  // },
  // ButtonPoint: {
  //   width: "100%",
  //   display: "flex",
  //   alignItems: "flex-start",
  // },
  // ButtonPointText: {
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   display: "flex",
  //   alignItems: "flex-end",
  //   justifyContent: "center",

  //   backgroundColor: COLORS.primaryBorder,
  //   width: "50%",
  //   overflow: "hidden",
  //   margin: 1,
  // },
});
