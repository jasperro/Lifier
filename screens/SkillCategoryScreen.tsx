import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button, Card, FAB, IconButton, Text } from "react-native-paper";
import { SkillCategorySchema } from "root/model/skillcategory.type";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import { RxCollection, RxDatabase, RxQuery } from "rxdb";
import { View } from "styled/Themed";
import { styles } from "./Skills";

export function SkillCategoryScreen({ route, navigation }): JSX.Element {
    const { categoryId, displayName } = route.params;
    const [list, setList] = useState([]);
    const [title, setTitle] = useState(displayName);

    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([title], () => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: "SkillCategories",
                            },
                        ],
                    })
                );
            }),
        });
    }, [title]);
    let database: RxDatabase;
    let query: RxQuery;
    let skillcategoryCollection: RxCollection;

    async function setData(data: SkillCategorySchema) {
        try {
            const newList = await data.skills_;
            setList(newList);
            setTitle(data.display_name);
        } catch {}
    }

    useEffect(() => {
        (async () => {
            database = await databasePromise;

            skillcategoryCollection = database.skillcategories;
            const skillCollection = database.skills;
            query = skillcategoryCollection.findOne(categoryId);
            const query2 = skillCollection.find();

            // Data als naam van skill is veranderd
            query2.$.subscribe(async () => {
                const data = await query.exec();
                setData(data);
            });

            // Data als categorie is veranderd
            query.$.subscribe(async (data) => {
                setData(data);
            });
        })();
    }, []);
    return (
        <View style={styles.container}>
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
                    navigation.navigate("EditCategory", {
                        categoryId: categoryId,
                        displayName: title,
                    });
                }}
            />
            <Text>{JSON.stringify(list)}</Text>
            <FlatList
                style={styles.cardlist}
                data={list}
                keyExtractor={(item) => item.skill_id}
                renderItem={({ item }) => (
                    <Card style={styles.card} key={item.skill_id}>
                        <Card.Title title={item.display_name} />
                        <Button
                            onPress={() => {
                                /* Navigate to skill route with params */
                                navigation.navigate("Skill", {
                                    categoryId: categoryId,
                                    categoryName: title,
                                    skillId: item.skill_id,
                                    displayName: item.display_name,
                                });
                            }}
                        >
                            Go to skill
                        </Button>
                    </Card>
                )}
            />
            <Text>itemId: {JSON.stringify(categoryId)}</Text>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate("NewSkill", {
                        categoryId: categoryId,
                        categoryName: displayName,
                    })
                }
            />
        </View>
    );
}
