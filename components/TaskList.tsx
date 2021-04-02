import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { TaskSchema } from "root/model/task.type";
import { RxCollection, RxDocument } from "rxdb";
import databasePromise from "model/database";

async function editTask(taskId: string, displayName: string) {
    if (displayName.length > 0) {
        const database = await databasePromise;
        const tasksCollection: RxCollection<RxDocument<TaskSchema>> =
            database.tasks;
        const query = tasksCollection.findOne(taskId);
        const document = await query.exec();
        if (document != null) {
            document.edit(displayName);
        }
    }
}
interface TaskList
    extends Partial<React.ComponentPropsWithRef<typeof FlatList>> {
    list: Array<RxDocument<TaskSchema>>;
}

export default function TaskList({ list, ...rest }: TaskList): JSX.Element {
    return (
        <FlatList
            {...rest}
            data={list}
            keyExtractor={(item) => item.task_id}
            renderItem={({ item }) => <TaskCard item={item}></TaskCard>}
        />
    );
}

function TaskCard({ item }: { item: RxDocument<TaskSchema> }) {
    function Icon() {
        return <MaterialIcons name="assignment" size={48} color={item.color} />;
    }

    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState("");

    return (
        <Card style={styles.card} key={item.task_id}>
            <Card.Title
                leftStyle={{
                    flexDirection: "row",
                    width: "auto",
                    alignItems: "center",
                }}
                left={() => {
                    // We hebben een lijst met RxDocument in list
                    /*const [colorToSet, setColorToSet] = useState(
                                            "#ffffff"
                                        );
                                        useEffect(() => {
                                            async () => {
                                                setColorToSet(
                                                    await item.category_.color
                                                );
                                            };
                                        });*/
                    return (
                        <>
                            <Icon></Icon>
                            {editMode ? (
                                <TextInput
                                    mode="outlined"
                                    placeholder={item.display_name}
                                    value={newName}
                                    onChangeText={(text) => setNewName(text)}
                                    onBlur={() => setEditMode(false)}
                                    onSubmitEditing={() =>
                                        editTask(item.task_id, newName)
                                    }
                                    autoFocus={true}
                                ></TextInput>
                            ) : (
                                <>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            paddingLeft: 10,
                                        }}
                                    >
                                        {item.display_name}
                                    </Text>
                                    <IconButton
                                        icon="pencil"
                                        size={24}
                                        onPress={() => {
                                            setEditMode(true);
                                        }}
                                    />
                                </>
                            )}
                        </>
                    );
                }}
                right={() => {
                    return (
                        <>
                            <IconButton
                                icon="delete"
                                size={24}
                                onPress={() => item.delete()}
                            />
                            <IconButton
                                icon="check"
                                size={24}
                                onPress={() => item.finish()}
                            />
                        </>
                    );
                }}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
    },
});
