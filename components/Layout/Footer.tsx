import React from "react";
import { StyleSheet } from "react-native";

import { View } from "styled/Themed";

export default function Footer({}: { path: string }): JSX.Element {
    return <View style={styles.container} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0,
    },
});
