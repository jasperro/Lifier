import {
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as React from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                // SplashScreen.preventAutoHideAsync();
                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
                    InterThin: Inter_100Thin,
                    InterLight: Inter_300Light,
                    InterRegular: Inter_400Regular,
                    InterMedium: Inter_500Medium,
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                // SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
