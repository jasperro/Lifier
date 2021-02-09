import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { Text, FAB, Button, Card } from "react-native-paper";
import { View } from "styled/Themed";
import { fonts } from "root/fontconfig";
import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";

export function SkillCategoriesScreen({ navigation }): JSX.Element {
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
            <FlatList
                data={list}
                keyExtractor={(item) => item.skill_category_id}
                renderItem={({ item }) => (
                    <Card>
                        <Text key={item.skill_category_id}>
                            {item.display_name}
                        </Text>
                        <Button
                            onPress={() => {
                                /* Navigate to skill route with params */
                                navigation.navigate("SkillCategory", {
                                    categoryId: item.skill_category_id,
                                    displayName: item.display_name,
                                });
                            }}
                        >
                            Go to skill category
                        </Button>
                    </Card>
                )}
            />
            <ScrollView></ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => createSkillCategory()}
            />
        </View>
    );
}

async function createSkill() {
    const database = await databasePromise;
    const skillsCollection = database.skills;
    const skill = await skillsCollection.insert({
        display_name: Math.random().toString(),
    });
}

async function createSkillCategory() {
    const database = await databasePromise;
    const categoriesCollection = database.skillcategories;
    const category = await categoriesCollection.insert({
        display_name: Math.random().toString(),
    });
}

export function SkillCategoryScreen({ route, navigation }): JSX.Element {
    const { categoryId, displayName } = route.params;

    useEffect(() => {
        CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: "SkillCategories",
                },
            ],
        });
        navigation.setOptions({
            ...DefaultStackOptions([JSON.stringify(displayName)], () => {
                CommonActions.goBack();
            }),
        });
    }, []);

    const [list, setList] = useState([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skills;

            const query = skillcategoryCollection.find();
            query.$.subscribe((documents) => setList(documents));
        })();
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{JSON.stringify(list)}</Text>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.skill_id}
                    renderItem={({ item }) => (
                        <Card>
                            <Text key={item.skill_id}>{item.display_name}</Text>
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
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={async () => createSkill()}
            />
        </View>
    );
}

export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId } = route.params;
    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions(
                ["Skill Category", JSON.stringify(skillId)],
                () => {
                    navigation.dispatch(
                        navigation.canGoBack()
                            ? CommonActions.goBack()
                            : CommonActions.reset({
                                  index: 1,
                                  routes: [
                                      {
                                          name: "SkillCategory",
                                          params: { categoryId: categoryId },
                                      },
                                  ],
                              })
                    );
                }
            ),
        });
    }, []);

    const [title, setTitle] = useState(displayName);
    useLayoutEffect(() => {
        (async () => {
            const database = await databasePromise;

            const skillCollection = database.skills;

            const query = skillCollection.findOne(skillId);
            console.log(performance.now());
            query.$.subscribe((data) => setTitle(data.display_name));
            console.log(performance.now());
        })();
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{title}</Text>
                <Text>skillId: {JSON.stringify(skillId)}</Text>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: "SkillCategories" },
                                {
                                    name: "SkillCategory",
                                    params: { itemId: 39 },
                                },
                                {
                                    name: "Skill",
                                    params: { skillId: 42203 },
                                },
                            ],
                        })
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

const styles = StyleSheet.create({
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
    headertext: {
        fontSize: 40,
        ...fonts.light,
    },
    headercontainer: {
        paddingBottom: 25,
        paddingTop: 30,
        paddingLeft: 10,
    },
});
