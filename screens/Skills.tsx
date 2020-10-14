import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";

import { Text, TextInput, FAB, Button } from "react-native-paper";
import { View } from "styled/Themed";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Footer from "../components/Layout/Footer";

const DefaultStackOptions = {
    header: ({ scene, previous, navigation }) => {
        const { options } = scene.descriptor;
        const title = options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : scene.route.name;

        const backbutton = previous
            ? <Button onPress={navigation.goBack}>Back</Button>
            : undefined;

        return (
            <View style={styles.headercontainer}>
                <Text style={styles.headertext}>{title}</Text>
                {backbutton}
            </View>
        );
    },
};

// Maak de base-stack waar alle skill-categorieën in staan (Guitar, Programming)
const SkillCategoriesStack = createStackNavigator();

// Deze navigator wordt enkel een keer gemaakt.
export default function SkillCategoriesNavigator() {
    return (
        <SkillCategoriesStack.Navigator>
            <SkillCategoriesStack.Screen
                name="Skill Categories"
                component={SkillCategories}
                options={{
                    headerTitle: "Skill Categories",
                    ...DefaultStackOptions,
                }}
            />
            {/**/}
            <SkillCategoriesStack.Screen
                name="Skill Category"
                component={SkillCategoryNavigator}
                options={{
                    headerTitle: "Skill Category",
                    ...DefaultStackOptions,
                }}
            />
        </SkillCategoriesStack.Navigator>
    );
}

// Maak de stack waar de skill-categorie in staat (Guitar) en laat subcategorieën zien (Chords, Technique)
const SkillCategoryStack = createStackNavigator();

function SkillCategoryNavigator() {
    return (
        <SkillCategoryStack.Navigator>
            <SkillCategoryStack.Screen
                name="Skill Categories"
                component={SkillCategories}
                options={{
                    headerTitle: "Skill Categories",
                    ...DefaultStackOptions,
                }}
            />
            <SkillCategoryStack.Screen
                name="Skill Category"
                component={SkillCategoryStack}
                options={{
                    headerTitle: "Skill Category",
                    ...DefaultStackOptions,
                }}
            />
        </SkillCategoryStack.Navigator>
    );
}



function SkillCategories() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skills</Text>
            <View
                style={styles.separator}
            />
            <ScrollView>

            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log("Pressed")}
            />
        </View>
    );
}

function SkillCategory() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skills</Text>
            <View
                style={styles.separator}
            />
            <ScrollView>
                <Button
                    title="Go to Skill"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log("Pressed")}
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
});
