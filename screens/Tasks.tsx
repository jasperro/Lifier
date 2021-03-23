import databasePromise from "model/database";
import { TaskSchema } from "model/task.type";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, FAB, IconButton, Menu } from "react-native-paper";
import CategoryChips from "root/components/CategoryChips";
import TaskList from "root/components/TaskList";
import XPBar from "root/components/XPBar";
import { ColoredSubheading, View } from "styled/Themed";

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
        <View style={{ height: "100%" }}>
            <ColoredSubheading>Uncompleted</ColoredSubheading>
            <SortMenu></SortMenu>
            <View style={styles.container}>
                <TaskList list={list} />
            </View>
            <CategoryChips
                onSelect={async (list) => {
                    setSelectedCategories(list);
                    filterList(list);
                }}
            />
        </View>
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
