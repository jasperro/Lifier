import databasePromise from "model/database";
import { CategorySchema } from "model/category.type";
import React, { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ColorPicker from "root/components/ColorPicker";

//const validate = validator(CategorySchema);
// Validatie voor input
/*console.log(
    "should be valid",
    validate({
        id: "328847392",
        display_name: "banaan",
    }),
    validate.errors
);
console.log("should not be valid", validate({}));*/

async function createSkillCategory(
    displayName: CategorySchema["display_name"],
    color: CategorySchema["color"]
) {
    const database = await databasePromise;
    const categoriesCollection = database.skillcategories;
    await categoriesCollection.createNew(displayName, color);
}

export default function NewCategoryModal({ navigation }): JSX.Element {
    const [newcategory, setNewCategory] = useState("");
    const [newcolor, setNewColor] = useState("");
    return (
        <ScrollView
            style={{
                height: "100%",
                maxHeight: Dimensions.get("window").height,
            }}
        >
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
        </ScrollView>
    );
}
