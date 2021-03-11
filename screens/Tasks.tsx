import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import databasePromise from "model/database";

import {
    FAB,
    Card,
    useTheme,
    Menu,
    Divider,
    IconButton,
    TextInput,
    Button,
    Text,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ScrollView, ColoredSubheading } from "styled/Themed";
import { CommonActions } from "@react-navigation/native";
import ChipExample from "root/components/ChipTest";
import { SkillCategorySchema } from "model/skillcategory.type";
import { TaskSchema } from "model/task.type";
import skillcategorySchema from "root/model/skillcategory.schema";
import { SkillSchema } from "root/model/skill.type";
import { RxDatabase } from "rxdb";

const SortMenu = (): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View
            style={{
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
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [fullList, setFullList] = useState<Array<TaskSchema>>([]);
    const [list, setList] = useState<Array<TaskSchema>>([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const taskCollection = database.tasks;

            const query = taskCollection.find();
            query.$.subscribe((documents: TaskSchema[]) => {
                setFullList(documents);
            });
        })();
    }, []);

    function filterList(categories) {
        setList(
            fullList.filter((value) => categories.includes(value.category))
        );
    }

    useEffect(() => {
        filterList(selectedCategories);
    }, [fullList]);
    return (
        <>
            <ColoredSubheading>Uncompleted</ColoredSubheading>
            <SortMenu></SortMenu>
            <View style={styles.container}>
                <FlatList
                    style={styles.cardlist}
                    data={list}
                    keyExtractor={(item) => item.task_id}
                    renderItem={({ item }) => {
                        const Icon = function Icon() {
                            return (
                                <MaterialCommunityIcons
                                    name="view-dashboard"
                                    size={48}
                                    color={item.color}
                                />
                            );
                        };
                        return (
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
                                        return <Icon></Icon>;
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
                                    Go to task {item.color}
                                </Button>
                            </Card>
                        );
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <ChipExample
                    onSelect={async (list) => {
                        setSelectedCategories(list);
                        filterList(list);
                    }}
                ></ChipExample>
            </View>

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
        flex: 4,
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
