import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, Button } from "react-native-paper";
import { View } from "styled/Themed";
import { SettingsItem } from "../components/Settings";
import { AppConsumer } from "../AppContextProvider";
import database from "model/database";
// import { setSettingState, getSettingState } from "../database/settings";

/* (async function () {
  let books = await getSettingState("dark_mode");
  console.log(books);
})(); */

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingsItem settingid="dark_mode" displayname="Dark Mode" />
            <SettingsItem
                settingid="db_sync"
                displayname="Database Synchronisation"
            />
            <AppConsumer>
                {(appConsumer) => (
                    <View>
                        <Button onPress={() => appConsumer.updateTheme("#ff5400")}>Orange</Button>
                        <Button onPress={() => appConsumer.updateTheme("#ff0000")}>Red</Button>
                        <Button onPress={() => appConsumer.updateTheme("#005522")}>Dark Green</Button>
                    </View>
                )}
            </AppConsumer>
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
