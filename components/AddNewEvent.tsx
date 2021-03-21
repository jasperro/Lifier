import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { Button, Menu } from "react-native-paper";
import { action_enum, action_type_enum } from "root/model/event.schema";
import { EventSchema } from "root/model/event.type";

async function createEvent(actionType: action_type_enum, action: action_enum) {
    const database = await databasePromise;
    const eventsCollection = database.events;
    await eventsCollection.createNew(actionType, action);
}

export default function AddNewEvent(props): JSX.Element {
    const [actionType, setActionType] = useState<action_type_enum>();
    const [tVisible, setTVisible] = React.useState(false);
    const [action, setAction] = useState<action_enum>();
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
