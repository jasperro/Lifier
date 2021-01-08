import { StackRouterOptions } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Appbar } from "react-native-paper";

export default (
    path: Array<string> = [],
    backaction: () => any
): StackNavigationOptions => {
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
