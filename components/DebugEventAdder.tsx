import databasePromise from "model/database";
import React, { useState } from "react";
import { Button, Menu } from "react-native-paper";
import { action_enum, action_type_enum } from "root/model/event.schema";

async function createEvent(
    actionType: keyof typeof action_type_enum,
    action: keyof typeof action_enum
) {
    const database = await databasePromise;
    const eventsCollection = database.events;
    await eventsCollection.createNew(actionType, action);
}

export default function DebugEventAdder(): JSX.Element {
    const [actionType, setActionType] = useState<keyof typeof action_type_enum>(
        "Other"
    );
    const [tVisible, setTVisible] = React.useState(false);
    const [action, setAction] = useState<keyof typeof action_enum>("Other");
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                    <Button onPress={() => setVisible(true)}>Show menu</Button>
                }
            >
                {Object.keys(action_enum)
                    .filter((val) => typeof val === "string")
                    .map((value, idx) => {
                        return (
                            <Menu.Item
                                key={idx}
                                title={value}
                                onPress={() => setAction(value)}
                            />
                        );
                    })}
            </Menu>
            <Menu
                visible={tVisible}
                onDismiss={() => setTVisible(false)}
                anchor={
                    <Button onPress={() => setTVisible(true)}>
                        Show type menu
                    </Button>
                }
            >
                {Object.keys(action_type_enum)
                    .filter((val) => typeof val === "string")
                    .map((value, idx) => {
                        return (
                            <Menu.Item
                                key={idx}
                                title={value}
                                onPress={() => setActionType(value)}
                            />
                        );
                    })}
            </Menu>
            <Button
                onPress={() => {
                    //createEvent(actionType);
                    createEvent(actionType, action);
                }}
            >
                Voeg event toe
            </Button>
        </>
    );
}
