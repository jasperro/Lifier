import React from "react";
import { TextInput, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { View } from "./Style/Themed";

// Input en knop om XP te veranderen als debug
export class XPSetter extends React.Component {
  state = {
    xp: 0,
  };
  handleInput = (text: string) => {
    this.setState({ xp: parseInt(text) });
  };
  render() {
    return (
      <View>
        <TextInput onChangeText={() => 0} onSubmitEditing={() => 0}></TextInput>
        <TouchableOpacity onPress={() => 0}>
          <Text> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
