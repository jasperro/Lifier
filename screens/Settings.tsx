import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { removeRxDatabase } from "rxdb";
import { ScrollView } from "styled/Themed";
import {
    SettingsItemBoolean,
    SettingsItemColor,
    SettingsItemString,
} from "../components/Settings";

export default function Settings(): JSX.Element {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingsItemBoolean
                settingid="dark_mode"
                displayname="Dark Mode"
            />
            <SettingsItemBoolean
                settingid="db_sync"
                displayname="Database Synchronisation (Restart app to trigger)"
            />
            <SettingsItemString
                settingid="xp_profession"
                displayname="XP Profession"
            />
            <SettingsItemColor
                displayname="Accent Color"
                settingid="accent_color"
            />
            {/*<SettingsItemString settingid="color" displayname="Display Color" />*/}
            <Button onPress={() => removeRxDatabase("database", "idb")}>
                Delete web database
            </Button>
            <Button
                onPress={() =>
                    removeRxDatabase("database", "react-native-sqlite")
                }
            >
                Delete mobile database
            </Button>
        </ScrollView>
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
