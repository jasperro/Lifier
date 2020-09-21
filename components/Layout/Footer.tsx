import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import Colors from "../../constants/Colors";
import { MonoText } from "../Style/StyledText";
import { Text, View } from "../Style/Themed";
import { XPSetter } from "../XP";
import Timer from "../Timer";

export default function Footer({ path }: { path: string }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
        <MonoText lightColor={Colors.light.tint}>
          This app was made by jasperro, sweatplant, hugodh and trevorsen
        </MonoText>
      </TouchableOpacity>
      <Timer />
    </ScrollView>
  );
}

function handleHelpPress() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
