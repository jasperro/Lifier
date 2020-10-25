import React, { Component } from "react";
import {
    StyleSheet,
    View as OriginalView,
    ScrollView as OriginalScrollView,
    StyleProp,
    ViewStyle,
} from "react-native";
import { withTheme, useTheme } from "react-native-paper";

type ViewProps = React.ComponentPropsWithRef<typeof View> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;

    theme: ReactNativePaper.Theme;
};

type ScrollViewProps = React.ComponentPropsWithRef<typeof ScrollView> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;

    theme: ReactNativePaper.Theme;
};

const ThemedView = ({ style, theme, ...rest }: ViewProps) => {
    const { dark: isDarkTheme, colors } = useTheme();
    return (
        <OriginalView
            {...rest}
            style={[
                {
                    backgroundColor: colors.background,
                },
                style,
            ]}
        />
    );
};

const ThemedScrollView = ({ style, theme, ...rest }: ScrollViewProps) => {
    const { dark: isDarkTheme, colors } = useTheme();
    return (
        <OriginalScrollView
            {...rest}
            style={[
                {
                    backgroundColor: colors.background,
                },
                style,
            ]}
        />
    );
};

export const View = withTheme(ThemedView);
export const ScrollView = withTheme(ThemedScrollView);
