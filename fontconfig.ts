import { configureFonts } from 'react-native-paper'

const fontConfig = {
    web: {
        regular: {
            fontFamily: 'InterRegular',
            fontWeight: 'normal' as const,
        },
        medium: {
            fontFamily: 'InterMedium',
            fontWeight: 'normal' as const,
        },
        light: {
            fontFamily: 'InterLight',
            fontWeight: 'normal' as const,
        },
        thin: {
            fontFamily: 'InterThin',
            fontWeight: 'normal' as const,
        },
    },

    default: {
        regular: {
            fontFamily: 'InterRegular',
            fontWeight: 'normal' as const,
        },
        medium: {
            fontFamily: 'InterMedium',
            fontWeight: 'normal' as const,
        },
        light: {
            fontFamily: 'InterLight',
            fontWeight: 'normal' as const,
        },
        thin: {
            fontFamily: 'InterThin',
            fontWeight: 'normal' as const,
        },
    },
}

const fontList = configureFonts(fontConfig)

export const fonts = fontList
