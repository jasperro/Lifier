import databasePromise from "model/database";
import React, { useEffect, useState } from "react";
import { StyleSheet, View as TransparentView } from "react-native";
import { ProgressBar, Text, useTheme } from "react-native-paper";
import { getSetting, SettingId } from "root/model/setting.schema";
import { View } from "./Style/Themed";

export default function XPBar(): JSX.Element {
    const { colors } = useTheme();
    const [XPAmount, setXPAmount] = useState(0);
    const themedstyles = StyleSheet.create({
        xpbar: {
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: colors.surface,
        },
    });
    useEffect(() => {
        (async () => {
            const result = await getSetting(SettingId.CurrentXP);
            result.$.subscribe((changeEvent) => {
                setXPAmount(changeEvent.state);
            });
        })();
    }, []);
    const returned = React.useMemo(() => {
        return (
            <View style={themedstyles.xpbar}>
                <ProgressBar
                    style={{ height: 10 }}
                    progress={XPAmount / 1000 - ((XPAmount / 1000) >> 0)}
                />
                <TransparentView
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minHeight: 70,
                        alignItems: "stretch",
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >
                    <TransparentView
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={[
                                styles.xpdot,
                                {
                                    backgroundColor: colors.background,
                                    marginRight: 10,
                                },
                            ]}
                        >
                            <Text style={{ fontSize: 20, textAlign: "center" }}>
                                {~~(XPAmount / 1000) + 1}
                            </Text>
                        </View>
                        {/*<Text style={{ fontSize: 16, fontFamily: "InterLight" }}>
                        Rookie Guitar Player
                    </Text>*/}
                    </TransparentView>
                    <Text
                        style={{
                            fontSize: 24,
                            height: "auto",
                            alignSelf: "center",
                        }}
                    >{`${XPAmount}/${
                        ((XPAmount / 1000) >> 0) * 1000 + 1000
                    } XP`}</Text>
                    <TransparentView
                        style={{
                            flex: 1,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={[
                                styles.xpdot,
                                {
                                    backgroundColor: colors.primary,
                                    marginLeft: 10,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                {~~(XPAmount / 1000) + 2}
                            </Text>
                        </View>
                    </TransparentView>
                </TransparentView>
            </View>
        );
    }, [XPAmount, colors]);

    return returned;
}
const styles = StyleSheet.create({
    xpdot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
    },
});
