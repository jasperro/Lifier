import React from 'react'

const PreferencesContext = React.createContext({
    toggleTheme: () => {},
    isThemeDark: false,
    accentColor: '#ff0000',
})

export const PreferencesProvider = PreferencesContext.Provider
export const PreferencesConsumer = PreferencesContext.Consumer

export default PreferencesContext
