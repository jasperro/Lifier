import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { removeRxDatabase } from "rxdb";
import { ColoredSubheading, ScrollView } from "styled/Themed";
import {
    SettingsItemBoolean,
    SettingsItemColor,
    SettingsItemString,
} from "../components/Settings";

export default function Settings(): JSX.Element {
    return (
        <ScrollView style={styles.container}>
            <ColoredSubheading>Application Settings</ColoredSubheading>
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
            <ColoredSubheading>DANGER! DEBUG ZONE!</ColoredSubheading>
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
            <Text style={{ paddingTop: 50, paddingBottom: 50 }}>
                © 2021-2021 Jasperro, Sweatplant, treborben and Zacherias
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
