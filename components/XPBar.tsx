import React, { useEffect, useState } from "react";
import { ProgressBar, useTheme, Text } from "react-native-paper";
import { View as TransparentView, StyleSheet } from "react-native";
import { View } from "./Style/Themed";
import databasePromise from "model/database";
import { SettingSchema } from "root/model/setting.type";

export default function XPBar(props): JSX.Element {
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
            const database = await databasePromise;
            const settingsCollection = database.settings;

            const query = settingsCollection
                .findOne()
                .where("setting_id")
                .eq("current_xp");

            let result = await query.exec();
            if (result == null) {
                result = await settingsCollection.atomicUpsert({
                    setting_id: "current_xp",
                    state: 0,
                });
            }
            result.$.subscribe((changeEvent) => {
                setXPAmount(changeEvent.state);
            });
            /*await result.update({
                $inc: {
                    state: 55,
                },
            });*/
        })();
    }, []);
    return (
        <View style={themedstyles.xpbar}>
            <ProgressBar style={{ height: 10 }} progress={XPAmount / 100} />
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
                            14
                        </Text>
                    </View>
                    <Text style={{ fontSize: 16, fontFamily: "InterLight" }}>
                        Rookie Guitar Player
                    </Text>
                </TransparentView>
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
                            15
                        </Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>{`${XPAmount} XP`}</Text>
                </TransparentView>
            </TransparentView>
        </View>
    );
}
const styles = StyleSheet.create({
    xpdot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
    },
});
