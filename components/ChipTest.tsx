import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Chip, List, useTheme } from "react-native-paper";
import PreferencesContext from "root/PreferencesContext";

const ChipExample = () => {
    const { isThemeDark } = React.useContext(PreferencesContext);
    const { colors } = useTheme();

    const dataSource = ["Guitar", "Test", "Hamburger"];

    return (
        <>
            <View style={[styles.container]}>
                <List.Section title="Category">
                    <View style={styles.row}>
                        {dataSource.map((value, key) => {
                            const [
                                pressed,
                                setPressed,
                            ] = React.useState<boolean>(true);
                            return (
                                <Chip
                                    key={key}
                                    mode="outlined"
                                    textStyle={{
                                        color:
                                            !isThemeDark && !pressed
                                                ? "black"
                                                : "white",
                                        fontSize: 15,
                                    }}
                                    style={{
                                        backgroundColor: pressed
                                            ? colors.primary
                                            : colors.surface,
                                        margin: 5,
                                        flexWrap: "wrap",
                                    }}
                                    onPress={() => {
                                        setPressed(!pressed);
                                        console.log(pressed);
                                    }}
                                >
                                    {value}
                                </Chip>
                            );
                        })}
                    </View>
                </List.Section>
            </View>
        </>
    );
};

ChipExample.title = "Chip";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
    },
    chip: {
        margin: 4,
    },
});

export default ChipExample;
