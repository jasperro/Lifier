import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Switch } from "react-native-paper";
import { View } from "styled/Themed";
import database from "model/database";

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
            />
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
