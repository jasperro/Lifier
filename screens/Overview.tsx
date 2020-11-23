import * as React from "react";
import { StyleSheet } from "react-native";

import { FAB } from "react-native-paper";
import { View, ColoredSubheading } from "styled/Themed";
import database from "model/database";

export default function Overview(): React.FC {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            elevation: 0,
            paddingLeft: 40,
        },
        fab: {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
        },
    });
    return (
        <View style={styles.container}>
            <ColoredSubheading>Recent Activity</ColoredSubheading>
            <ColoredSubheading>Time</ColoredSubheading>
            <FAB
                style={styles.fab}
                icon="plus"
                label="Timer"
                onPress={async () => {
                    database.then(async (database) => {
                        const skillsCollection = database.skills;

                        const document = await skillsCollection.bulkInsert(
                            Array(1000).fill({
                                display_name: "Dit is een skill",
                            })
                        );
                    });
                }}
            />
        </View>
    );
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
