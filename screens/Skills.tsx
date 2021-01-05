import React, { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, FAB, Button } from "react-native-paper";
import { View } from "styled/Themed";
import { fonts } from "root/fontconfig";
import { CommonActions } from "@react-navigation/native";
import database from "model/database";
import DefaultStackOptions from "root/navigation/DefaultStackOptions";

export function SkillCategoriesScreen({ navigation }): React.FC {
    return (
        <View style={styles.container}>
            <Button
                mode="outlined"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate("SkillCategory", {
                        itemId: 86,
                    });
                }}
            >
                Go to skill category
            </Button>
            <ScrollView></ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log("Pressed")}
            />
        </View>
    );
}

function createSkill() {
    database.then(async (database) => {
        const skillsCollection = database.skills;
        const skill = await skillsCollection.insert({
            display_name: Math.random().toString(),
        });
    });
}

export function SkillCategoryScreen({ route, navigation }): React.FC {
    const { itemId } = route.params;

    useEffect(() => {
        navigation.setOptions({
            ...DefaultStackOptions([JSON.stringify(itemId)]),
        });
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Button
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate("Skill", {
                            skillId: 291390321,
                        });
                    }}
                >
                    Go to skill
                </Button>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={async () => createSkill()}
            />
        </View>
    );
}

export function SkillScreen({ route, navigation }): React.FC {
    const { skillId } = route.params;
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
                                          params: { itemId: 39 },
                                      },
                                  ],
                              })
                    );
                }
            ),
        });
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
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
