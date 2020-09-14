import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { updateXP } from "../storage/Experience";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import XPCounter from "./XPCounter";

export default function Footer({ path }: { path: string }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
        <MonoText lightColor={Colors.light.tint}>
          This app was made by jasperro, sweatplant, hugodh and trevorsen
        </MonoText>
      </TouchableOpacity>
      <XPCounter></XPCounter>
    </ScrollView>
  );
}

function handleHelpPress() {
  updateXP(10);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
