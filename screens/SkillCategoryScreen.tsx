import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button, Card, FAB, IconButton, Text } from "react-native-paper";
import {
    CategoryCollection,
    CategoryDocument,
} from "root/model/category.schema";
import { MyDatabase } from "root/model/collections";
import { SkillDocument } from "root/model/skill.schema";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import { RxQuery } from "rxdb";
import { View } from "styled/Themed";
import { styles } from "./Skills";

export function SkillCategoryScreen({ route, navigation }): JSX.Element {
    const { categoryId } = route.params;
    const [list, setList] = useState<SkillDocument[]>([]);
    const [title, setTitle] = useState("");

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
    let database: MyDatabase;
    let query: RxQuery;
    let skillcategoryCollection: CategoryCollection;

    async function setData(data: CategoryDocument) {
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
                        navigation.navigate("EditCategory", {
                            categoryId: categoryId,
                            displayName: title,
                        });
                    }}
                />
            </View>
            <FlatList
                style={styles.cardlist}
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} key={item.id}>
                        <Card.Title title={item.display_name} />
                        <Button
                            onPress={() => {
                                /* Navigate to skill route with params */
                                navigation.navigate("Skill", {
                                    categoryId: categoryId,
                                    categoryName: title,
                                    skillId: item.id,
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
                        categoryName: title,
                    })
                }
            />
        </View>
    );
}
