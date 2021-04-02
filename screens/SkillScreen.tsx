import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { FAB, IconButton, Text, TextInput } from "react-native-paper";
import TaskList from "root/components/TaskList";
import { TaskSchema } from "root/model/task.type";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import { RxCollection, RxDatabase, RxDocument, RxQuery } from "rxdb";
import { ColoredSubheading, View } from "styled/Themed";
import { styles } from "./Skills";

async function createTask(title: string, skillId: string) {
    const database = await databasePromise;
    const eventsCollection = database.events;
    const taskCollection = database.tasks;
    taskCollection.createNew(title, skillId);
    eventsCollection.createNew("Task", "Created");
}

export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId, categoryName } = route.params;
    const [title, setTitle] = useState(displayName);
    const [taskList, setTaskList] = useState<Array<RxDocument<TaskSchema>>>([]);
    const [newTask, setNewTask] = useState("");
    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([categoryName, title], () => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: "SkillCategory",
                                params: {
                                    categoryId: categoryId,
                                    displayName: categoryName,
                                },
                            },
                        ],
                    })
                );
            }),
        });
    }, [title]);

    let database: RxDatabase;
    let skillCollection: RxCollection;
    let query: RxQuery;
    useEffect(() => {
        (async () => {
            database = await databasePromise;
            skillCollection = database.skills;
            const taskCollection = database.tasks;

            // Data als skilllijst is veranderd
            query = skillCollection.findOne(skillId);
            query.$.subscribe(async (data) => {
                if (data) {
                    setTitle(data.display_name);
                    setTaskList(await data.tasks_);
                }
            });

            const query2 = taskCollection.find();

            // Data als tasklijst is veranderd
            query2.$.subscribe(async () => {
                setTaskList(await (await query.exec()).tasks_);
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    width: "auto",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 60 }}>{title}</Text>
                <IconButton
                    icon="delete"
                    size={24}
                    color="white"
                    onPress={() => {
                        navigation.goBack();
                        query.exec().then((document) => document.delete());
                    }}
                />
                <IconButton
                    icon="pencil"
                    size={24}
                    color="white"
                    onPress={() => {
                        navigation.navigate("EditSkill", {
                            skillId: skillId,
                            categoryName: categoryName,
                            categoryId: categoryId,
                            skillName: title,
                        });
                    }}
                />
            </View>
            <TaskList
                list={taskList}
                style={{ width: "100%" }}
                ListHeaderComponent={
                    <ColoredSubheading>Tasks</ColoredSubheading>
                }
            />
            <TextInput
                style={styles.bottominput}
                label="Nieuwe Task Naam"
                value={newTask}
                onChangeText={(newTask) => setNewTask(newTask)}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => createTask(newTask, skillId)}
            />
        </View>
    );
}
