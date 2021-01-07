import React from "react";
import {
    StyleSheet,
    View as OriginalView,
    ScrollView as OriginalScrollView,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import { useTheme, Subheading } from "react-native-paper";
import Color from "color";

type ViewProps = React.ComponentPropsWithRef<typeof View> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type ScrollViewProps = React.ComponentPropsWithRef<typeof ScrollView> & {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type SubheadingProps = React.ComponentPropsWithRef<typeof Subheading> & {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
};

const ThemedView: React.FC = ({ style, ...rest }: ViewProps) => {
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

export const TransparentView: React.FC = ({ style, ...rest }: ViewProps) => {
    return (
        <OriginalView
            {...rest}
            style={[
                {
                    backgroundColor: "transparent",
                },
                style,
            ]}
        />
    );
};

export const ColoredSubheading: React.FC = ({ ...rest }: SubheadingProps) => {
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

const ThemedScrollView: React.FC = ({ style, ...rest }: ScrollViewProps) => {
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
