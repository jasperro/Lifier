import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "styled/Themed";

import { Text } from "react-native-paper";
import Footer from "../components/Layout/Footer";

export default function Data() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <View
                style={styles.separator}
            />
            <Footer path="/screens/Data.tsx" />
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
});
