import React, { useState } from "react";
import { Button } from "react-native-paper";
import { TextInput, Text } from "react-native-paper";
import databasePromise from "model/database";
import ColorPicker from "root/components/ColorPicker";
import { Route } from "@react-navigation/native";

async function createSkill(categoryId: string, displayName: string) {
    const database = await databasePromise;
    const skillsCollection = database.skills;
    await skillsCollection.createNew(categoryId, displayName);
}

export default function NewSkillModal({
    route,
    navigation,
}: {
    route: Route;
    navigation: NavigationType;
}): JSX.Element {
    const [newSkill, setNewSkill] = useState("");
    const { categoryName, categoryId } = route.params;
    return (
        <>
            <Text>Je maakt een nieuwe skill in {categoryName}</Text>
            <TextInput
                label="Nieuwe Skill Naam"
                value={newSkill}
                onChangeText={(newSkill) => setNewSkill(newSkill)}
            />
            <Button
                onPress={() => {
                    console.log(categoryId);
                    createSkill(categoryId, newSkill);
                    navigation.goBack();
                }}
            >
                Maak skill
            </Button>
        </>
    );
}
