import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Appbar } from "react-native-paper";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation(props) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={props.theme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

export const DefaultStackOptions = (
    path: Array<string> = [],
    backaction: () => any
) => {
    return {
        header: function Header({ scene, previous, navigation }) {
            const { options } = scene.descriptor;
            const title =
                options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;

            backaction = previous ? navigation.goBack : backaction;

            const backbutton = backaction ? (
                <Appbar.BackAction onPress={backaction} />
            ) : undefined;

            return (
                <Appbar.Header>
                    {backbutton}
                    <Appbar.Content title={title} subtitle={path.join(" > ")} />
                </Appbar.Header>
            );
        },
    };
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
        </Stack.Navigator>
    );
}
