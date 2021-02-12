import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Switch, Text } from "react-native-paper";
import { SkillCategoryType } from "root/model/skillcategory.schema";
import { SettingType } from "root/model/setting.schema";
import { View } from "styled/Themed";

export function SettingsItemBoolean(props: {
    displayname: string;
    settingid: string;
}): JSX.Element {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = async () => {
        setIsEnabled(!isEnabled);
        const database = await databasePromise;
        // Pak de lijst met instellingen uit de database
        const settingsCollection = database.settings;

        // Als de instelling niet bestaat, maak de instelling aan.
        await settingsCollection.atomicUpsert({
            setting_id: props.settingid,
            state: !isEnabled,
        });
    };

    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            // Pak de lijst met instellingen uit de database
            const settingsCollection = database.settings;

            // Zet switch naar state uit database
            const query = settingsCollection
                .findOne()
                .where("setting_id")
                .eq(props.settingid);
            query.exec().then(async (document: SkillCategoryType) => {
                if (document == null) {
                    document = await settingsCollection.atomicUpsert({
                        setting_id: props.settingid,
                        state: false,
                    });
                }
                document.$.subscribe((changeEvent) => {
                    setIsEnabled(changeEvent.state);
                });
            });
        })();
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

export function SettingsItemString(props: {
    displayname: string;
    settingid: string;
}): JSX.Element {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = async () => {
        setIsEnabled(!isEnabled);
        const database = await databasePromise;
        // Pak de lijst met instellingen uit de database
        const settingsCollection = database.settings;

        // Als de instelling niet bestaat, maak de instelling aan.
        await settingsCollection.atomicUpsert({
            setting_id: props.settingid,
            state: !isEnabled,
        });
    };

    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            // Pak de lijst met instellingen uit de database
            const settingsCollection = database.settings;

            // Zet switch naar state uit database
            const query = settingsCollection
                .findOne()
                .where("setting_id")
                .eq(props.settingid);
            query.exec().then(async (document: SettingType) => {
                if (document == null) {
                    document = await settingsCollection.atomicUpsert({
                        setting_id: props.settingid,
                        state: false,
                    });
                }
                document.$.subscribe((changeEvent) => {
                    setIsEnabled(changeEvent.state);
                });
            });
        })();
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
