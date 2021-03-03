import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList, Platform } from "react-native";
import {
    Text,
    FAB,
    Button,
    Card,
    TextInput,
    useTheme,
} from "react-native-paper";
import { View } from "styled/Themed";
import { fonts } from "root/fontconfig";
import { FlatGrid } from "react-native-super-grid";
import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import _ from "lodash";
import Color from "color";
import { RxCollection, RxDatabase, RxDocument, RxQuery } from "rxdb";

export function SkillCategoriesScreen({ navigation }): JSX.Element {
    const { colors } = useTheme();
    const [list, setList] = useState([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skillcategories;

            const query = skillcategoryCollection.find();
            query.$.subscribe((documents) => setList(documents));
        })();
    }, []);
    return (
        <View style={styles.container}>
            <FlatGrid
                itemDimension={330}
                spacing={10}
                style={styles.cardlist}
                data={list}
                keyExtractor={(item) => item.skill_category_id}
                renderItem={({ item }) => (
                    <Card
                        onPress={() => {
                            /* Navigate to skill route with params */
                            navigation.navigate("SkillCategory", {
                                categoryId: item.skill_category_id,
                                displayName: item.display_name,
                            });
                        }}
                        key={item.skill_category_id}
                        style={[
                            styles["card"],
                            { backgroundColor: item.color },
                        ]}
                    >
                        <Card.Title
                            titleStyle={{
                                fontSize: 50,
                                lineHeight: 100,
                                color: !item.color
                                    ? colors.text
                                    : Color(item.color).isDark
                                    ? colors.textLight
                                    : colors.textDark,
                            }}
                            title={item.display_name}
                        />
                    </Card>
                )}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("NewCategory")}
            />
        </View>
    );
}

async function createSkill(categoryId, displayName) {
    const database = await databasePromise;
    const skillsCollection = database.skills;
    await skillsCollection.createNew(categoryId, displayName);
}

export function SkillCategoryScreen({ route, navigation }): JSX.Element {
    const { categoryId, displayName } = route.params;

    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([JSON.stringify(displayName)], () => {
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
    }, []);

    const [newskill, setNewSkill] = useState("");
    const [list, setList] = useState([]);
    (async () => {
        const database = await databasePromise;
        const skillcategoryCollection = database.skillcategories;

        const query = skillcategoryCollection.findOne(categoryId);
        query.$.subscribe(async (documents) => {
            const newList = await documents.skills_;
            setList(newList);
        });
    })();
    return (
        <View style={styles.container}>
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
                                    categoryName: displayName,
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
            <TextInput
                style={styles.bottominput}
                label="Nieuwe Skill Naam"
                value={newskill}
                onChangeText={(newskill) => setNewSkill(newskill)}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={async () => createSkill(categoryId, newskill)}
            />
        </View>
    );
}

export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId, categoryName } = route.params;
    const [newskill, setNewSkill] = useState("");
    const [title, setTitle] = useState(displayName);
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
                <Button
                    onPress={async () => {
                        const categoryCollection = database.skillcategories;
                        const query = categoryCollection.findOne(categoryId);
                        const result = await query.exec();
                        await result.update({
                            $set: {
                                display_name: "a",
                            },
                        });
                    }}
                >
                    Rename A to B
                </Button>
            </ScrollView>

            <TextInput
                style={styles.bottominput}
                label="Nieuwe Skill Naam"
                value={newskill}
                onChangeText={(newskill) => setNewSkill(newskill)}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    query
                        .exec()
                        .then((document) =>
                            document.changeDisplayName(newskill)
                        )
                }
            />
        </View>
    );
}

// Opbouw
/*
<ContainerWithXPBar>

                //query alle skill categories, en maak voor elk element een <SkillCategoryCard>
                    //bij het klikken wordt er een nieuw scherm gemaakt in de stack navigator met een lijst van alle skills die erbij horen.

<FAB />
</ContainerWithXPBar>
*/

const styles = {
    ...StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
        },
        fab: {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
        },
        bottominput: {
            position: "absolute",
            margin: 16,
            right: "auto",
            left: "auto",
            bottom: 0,
            width: "70%",
        },
        card: {
            marginBottom: 4,
            marginTop: 4,
            height: 210,
            ...(Platform.OS == "web" && { cursor: "pointer" }),
        },
    }),
    cardlist: {
        width: "100%",
    },
};
