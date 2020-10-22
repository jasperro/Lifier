import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import {
    Text,
    TextInput,
    Button,
    useTheme,
    TouchableRipple,
    Switch,
} from 'react-native-paper'
import { View } from 'styled/Themed'
import { SettingsItem } from '../components/Settings'
import PreferencesContext from 'root/PreferencesContext'
import database from 'model/database'
// import { setSettingState, getSettingState } from "../database/settings";

/* (async function () {
  let books = await getSettingState("dark_mode");
  console.log(books);
})(); */

export default function Settings() {
    database.then((database) => console.log(database))
    const theme = useTheme()
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingsItem settingid="dark_mode" displayname="Dark Mode" />
            <SettingsItem
                settingid="db_sync"
                displayname="Database Synchronisation"
            />
            <TouchableRipple onPress={() => toggleTheme()}>
                <Switch
                    style={[{ backgroundColor: theme.colors.accent }]}
                    color={'red'}
                    value={isThemeDark}
                />
            </TouchableRipple>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
