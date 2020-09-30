import * as React from "react";
import { StyleSheet, Switch } from "react-native";

import { Text, View, TextInput } from "../components/Style/Themed";
import { SettingsItem } from "../components/Settings";
//import { setSettingState, getSettingState } from "../database/settings";

/*(async function () {
  let books = await getSettingState("dark_mode");
  console.log(books);
})();*/
import database from "../model/database";

export default function Settings() {
  database.then((database) => console.log(database));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <SettingsItem settingid="dark_mode" displayname="Dark Mode" />
      <SettingsItem
        settingid="db_sync"
        displayname="Database Synchronisation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
