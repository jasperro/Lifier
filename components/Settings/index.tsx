import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, Switch } from "react-native-paper";
import { View } from "styled/Themed";
import { isRxCollection, isRxDocument } from "rxdb";
import { useRxDB } from 'rxdb-hooks';

export function SettingsItem(props: {
    displayname: string;
    settingid: string;
}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const database = useRxDB();

    console.dir(database);
    useEffect(() => {
        async function databaseStuff() {
            async () => {
                // Pak de lijst met instellingen uit de database
                const settingsCollection = database.settings;
                // Als de instelling niet bestaat, maak de instelling aan.
                let setting = await settingsCollection.atomicUpsert({
                    setting_id: props.settingid,
                    bool_state: isEnabled
                });

                const query = settingsCollection.findOne().where("setting_id").eq(props.settingid);
                query.exec().then(async document => setIsEnabled(document.get("bool_state")));
            };
        }

        databaseStuff();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <Text>{props.displayname}</Text>
                <Text>{props.settingid}</Text>
                <Text>{isEnabled.toString()}</Text>
            </View>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.settingswitch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    settingswitch: {
        margin: 10,
    },
});
