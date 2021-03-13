import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
    Text,
    FAB,
    TextInput,
    Button
} from "react-native-paper";
import { View } from "styled/Themed";
import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import { RxCollection, RxDatabase, RxQuery } from "rxdb";
import { styles } from "./Skills";

async function createTask(title: string, skillId: string) {
    const database = await databasePromise;
    const eventsCollection = database.events;
    const taskCollection = database.tasks;
    const newtask = await taskCollection.createNew(title, skillId);
    await eventsCollection.createNew("Task", "Created");
}

export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId, categoryName } = route.params;
    const [title, setTitle] = useState(displayName);
    const [newSkill, setNewSkill] = useState("");
    const [newTask, setNewTask] = useState("");
    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([categoryName, title], () => {
                navigation.dispatch(
                    navigation.canGoBack()
                        ? CommonActions.goBack()
                        : CommonActions.reset({
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
    (async () => {
        database = await databasePromise;
        skillCollection = database.skills;

        query = skillCollection.findOne(skillId);
        query.$.subscribe((data) => setTitle(data.display_name));
    })();

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontSize: 60 }}>{title}</Text>
                <Text>skillId: {JSON.stringify(skillId)}</Text>
            </ScrollView>

            <TextInput
                style={styles.bottominput}
                label="Nieuwe Skill Naam"
                value={newSkill}
                onChangeText={(newSkill) => setNewSkill(newSkill)}
            />
            <TextInput
                style={styles.bottominput}
                label="Nieuwe Task Naam"
                value={newTask}
                onChangeText={(newTask) => setNewTask(newTask)}
            />
            <Button
                onPress={() =>
                    query.exec().then(() => createTask(newTask, skillId))
                }
            >
                Maak nieuwe task bij deze skill
            </Button>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    query
                        .exec()
                        .then((document) =>
                            document.changeDisplayName(newSkill)
                        )
                }
            />
        </View>
    );
}