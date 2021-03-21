import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Timer = (): JSX.Element => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function format(time: number) {
        // Hours, minutes and seconds, ~~ Bitwise or (sneller dan Math.floor)
        const hrs = ~~(time / 3600);
        const mins = ~~((time % 3600) / 60);
        const secs = ~~time % 60;

        let output = "";
        if (hrs > 0) {
            output += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        output += "" + mins + ":" + (secs < 10 ? "0" : "");
        output += "" + secs;
        return output;
    }

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    let interval: ReturnType<typeof setTimeout>;
    useEffect(() => {
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <View>
            <Text style={{ fontSize: 74 }}>{format(seconds)}</Text>
            <View style={{ flexDirection: "row" }}>
                <IconButton
                    onPress={toggle}
                    icon={isActive ? "pause" : "play"}
                ></IconButton>
                <IconButton onPress={reset} icon="refresh"></IconButton>
            </View>
        </View>
    );
};

export default Timer;
