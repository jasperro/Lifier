import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "react-native-paper";
import { XPSetter } from "../XP";
import Timer from "../Timer";
import { View } from "../Style/Themed";

export default function Footer({ path }: { path: string }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
        <Text>
          This app was made by jasperro, sweatplant, hugodh and trevorsen
        </Text>
      </TouchableOpacity>
      <Timer />
    </View>
  );
}

function handleHelpPress() { }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 0,
  },
});
