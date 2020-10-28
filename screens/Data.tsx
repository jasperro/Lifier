import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { View, ScrollView } from "styled/Themed";
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
    Background,
} from "victory-native";
import { Svg, Defs, LinearGradient, Stop } from "react-native-svg";
import { withTheme, useTheme, Subheading } from "react-native-paper";

function chartBackground(colors) {
    return {
        backgroundGradientFrom: `${colors.surface}`,
        backgroundGradientTo: `${colors.surface}`,
        color: (opacity = 1) => `${colors.accent}`,
        labelColor: (opacity = 1) => `${colors.text}`,
    };
}

export default function Data() {
    const height = 400;
    const width = useWindowDimensions().width;

    const { dark: isDarkTheme, colors } = useTheme();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.separator} />

            <Subheading style={styles.title}>Recent Activity</Subheading>
            <Svg style={{ position: "absolute" }} width="0" height="0">
                <Defs>
                    <LinearGradient
                        id="fillShadowRGradient"
                        gradientUnits="userSpaceOnUse"
                        y2={height}
                        x1={0}
                        y1={0}
                        x2={0}
                    >
                        <Stop
                            offset={0}
                            stopColor={colors.accent}
                            stopOpacity={0.8}
                        ></Stop>
                        <Stop
                            offset={1}
                            stopColor={colors.accent}
                            stopOpacity={0.4}
                        ></Stop>
                    </LinearGradient>
                </Defs>
            </Svg>
            <VictoryChart
                height={400}
                width={width}
                theme={VictoryTheme.material}
                style={{
                    background: { fill: colors.surface },
                }}
                backgroundComponent={<Background />}
                domainPadding={60}
            >
                <VictoryBar
                    cornerRadius={0}
                    style={{
                        data: {
                            fill: "url(#fillShadowRGradient)",
                        },
                    }}
                    barWidth={60}
                    data={[
                        { x: "cats", y: 1 },
                        { x: "dogs", y: 2 },
                        { x: "birds", y: 3 },
                        { x: "fish", y: 2 },
                        { x: "frogs", y: 1 },
                    ]}
                    width={width}
                />
            </VictoryChart>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4D6180",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
