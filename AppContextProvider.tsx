import React, { Component } from "react";
import {
    DefaultTheme, DarkTheme, Provider as PaperProvider, configureFonts,
} from "react-native-paper";

const Context = React.createContext(undefined);

/* const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0077ce",
    accent: "#0077ce",
  },
}; */

const fontConfig = {
    web: {
        regular: {
            fontFamily: "InterRegular",
            fontWeight: "normal" as const,
        },
        medium: {
            fontFamily: "InterMedium",
            fontWeight: "normal" as const,
        },
        light: {
            fontFamily: "InterLight",
            fontWeight: "normal" as const,
        },
        thin: {
            fontFamily: "InterThin",
            fontWeight: "normal" as const,
        },
    },

    default: {
        regular: {
            fontFamily: "InterRegular",
            fontWeight: "normal" as const,
        },
        medium: {
            fontFamily: "InterMedium",
            fontWeight: "normal" as const,
        },
        light: {
            fontFamily: "InterLight",
            fontWeight: "normal" as const,
        },
        thin: {
            fontFamily: "InterThin",
            fontWeight: "normal" as const,
        },
    },
};

const fontList = configureFonts(fontConfig);

export class AppContextProvider extends Component {
    state = {
        theme: {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                primary: "#0077ce",
                accent: "#0077ce",
            },
            fonts: fontList,
        },
        updateTheme: (theme) => {
            this.setState({
                theme: {
                    ...this.state.theme,
                    colors: {
                        ...this.state.theme.colors,
                        primary: theme,
                        accent: theme,
                    },
                },
            });
        },
    }

    render() {
        const { theme } = this.state;
        return (
            <Context.Provider value={this.state}>
                <PaperProvider theme={theme}>
                    {this.props.children}
                </PaperProvider>
            </Context.Provider>
        );
    }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
export const fonts = fontList;
