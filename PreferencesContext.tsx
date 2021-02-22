import React from "react";

const PreferencesContext = React.createContext({
    toggleTheme: () => {
        return;
    },
    setAccentColor: (color: string) => {
        return;
    },
    isThemeDark: false,
    accentColor: "#0077ce",
});

export const PreferencesProvider = PreferencesContext.Provider;
export const PreferencesConsumer = PreferencesContext.Consumer;

export default PreferencesContext;
