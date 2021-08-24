import { StackRouterOptions } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Appbar } from "react-native-paper";

export default (
    path: Array<string> = [],
    backaction: Function | undefined = undefined
): StackNavigationOptions => {
    return {
        header: function Header({ route, options, navigation }) {
            const title =
                options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : route.name;

            backaction = navigation.canGoBack()
                ? navigation.goBack
                : backaction;

            const backbutton = backaction ? (
                <Appbar.BackAction onPress={backaction} />
            ) : null;

            return (
                <Appbar.Header>
                    {backbutton}
                    <Appbar.Content title={title} subtitle={path.join(" > ")} />
                </Appbar.Header>
            );
        },
    };
};
