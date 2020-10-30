import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { View, ScrollView } from "styled/Themed";
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    Background,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { withTheme, useTheme, Subheading } from "react-native-paper";
import chartTheme from "root/constants/chartTheme";

function Data() {
    const height = 400;
    const width = useWindowDimensions().width - 40;

    const { dark: isDarkTheme, colors, fonts } = useTheme();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.separator} />

            <Subheading style={styles.title}>Recent Activity</Subheading>
            <VictoryChart
                height={400}
                width={width}
                theme={chartTheme(colors, fonts)}
                style={{
                    background: { fill: colors.surface },
                }}
                backgroundComponent={<Background />}
                domainPadding={60}
            >
                <VictoryBar
                    cornerRadius={20}
                    style={{
                        data: {
                            fill: "url(#fillShadowRGradient)",
                        },
                    }}
                    barWidth={40}
                    data={[
                        { x: "Monday", y: 1 },
                        { x: "Tuesday", y: 2 },
                        { x: "Wednesday", y: 3 },
                        { x: "Thursday", y: 2 },
                        { x: "Friday", y: 1 },
                    ]}
                    width={width}
                />

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
            </VictoryChart>
        </ScrollView>
    );
}

export default withTheme(Data);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
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
