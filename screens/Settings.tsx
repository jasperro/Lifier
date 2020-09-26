import * as React from "react";
import { StyleSheet, Switch } from "react-native";

import { Text, View, TextInput } from "../components/Style/Themed";
import { SettingsItem } from "../components/Settings";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <SettingsItem name="help" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
