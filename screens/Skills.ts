import { StyleSheet, Platform } from "react-native";

export const styles = {
    ...StyleSheet.create({
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
        bottominput: {
            position: "absolute",
            margin: 16,
            right: "auto",
            left: "auto",
            bottom: 0,
            width: "70%",
        },
        card: {
            marginBottom: 4,
            marginTop: 4,
            height: 210,
            ...(Platform.OS == "web" && { cursor: "pointer" }),
        },
    }),
    cardlist: {
        width: "100%",
    },
};
