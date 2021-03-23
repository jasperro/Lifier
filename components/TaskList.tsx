import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { TaskSchema } from "root/model/task.type";

export default function TaskList({
    list,
}: {
    list: Array<TaskSchema>;
}): JSX.Element {
    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.task_id}
            renderItem={({ item }) => {
                const Icon = function Icon() {
                    return (
                        <MaterialIcons
                            name="assignment"
                            size={48}
                            color={item.color}
                        />
                    );
                };
                return (
                    <Card style={styles.card} key={item.task_id}>
                        <Card.Title
                            title={item.display_name}
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
                                return <Icon></Icon>;
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
            }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
    },
});
