import {Stack} from 'expo-router';
import {StyleSheet} from "react-native";


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerStyle: styles.header,
                    headerTintColor: '#fff',
                    headerTitleStyle: styles.headerTitle,
                }}
            />
            <Stack.Screen
                name="editCase"
                options={{
                    title: 'Edit Case',
                    headerStyle: { backgroundColor: '#4630EB' },
                    headerTintColor: '#fff',
                    headerTitleStyle: styles.headerTitle,
                    presentation: 'modal',
                    headerBackTitle: 'Back',
                    gestureEnabled: true,
                }}
            />
        </Stack>
    );
}

export const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4630EB',
        fontSize: 32,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    headerTitle: {
        fontSize: 18, // headerStyle fontSize doesn't work, use headerTitleStyle
        fontWeight: 'bold',
        textAlign: 'right', // For RTL support
    },
})
