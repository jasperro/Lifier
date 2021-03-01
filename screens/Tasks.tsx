import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import databasePromise from "model/database";
import { TaskType } from "model/task.schema";

import {
    FAB,
    Card,
    useTheme,
    Menu,
    Divider,
    IconButton,
    TextInput,
    Button,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, ColoredSubheading } from "styled/Themed";
import { CommonActions } from "@react-navigation/native";
import ChipExample from "root/components/ChipTest";
import { SkillCategoryType } from "model/skillcategory.schema";
import { isRxDocument } from "rxdb";

const SortMenu = (): JSX.Element => {
    const [visible, setVisible] = useState(false);

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
                <Menu.Item onPress={() => {}} title="Task Hours" />
                <Divider />
                <Menu.Item onPress={() => {}} title="XP Earned" />
            </Menu>
        </View>
    );
};

async function createTask(displayName: string) {
    const database = await databasePromise;
    const taskCollection = database.tasks;
    await taskCollection.createNew(displayName);
}

export default function Tasks(): JSX.Element {
    const [newtask, setNewTask] = useState("");
    const [list, setList] = useState<TaskType>();
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const taskCollection = database.tasks;

            const query = taskCollection.find();
            query.$.subscribe(async (documents: TaskType) => {
                setList(await documents);
            });
        })();
    }, []);
    return (
        <>
            <ColoredSubheading>Uncompleted</ColoredSubheading>
            <SortMenu></SortMenu>
            <FlatList
                style={styles.cardlist}
                data={list}
                keyExtractor={(item) => item.task_id}
                renderItem={({ item }) => (
                    <Card style={styles.card} key={item.task_id}>
                        <Card.Title
                            title={item.display_name}
                            left={() => {
                                // We hebben een lijst met RxDocument in list
                                /*const [colorToSet, setColorToSet] = useState(
                                    "#ffffff"
                                );
                                useEffect(() => {
                                    async () => {
                                        setColorToSet(
                                            await item.category_.color
                                        );
                                    };
                                });*/
                                return (
                                    <MaterialCommunityIcons
                                        name="view-dashboard"
                                        size={48}
                                        color={"#514889"} // TODO: Vervangen door Cat. Kleur.
                                    />
                                );
                            }}
                        />
                        <Button
                            onPress={() => {
                                /* Navigate to task route with params */
                                CommonActions.navigate("Task", {
                                    taskId: item.task_id,
                                });
                            }}
                        >
                            Go to task
                        </Button>
                    </Card>
                )}
            />

            <ChipExample></ChipExample>
            <TextInput
                style={styles.bottominput}
                label="Nieuwe Task Naam"
                value={newtask}
                onChangeText={(newtask) => setNewTask(newtask)}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                label="Task"
                onPress={async () => createTask(newtask)}
            />
        </>
    );
}

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
    card: {
        marginVertical: 4,
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
