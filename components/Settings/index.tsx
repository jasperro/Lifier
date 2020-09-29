import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export function SettingsItem(props: {
  displayname: string;
  settingid: string;
}) {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View>
      <Text>{props.displayname}</Text>
      <Text>{props.settingid}</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.settingswitch}
      ></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  settingswitch: {
    margin: 10,
  },
});
