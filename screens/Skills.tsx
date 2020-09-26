import * as React from "react";
import { StyleSheet, Switch } from "react-native";

import Footer from "../components/Layout/Footer";
import { Text, View, TextInput } from "../components/Style/Themed";

export default function Skills() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Switch />
      <Footer path="/screens/Skills.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
