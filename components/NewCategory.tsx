import React, { useState } from "react";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import databasePromise from "model/database";

async function createSkillCategory(
    displayName: string,
    color: string | undefined
) {
    const database = await databasePromise;
    const categoriesCollection = database.skillcategories;
    const category = await categoriesCollection.insert({
        display_name: displayName,
        color: color ? color : undefined,
    });
}

export default function NewCategoryScreen({ navigation }): JSX.Element {
    const [newcategory, setNewCategory] = useState("");
    const [newcolor, setNewColor] = useState("");
    return (
        <>
            <TextInput
                label="Nieuwe Categorie Naam"
                value={newcategory}
                onChangeText={(newcategory) => setNewCategory(newcategory)}
            />
            <TextInput
                label="Nieuwe Categorie Kleur"
                value={newcolor}
                onChangeText={(newcolor) => setNewColor(newcolor)}
            />
            <Button
                onPress={() => {
                    createSkillCategory(newcategory, newcolor);
                    navigation.goBack();
                }}
            >
                Maak categorie
            </Button>
        </>
    );
}
