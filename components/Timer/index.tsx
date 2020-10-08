import React from "react";
import TestModal from "./TestModal";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { View } from "../Style/Themed";

class Timer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>10:10</Text>
        <Button icon="clock" mode="contained" onPress={() => alert("Start Timer")}>Start</Button>
        <Button icon="stop" mode="contained" onPress={() => alert("Stop Timer")}>Stop</Button>
        <TestModal></TestModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
});

export default Timer;
