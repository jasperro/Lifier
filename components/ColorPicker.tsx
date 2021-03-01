import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Color from "color";
import { FlatGrid } from "react-native-super-grid";
import { Colors } from "react-native-paper";
import PreferencesContext from "root/PreferencesContext";

function ColorPicker(): JSX.Element {
    const [selectedColor, setSelectedColor] = useState("");
    const { setAccentColor } = React.useContext(PreferencesContext);

    const renderItem = ({ item }) => {
        const fontColor = Color(Colors[item]).isDark() ? "#ffffff" : "#000000";
        return (
            <TouchableOpacity
                style={[styles.circle, { backgroundColor: Colors[item] }]}
                onPress={() => {
                    setSelectedColor(Colors[item]);
                    setAccentColor(Colors[item]);
                }}
            >
                {selectedColor === Colors[item] && (
                    <Icon
                        name="check"
                        style={{ color: fontColor, fontSize: 24 }}
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <FlatGrid
            itemDimension={40}
            data={Object.keys(Colors)}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ColorPicker;
