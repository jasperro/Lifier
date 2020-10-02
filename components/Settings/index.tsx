import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch } from "../Style/Themed";

export function SettingsItem(props: {
  displayname: string;
  settingid: string;
}) {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text>{props.displayname}</Text>
        <Text>{props.settingid}</Text>
        <Text>{isEnabled.toString()}</Text>
      </View>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.settingswitch}
      ></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  settingswitch: {
    margin: 10,
  },
});
