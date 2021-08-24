import React, { useState } from "react";
import { Button } from "react-native-paper";
import { TextInput, Text } from "react-native-paper";
import databasePromise from "model/database";
import ColorPicker from "root/components/ColorPicker";
import { Route } from "@react-navigation/native";

async function editSkill(skillId: string, displayName: string) {
    const database = await databasePromise;
    const skillsCollection = database.skills;
    const query = await skillsCollection.findOne(skillId);
    const document = await query.exec();
    document.edit(displayName);
}

export default function EditSkillModal({
    route,
    navigation,
}: {
    route: Route;
    navigation: NavigationType;
}): JSX.Element {
    const { skillId, skillName } = route.params;
    const [newSkill, setNewSkill] = useState(skillName);
    return (
        <>
            <Text>Je bewerkt {skillName}</Text>
            <TextInput
                label="Nieuwe Skill Naam"
                value={newSkill}
                onChangeText={(newSkill) => setNewSkill(newSkill)}
            />
            <Button
                onPress={() => {
                    editSkill(skillId, newSkill);
                    navigation.goBack();
                }}
            >
                Bewerk skill
            </Button>
        </>
    );
}
