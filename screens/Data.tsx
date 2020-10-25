import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { View, ScrollView } from "styled/Themed";
import { LineChart, BarChart } from "react-native-chart-kit";

import { Text } from "react-native-paper";
import Footer from "../components/Layout/Footer";

import { withTheme, useTheme, Subheading } from "react-native-paper";

export default function Data() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.separator} />

            <Subheading style={styles.title}>Recent Activity</Subheading>
            <GrafiekBar />
            <Grafiek />
            <Grafiek />
            <Footer path="/screens/Data.tsx" />
        </ScrollView>
    );
}

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );

    return debouncedValue;
}

function Grafiek() {
    const { dark: isDarkTheme, colors } = useTheme();
    return (
        <LineChart
            data={{
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                ],
                datasets: [
                    {
                        data: [100, 200, 150, 170, 120, 80],
                    },
                ],
            }}
            width={useDebounce(useWindowDimensions().width - 80, 200)} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: colors.accent,
                backgroundGradientFrom: colors.accent,
                backgroundGradientTo: colors.accent,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: colors.accent,
                },
                propsForLabels: {
                    fontFamily: "InterMedium",
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
}

function GrafiekBar() {
    const { dark: isDarkTheme, colors } = useTheme();
    return (
        <BarChart
            data={{
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                ],
                datasets: [
                    {
                        data: [100, 200, 150, 170, 120, 80],
                    },
                ],
            }}
            width={useDebounce(useWindowDimensions().width - 80, 200)} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: colors.accent,
                backgroundGradientFrom: colors.accent,
                backgroundGradientTo: colors.accent,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: colors.accent,
                },
                propsForLabels: {
                    fontFamily: "InterMedium",
                },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 40,
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
