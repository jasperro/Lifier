import * as React from "react";
import { StyleSheet, View as TransparentView } from "react-native";

import {
    FAB,
    Card,
    ProgressBar,
    Text,
    useTheme,
    Button,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ColoredSubheading } from "styled/Themed";
import database from "model/database";

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
    const { colors } = useTheme();
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
        xpbar: {
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: colors.surface,
        },
        xpdot: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
        },
    });
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
            <Button icon="plus" mode="contained">
                Start a new timer
            </Button>
            <View style={styles.xpbar}>
                <ProgressBar style={{ height: 10 }} progress={0.8} />
                <TransparentView
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minHeight: 70,
                        alignItems: "stretch",
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >
                    <TransparentView
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={[
                                styles.xpdot,
                                {
                                    backgroundColor: colors.background,
                                    marginRight: 10,
                                },
                            ]}
                        >
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                14
                            </Text>
                        </View>
                        <Text
                            style={{ fontSize: 16, fontFamily: "InterLight" }}
                        >
                            Rookie Guitar Player
                        </Text>
                    </TransparentView>
                    <TransparentView
                        style={{
                            flex: 1,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={[
                                styles.xpdot,
                                {
                                    backgroundColor: colors.primary,
                                    marginLeft: 10,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                15
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16 }}>230/300XP</Text>
                    </TransparentView>
                </TransparentView>
            </View>
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
