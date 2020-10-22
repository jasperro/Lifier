import { decode, encode } from 'base-64'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper'
import { PreferencesProvider } from './PreferencesContext'
import { fonts as fontList } from './fontconfig'

const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
    },
    fonts: fontList,
}
const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
    fonts: fontList,
}

if (!global.btoa) {
    global.btoa = encode
}

if (!global.atob) {
    global.atob = decode
}

// Avoid using node dependent modules
process.browser = true

export default function App() {
    const isLoadingComplete = useCachedResources()

    const [isThemeDark, setIsThemeDark] = React.useState(false)
    const [accentColor, setAccentColor] = React.useState('#0077ce')

    const baseTheme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

    const theme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: accentColor,
            accent: accentColor,
        },
        fonts: fontList,
    }

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark)
    }, [isThemeDark])

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
            setAccentColor,
        }),
        [toggleTheme, isThemeDark, setAccentColor]
    )

    if (!isLoadingComplete) {
        return null
    }
    return (
        <PreferencesProvider value={preferences}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <Navigation theme={theme} />
                    <StatusBar />
                </SafeAreaProvider>
            </PaperProvider>
        </PreferencesProvider>
    )
}
