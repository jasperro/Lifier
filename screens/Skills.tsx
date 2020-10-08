import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, FAB } from "react-native-paper";
import { View } from "styled/Themed";
import Footer from "../components/Layout/Footer";

export default function Skills() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skills</Text>
            <View
                style={styles.separator}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log("Pressed")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
