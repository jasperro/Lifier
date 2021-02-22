import { decode, encode } from "base-64";

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import databasePromise from "model/database";
import { enableScreens } from "react-native-screens";

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import { PreferencesProvider } from "./PreferencesContext";
import { fonts as fontList } from "./fontconfig";
import { RxDatabase } from "rxdb";
import { SettingType } from "model/setting.schema";

const ExtraTheme = {
    colors: { textLight: "#ffffff", textDark: "#000000" },
};

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        ...ExtraTheme.colors,
    },
    fonts: fontList,
};
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        ...ExtraTheme.colors,
    },
    fonts: fontList,
};

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;
enableScreens();

export default function App(): JSX.Element {
    const isLoadingComplete = useCachedResources();

    const [isThemeDark, setIsThemeDark] = useState(false);
    const [accentColor, setAccentColor] = useState("#0077ce");

    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            // Pak de lijst met instellingen uit de database
            const settingsCollection = database.settings;

            // Zet switch naar state uit database
            const query = settingsCollection
                .findOne()
                .where("setting_id")
                .eq("dark_mode");
            let document = await query.exec();
            if (document == null) {
                document = await settingsCollection.atomicUpsert({
                    setting_id: "dark_mode",
                    state: false,
                });
            }
            document.$.subscribe((changeEvent: SettingType) => {
                setIsThemeDark(
                    typeof changeEvent.state == "boolean"
                        ? changeEvent.state
                        : false
                );
            });
        })();
    }, []);

    const baseTheme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const theme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: accentColor,
            accent: accentColor,
        },
        fonts: fontList,
    };

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
            setAccentColor,
            accentColor,
        }),
        [toggleTheme, isThemeDark, setAccentColor, accentColor]
    );

    if (!isLoadingComplete) {
        return null;
    }
    return (
        <PreferencesProvider value={preferences}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider
                    style={{
                        overflow: "hidden",
                    }} /* Tijdelijke fix voor react-navigation */
                >
                    <Navigation theme={theme} />
                    <StatusBar />
                </SafeAreaProvider>
            </PaperProvider>
        </PreferencesProvider>
    );
}
