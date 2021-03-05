import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Color from "color";
import { FlatGrid } from "react-native-super-grid";
import { Colors } from "react-native-paper";
import PreferencesContext from "root/PreferencesContext";

interface ColorPickerPropsType {
    onSelectColor: (color: string) => unknown;
}

function ColorPicker({ onSelectColor }: ColorPickerPropsType): JSX.Element {
    const [selectedColor, setSelectedColor] = useState("");

    const renderItem = ({ item }: { item: string }) => {
        const newSelectedColor: string = Colors[item];
        const fontColor = Color(newSelectedColor).isDark()
            ? "#ffffff"
            : "#000000";
        return (
            <TouchableOpacity
                style={[styles.circle, { backgroundColor: newSelectedColor }]}
                onPress={() => {
                    setSelectedColor(newSelectedColor);
                    if (onSelectColor) {
                        onSelectColor(newSelectedColor);
                    }
                }}
            >
                {selectedColor === newSelectedColor && (
                    <Icon
                        name="check"
                        style={{ color: fontColor, fontSize: 24 }}
                    />
                )}
            </TouchableOpacity>
        );
    };

    const returned = React.useMemo(() => {
        return (
            <FlatGrid
                itemDimension={40}
                data={Object.keys(Colors)}
                renderItem={renderItem}
            />
        );
    }, [selectedColor]);

    return returned;
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
