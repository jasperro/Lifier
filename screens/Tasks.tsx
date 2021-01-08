import * as React from "react";
import { StyleSheet } from "react-native";

import {
    FAB,
    Card,
    useTheme,
    Menu,
    Divider,
    IconButton,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, ColoredSubheading } from "styled/Themed";
import database from "model/database";
import ChipExample from "root/components/ChipTest";

const SortMenu = (): JSX.Element => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View
            style={{
                paddingTop: 50,
                flexDirection: "row",
                justifyContent: "flex-end",
            }}
        >
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <IconButton icon="dots-vertical" onPress={openMenu}>
                        Show menu
                    </IconButton>
                }
            >
                <Menu.Item onPress={() => {}} title="Total Hours" />
                <Menu.Item onPress={() => {}} title="Work Hours" />
                <Menu.Item onPress={() => {}} title="Skill Hours" />
                <Divider />
                <Menu.Item onPress={() => {}} title="XP Earned" />
            </Menu>
        </View>
    );
};

export default function Tasks(): JSX.Element {
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
            bottom: 0,
        },
    });
    const { colors } = useTheme();
    return (
        <>
            <ScrollView style={styles.container}>
                <ColoredSubheading>Uncompleted</ColoredSubheading>
                <SortMenu></SortMenu>
                <Card>
                    <Card.Title
                        title="Maak een planning"
                        left={() => (
                            <MaterialCommunityIcons
                                name="view-dashboard"
                                size={48}
                                color={colors.accent}
                            />
                        )}
                    />
                </Card>
                <Card>
                    <Card.Title
                        title="Maak een python-api"
                        left={() => (
                            <MaterialCommunityIcons
                                name="language-python"
                                size={48}
                                color={colors.accent}
                            />
                        )}
                    />
                </Card>

                <ChipExample></ChipExample>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                label="Task"
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
        </>
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
