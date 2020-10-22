import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'

import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import { View } from 'styled/Themed'
import { SettingsItem } from '../components/Settings'
import PreferencesContext from 'root/PreferencesContext'
import database from 'model/database'

export default function Settings() {
    const theme = useTheme()
    const { toggleTheme, isThemeDark, setAccentColor } = React.useContext(
        PreferencesContext
    )
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingsItem settingid="dark_mode" displayname="Dark Mode" />
            <SettingsItem
                settingid="db_sync"
                displayname="Database Synchronisation"
            />
            <Button onPress={() => setAccentColor('#ff0000')}>Red</Button>
            <Button onPress={() => setAccentColor('#0077ce')}>Default</Button>
            <Button onPress={() => toggleTheme()}>Dark mode toggle</Button>
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
