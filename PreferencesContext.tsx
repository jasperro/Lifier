import React from 'react'

const PreferencesContext = React.createContext({
    setTheme: () => {},
    isThemeDark: false,
})

export const PreferencesProvider = PreferencesContext.Provider
export const PreferencesConsumer = PreferencesContext.Consumer

export default PreferencesContext
