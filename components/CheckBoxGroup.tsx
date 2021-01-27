import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

type Props = {
  groupName: string;
};

export class CheckBoxGroup extends React.Component<Props> {
  render() {
    return (
      <View style={styles.group}>
        <Text style={styles.groupName}>{this.props.groupName}</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    display: "flex",
    flexDirection: "column",

    marginBottom: 30,
    width: "100%",
  },

  groupName: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    color: COLORS.iosSystemGray1,
  },
});
