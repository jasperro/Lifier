import * as React from "react";
import { StyleSheet } from "react-native";

import Footer from "../components/Layout/Footer";
import { Text, Divider, Switch } from "react-native-paper";
import { View } from "styled/Themed";

export default function Overview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <Divider />
      <Switch />
      <Footer path="/screens/Overview.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
