import React from "react";
import TestModal from "./TestModal"
import { StyleSheet, Text, View, Button } from "react-native";

class Timer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>10:10</Text>
        <Button title="Start" onPress={() => alert("Start Timer")}></Button>
        <Button title="Stop" onPress={() => alert("Stop Timer")}></Button>
		  <TestModal></TestModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Timer;
