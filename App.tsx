import "react-native-get-random-values";
import { decode, encode } from "base-64";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import databasePromise from "model/database";
import { SettingSchema } from "model/setting.type";
import React, { useEffect, useState } from "react";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { fonts as fontList } from "./fontconfig";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { PreferencesProvider } from "./PreferencesContext";
import { getSetting, SettingId } from "./model/setting.schema";

//Nooit NodeJS modules gebruiken
process.browser = true;

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

// Polyfill voor React Native
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

enableScreens();

export default function App(): JSX.Element {
    const isLoadingComplete = useCachedResources();

    const [isThemeDark, setIsThemeDark] = useState(false);
    const [accentColor, setAccentColor] = useState("#0077ce");
    const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false);

    useEffect(() => {
        (async () => {
            const darkPromise = async () => {
                const result = await getSetting(SettingId.DarkMode);
                result.$.subscribe((changeEvent: SettingSchema) => {
                    setIsThemeDark(
                        typeof changeEvent.state == "boolean"
                            ? changeEvent.state
                            : false
                    );
                });
            };

            const accentPromise = async () => {
                const result = await getSetting(SettingId.AccentColor);
                result.$.subscribe((changeEvent: SettingSchema) => {
                    setAccentColor(
                        typeof changeEvent.state == "string"
                            ? changeEvent.state
                            : "#0077ce"
                    );
                });
            };

            await Promise.all([accentPromise(), darkPromise()]).catch(
                (error) => {
                    console.error(error.message);
                }
            );

            setIsDBLoadingComplete(true);
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

    if (!isLoadingComplete || !isDBLoadingComplete) {
        return <></>;
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
