import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { Text, FAB, Button, Card } from "react-native-paper";
import { View } from "styled/Themed";
import { fonts } from "root/fontconfig";
import { CommonActions } from "@react-navigation/native";
import databasePromise from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";
import _ from "lodash";

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

async function createSkill(categoryId) {
    const database = await databasePromise;
    const skillsCollection = database.skills;

    const skillcategoryCollection = database.skillcategories;
    const displayName = Math.random().toString();
    const skill = await skillsCollection.insert({
        display_name: displayName,
    });

    console.log(skill.skill_id);

    const query = skillcategoryCollection.findOne(categoryId);
    const result = await query.exec();
    let existingSkills = await result.skills;
    existingSkills = existingSkills ? existingSkills : [];

    await skillcategoryCollection.upsert(
        _.merge({}, result.toJSON(), {
            skills: [...existingSkills, skill.skill_id],
        })
    );
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

    const [list, setList] = useState([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const skillcategoryCollection = database.skillcategories;

            const query = skillcategoryCollection.findOne(categoryId);
            query.$.subscribe(async (documents) => {
                const newList = await documents.skills_;
                setList(newList);
            });
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
                onPress={async () => createSkill(categoryId)}
            />
        </View>
    );
}

export function SkillScreen({ route, navigation }): JSX.Element {
    const { skillId, displayName, categoryId, categoryName } = route.params;
    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([categoryName, displayName], () => {
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
