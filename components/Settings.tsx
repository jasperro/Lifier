import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Switch, Text, TextInput } from "react-native-paper";
import ColorPicker from "root/components/ColorPicker";
import { SettingSchema } from "root/model/setting.type";
import PreferencesContext from "root/PreferencesContext";
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
            query.exec().then(async (document: SettingSchema) => {
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
    const [currentString, setCurrentString] = useState("");
    const setString = async (value: string) => {
        setCurrentString(value);
        const database = await databasePromise;
        // Pak de lijst met instellingen uit de database
        const settingsCollection = database.settings;

        // Als de instelling niet bestaat, maak de instelling aan.
        await settingsCollection.atomicUpsert({
            setting_id: props.settingid,
            state: value,
        });
    };

    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            // Pak de lijst met instellingen uit de database
            const settingsCollection = database.settings;

            // Zet string naar state uit database
            const query = settingsCollection
                .findOne()
                .where("setting_id")
                .eq(props.settingid);
            query.exec().then(async (document: SettingSchema) => {
                if (document == null) {
                    document = await settingsCollection.atomicUpsert({
                        setting_id: props.settingid,
                        state: "",
                    });
                }

                setCurrentString(document.state);
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text>{props.displayname}</Text>
                <Text>{props.settingid}</Text>
            </View>
            <TextInput
                onChangeText={async (value) => setString(value)}
                value={currentString}
            />
        </View>
    );
}

export function SettingsItemColor(props: {
    displayname: string;
    settingid: string;
}): JSX.Element {
    const { setAccentColor } = React.useContext(PreferencesContext);

    // Super janky? asyncData is ervoor om de query niet steeds te hoeven
    // herdefiniëren en dat de dependencies gereed zijn. Alle constantes worden
    // eenmalig ingesteld. Misschien useMemo gebruiken?

    const asyncData = (async () => {
        const database = await databasePromise;
        // Pak de lijst met instellingen uit de database
        const settingsCollection = database.settings;

        // Stel query op
        const query = settingsCollection
            .findOne()
            .where("setting_id")
            .eq(props.settingid);
        return {
            query: query,
            settingsCollection: settingsCollection,
        };
    })();

    const onSelectColor = async (color: string) => {
        setAccentColor(color);
        const { query, settingsCollection } = await asyncData;
        query.exec().then(async (document: SettingSchema) => {
            await settingsCollection.atomicUpsert({
                setting_id: props.settingid,
                state: color,
            });
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>{props.displayname}</Text>
                <Text>{props.settingid}</Text>
            </View>
            <ColorPicker onSelectColor={onSelectColor} />
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
