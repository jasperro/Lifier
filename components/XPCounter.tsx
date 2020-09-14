import React from "react";
import { updateXP, getXP } from "../storage/Experience";
import { TextInput, Text } from "./Themed";
import { TouchableOpacity, View } from "react-native";

export default class XPCounter extends React.Component {
  state = {
    xp: 0,
  };
  handleInput = (text: string) => {
    this.setState({ xp: parseInt(text) });
  };
  render() {
    return (
      <View>
        <TextInput onChangeText={this.handleInput}></TextInput>
        <TouchableOpacity onPress={() => updateXP(200)}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
