import React, { useState } from "react";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import databasePromise from "model/database";
import validator from "is-my-json-valid";
import CategorySchema from "model/skillcategory.schema";
import ColorPicker from "root/components/ColorPicker";

//const validate = validator(CategorySchema);
// Validatie voor input
/*console.log(
    "should be valid",
    validate({
        skill_category_id: "328847392",
        display_name: "banaan",
    }),
    validate.errors
);
console.log("should not be valid", validate({}));*/

async function createSkillCategory(
    displayName: string,
    color: string | undefined
) {
    const database = await databasePromise;
    const categoriesCollection = database.skillcategories;
    await categoriesCollection.createNew(displayName, color);
}

export default function NewCategoryModal({ navigation }): JSX.Element {
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
            <ColorPicker onSelectColor={(newcolor) => setNewColor(newcolor)} />
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
