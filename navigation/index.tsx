import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import NewCategoryModal from "root/components/NewCategoryModal";
import NewSkillModal from "root/components/NewSkillModal";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation(props): JSX.Element {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={props.theme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            {/*TODO: kijken of het wel nuttig is om het via reactnavigation te doen, in plaats van react native modals.*/}
            <Stack.Screen name="NewCategory" component={NewCategoryModal} />
            <Stack.Screen name="NewSkill" component={NewSkillModal} />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
        </Stack.Navigator>
    );
}
