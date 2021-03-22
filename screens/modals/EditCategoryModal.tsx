import databasePromise from "model/database";
import { SkillCategorySchema } from "model/skillcategory.type";
import React, { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ColorPicker from "root/components/ColorPicker";

async function editSkillCategory(
    categoryId: SkillCategorySchema["skill_category_id"],
    displayName: SkillCategorySchema["display_name"],
    color: SkillCategorySchema["color"]
) {
    const database = await databasePromise;
    const categoriesCollection = database.skillcategories;
    const query = await categoriesCollection.findOne(categoryId);
    const document = await query.exec();
    document.edit(displayName, color);
}

export default function EditCategoryModal({ navigation, route }): JSX.Element {
    const { displayName, categoryId } = route.params;
    const [newcategory, setNewCategory] = useState(displayName);
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
                    editSkillCategory(categoryId, newcategory, newcolor);
                    navigation.goBack();
                }}
            >
                Bewerk categorie
            </Button>
        </ScrollView>
    );
}
