import React, { useState } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Switch as DefaultSwitch,
} from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type TextInputProps = ThemeProps & DefaultView["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type SwitchProps = ThemeProps & DefaultSwitch["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultTextInput
      style={[{ color, height: 40, borderWidth: 2 }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Switch(props: SwitchProps) {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isEnabled, setIsEnabled] = useState(false);
  const { style, lightColor, darkColor, ...otherProps } = props;
  const trackColor = {
    false: "#777777",
    true: useThemeColor(
      { light: lightColor, dark: darkColor },
      "switch_track_color"
    ),
  };
  const thumbColor = isEnabled
    ? useThemeColor({ light: lightColor, dark: darkColor }, "tint")
    : useThemeColor({ light: lightColor, dark: darkColor }, "tint");
  return (
    <DefaultSwitch
      trackColor={trackColor}
      thumbColor={thumbColor}
      activeThumbColor={thumbColor}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={[style]}
      {...otherProps}
    />
  );
}
