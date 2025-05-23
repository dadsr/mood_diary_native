import {StyleSheet, TextStyle} from 'react-native';


export const colors = {
    primary: '#4630EB',
    secondary: '#000020',
    accent: '#F3534A',
    background: '#f0f0f0',
    text: '#101010',
    textLight: '#606060',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#4CD964',
};

export const typography = {
    fontSizes: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24,
        xxlarge: 30,
    },
    fontWeights: {
        regular: 'normal',
        medium: '500',
        bold: 'bold',
    },
};

export const spacing = {
    xs: 2,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const globalStyles = StyleSheet.create({
    // RTL specific styles
    rtlContainer: {
        flexDirection: 'row-reverse',
    },
    rtlText: {
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    // Common styles
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.m,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    view: {
        backgroundColor :colors.background,
        borderColor: '#000020',
        width: '100%',
        marginBottom: 16,
    },
    scrollView: {
        backgroundColor : colors.background,
        borderColor: '#000020',
        width: '100%',
        marginBottom: 16,
    },
    heading: {
        textAlign: 'right',
        writingDirection: 'rtl',
        fontSize: typography.fontSizes.xlarge,
        fontWeight: 'bold' as TextStyle['fontWeight'],
        color: colors.primary,
        marginBottom: spacing.m,
    },
    text: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: colors.text,
        fontSize: typography.fontSizes.medium,
    },
    error: {
        color: 'red',
        marginBottom: 8
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
        height: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        margin: spacing.xs,
        padding: spacing.s,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: colors.white,
        fontWeight: 'medium' as TextStyle['fontWeight'],
    },

    dropDown:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
    },
    sliderContainer:{},
    emotionLabel:{},
    slider:{},
    intensityValue:{},

    closeButton:{},
    modalContent:{},
    card: {
        borderWidth: spacing.xs,
        borderColor: colors.textLight,
        textAlign: 'right',
        writingDirection: 'rtl',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.m,
        marginVertical: spacing.s,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },

});
