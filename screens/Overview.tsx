import * as React from 'react'
import { StyleSheet } from 'react-native'

import { Subheading, Divider, FAB } from 'react-native-paper'
import { View } from 'styled/Themed'
import Footer from '../components/Layout/Footer'

export default function Overview() {
    return (
        <View style={styles.container}>
            <Subheading style={styles.title}>Recent Activity</Subheading>
            <Subheading style={styles.title}>Time</Subheading>
            <FAB
                style={styles.fab}
                icon="plus"
                label="Timer"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

// Structuur interface
/*
<Subheading>Recent Activity</Subheading>
<Subheading>Time</Subheading>
<RecentActivityView>
    // Populaten met recente activiteiten
        // DB.history.query(where done recently(3 max))
</RecentActivityView>
<TimerView>
    <CurrentTimers> // Een lijst van alle lopende timers, max 1?
    </CurrentTimers>
    <TimerButtons/>
</TimerView>

<FAB></FAB>

// XP Bar is waarchijnlijk deel van de parent element, anders wordt de root element wel ContainerWithXPBar
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0,
        paddingLeft: 40,
    },
    title: {
        fontSize: 20,
        color: '#4D6180',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
