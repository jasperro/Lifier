import React, { useState } from "react";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import databasePromise from "model/database";
import { EventSchema } from "root/model/event.type";

async function createEvent(actionType: EventSchema["action"]) {
    const database = await databasePromise;
    const eventsCollection = database.events;
    await eventsCollection.createNew(actionType);
}

export default function AddNewEvent(props): JSX.Element {
    const [actionType, setActionType] = useState("");
    return (
        <>
            <TextInput
                label="Nieuwe Action Type"
                value={actionType}
                onChangeText={(actionType) => setActionType(actionType)}
            />
            <Button
                onPress={() => {
                    createEvent(actionType);
                }}
            >
                Voeg event toe
            </Button>
        </>
    );
}
