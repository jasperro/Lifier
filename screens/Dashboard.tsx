import * as React from "react";
import { StyleSheet, View as TransparentView } from "react-native";

import { FAB, Card, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ColoredSubheading } from "styled/Themed";
import database from "model/database";
import Timer from "root/components/Timer";
import XPBar from "root/components/XPBar";

function ActivityCard(props): JSX.Element {
    const { colors } = useTheme();
    return (
        <Card style={{ marginBottom: 4, marginTop: 4 }}>
            <Card.Title
                title={props.title}
                subtitle={props.subtitle}
                left={() => (
                    <MaterialCommunityIcons
                        name={props.icon}
                        size={48}
                        color={colors.primary}
                        style={{ width: 64 }}
                    />
                )}
            />
        </Card>
    );
}

export default function Dashboard(): JSX.Element {
    return (
        <View style={styles.container}>
            <ColoredSubheading>Recent Activity</ColoredSubheading>
            <ActivityCard
                title="Power Chords"
                subtitle="4 uur restrerend"
                icon="guitar-acoustic"
            ></ActivityCard>
            <ActivityCard
                title="Javascript"
                subtitle="2 Uur restrerend"
                icon="xml"
            />
            <ColoredSubheading>Time</ColoredSubheading>
            <Timer />
            <XPBar />
            <FAB
                style={styles.fab}
                icon="plus"
                label="Timer"
                onPress={async () => {
                    database.then(async (database) => {
                        const skillsCollection = database.skills;

                        await skillsCollection.bulkInsert(
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0,
        paddingLeft: 16,
        paddingRight: 16,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 90,
    },
});

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
