import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Text } from 'react-native-paper'
import { View } from 'styled/Themed'

export default function Footer({ path }: { path: string }) {
    return <View style={styles.container} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0,
    },
})
