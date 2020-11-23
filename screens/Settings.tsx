import React from "react";
import { StyleSheet } from "react-native";

import { Text, Button, Colors, useTheme } from "react-native-paper";
import { View } from "styled/Themed";
import { SettingsItemBoolean } from "../components/Settings";
import PreferencesContext from "root/PreferencesContext";

import { removeRxDatabase } from "rxdb";

export default function Settings() {
    const theme = useTheme();
    const { toggleTheme, setAccentColor } = React.useContext(
        PreferencesContext
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingsItemBoolean
                settingid="dark_mode"
                displayname="Dark Mode"
            />
            <SettingsItemBoolean
                settingid="db_sync"
                displayname="Database Synchronisation"
            />
            {/*<SettingsItemString settingid="color" displayname="Display Color" />*/}
            <Button onPress={() => setAccentColor(Colors.red500)}>Red</Button>
            <Button onPress={() => setAccentColor(Colors.green500)}>
                Green
            </Button>
            <Button onPress={() => setAccentColor(Colors.teal500)}>Teal</Button>
            <Button onPress={() => setAccentColor(Colors.yellow500)}>
                Yellow
            </Button>
            <Button onPress={() => setAccentColor("#0077ce")}>Default</Button>
            <Button onPress={() => toggleTheme()}>Dark mode toggle</Button>
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
