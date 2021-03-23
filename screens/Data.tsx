import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import DebugEventAdder from "root/components/DebugEventAdder";
import XPBar from "root/components/XPBar";
import chartTheme from "root/constants/chartTheme";
import { EventSchema } from "root/model/event.type";
import { RxDocument } from "rxdb";
import { ColoredSubheading, ScrollView, View } from "styled/Themed";
import { Background, VictoryBar, VictoryChart } from "victory-native";

function Data(): JSX.Element {
    const height = 400;
    const width = useWindowDimensions().width;
    function getMonday() {
        const d = new Date();
        const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // Op zondag, maandag van "vorige" week
        return new Date(d.setDate(diff)).setHours(0, 0, 0, 0);
    }
    const mondayUnix = getMonday().valueOf(); // Unix timestamp van de start eerste maandag van de week
    const nextMondayUnix = mondayUnix + 86400000 * 7; // en timestamp van de volgende maandag

    const baseArray = [
        { x: "Monday", y: 0 },
        { x: "Tuesday", y: 0 },
        { x: "Wednesday", y: 0 },
        { x: "Thursday", y: 0 },
        { x: "Friday", y: 0 },
        { x: "Saturday", y: 0 },
        { x: "Sunday", y: 0 },
    ];

    const [barGraphData, setBarGraphData] = useState(baseArray);

    const { colors, fonts } = useTheme();
    const [list, setList] = useState<Array<RxDocument<EventSchema>>>([]);
    useEffect(() => {
        (async () => {
            const database = await databasePromise;
            const eventCollection = database.events;

            const query = eventCollection
                .find({
                    selector: {
                        start_time: { $gte: mondayUnix, $lt: nextMondayUnix },
                    },
                })
                .sort({ start_time: "desc" }); // Query voor alle gegevens van de week.
            query.$.subscribe((documents: RxDocument<EventSchema>[]) => {
                setList(documents);
                setBarGraphData(
                    baseArray.map((item, index) => {
                        return {
                            x: item.x,
                            y: documents.filter((item) => {
                                return (
                                    item.start_time >=
                                        mondayUnix + 86400000 * index &&
                                    item.start_time <
                                        mondayUnix + 86400000 * (index + 1)
                                );
                            }).length,
                        };
                    })
                );
            });
        })();
    }, []);

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.separator} />
                {/*<DebugEventAdder />*/}

                <ColoredSubheading>Recent Activity</ColoredSubheading>
                <VictoryChart
                    height={400}
                    width={width}
                    padding={{ right: 0, left: 40, top: 50, bottom: 50 }}
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
                        data={barGraphData}
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

            <XPBar />
        </>
    );
}

export default Data;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
