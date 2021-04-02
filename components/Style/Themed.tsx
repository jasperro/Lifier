import Color from "color";
import React from "react";
import {
    ScrollView as OriginalScrollView,
    StyleProp,
    StyleSheet,
    TextStyle,
    View as OriginalView,
    ViewStyle,
} from "react-native";
import { Subheading, useTheme } from "react-native-paper";

type ViewProps = React.ComponentPropsWithRef<typeof OriginalView> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type ScrollViewProps = React.ComponentPropsWithRef<
    typeof OriginalScrollView
> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type SubheadingProps = React.ComponentPropsWithRef<typeof Subheading> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const ThemedView = ({ style, ...rest }: ViewProps): JSX.Element => {
    const { colors } = useTheme();
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

export const ColoredSubheading = ({
    ...rest
}: SubheadingProps): JSX.Element => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        title: {
            marginTop: 10,
            marginBottom: 5,
            fontSize: 20,
            color: `${Color(colors.accent).desaturate(0.6)}`,
        },
    });
    return <Subheading {...rest} style={styles.title} />;
};

const ThemedScrollView = ({ style, ...rest }: ScrollViewProps): JSX.Element => {
    const { colors } = useTheme();
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

export const View = ThemedView;
export const ScrollView = ThemedScrollView;
