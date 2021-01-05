import * as React from "react";
import { StyleSheet } from "react-native";

import {
    FAB,
    Card,
    ProgressBar,
    Surface,
    Paragraph,
    useTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ColoredSubheading } from "styled/Themed";
import database from "model/database";

export default function Dashboard(): React.FC {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            elevation: 0,
            paddingLeft: 10,
            paddingRight: 10,
        },
        fab: {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 64,
        },
        xpbar: {
            position: "absolute",
            padding: 16,
            right: 0,
            bottom: 0,
            width: "100%",
        },
    });
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <ColoredSubheading>Recent Activity</ColoredSubheading>
            <Card>
                <Card.Title
                    title="Power Chords"
                    subtitle="4 Uur restrerend"
                    left={() => (
                        <MaterialCommunityIcons
                            name="guitar-acoustic"
                            size={48}
                            color={colors.primary}
                        />
                    )}
                />
            </Card>
            <Card>
                <Card.Title
                    title="Javascript"
                    subtitle="2 Uur restrerend"
                    left={() => (
                        <MaterialCommunityIcons
                            name="xml"
                            size={48}
                            color={colors.primary}
                        />
                    )}
                />
            </Card>
            <ColoredSubheading>Time</ColoredSubheading>
            <Surface style={styles.xpbar}>
                <ProgressBar
                    style={{ borderRadius: 90, height: 10 }}
                    progress={0.8}
                />
                <Paragraph>100XP/Level 20</Paragraph>
            </Surface>
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
