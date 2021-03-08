import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
    Text,
    FAB,
    TextInput
} from "react-native-paper";
import { View } from "styled/Themed";
import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import { RxCollection, RxDatabase, RxQuery } from "rxdb";
import { styles } from "./Skills";


export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId, categoryName } = route.params;
    const [title, setTitle] = useState(displayName);
    const [newSkill, setNewSkill] = useState("");
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
                onChangeText={(newSkill) => setNewSkill(newSkill)} />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => query.exec().then((document) => document.changeDisplayName(newSkill))}
            />
        </View>
    );
}
