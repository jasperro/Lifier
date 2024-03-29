import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ActivityChart from "root/components/ActivityChart";
import Timer from "root/components/Timer";
import XPBar from "root/components/XPBar";
import { ColoredSubheading } from "styled/Themed";

/*function ActivityCard(props): JSX.Element {
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
}*/

export default function Dashboard(): JSX.Element {
    return (
        <>
            <ScrollView style={styles.container}>
                <ColoredSubheading>Recent Activity</ColoredSubheading>
                <ActivityChart />
                <ColoredSubheading>Stopwatch</ColoredSubheading>
                <Timer />
            </ScrollView>

            <XPBar />
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0,
        paddingLeft: 16,
        paddingRight: 16,
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
