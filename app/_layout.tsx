import {Stack} from 'expo-router';
import {StyleSheet} from "react-native";


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerStyle: style.header,
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="editCase"
                options={{
                    title: 'Edit Case',
                    headerStyle: { backgroundColor: '#4630EB' },
                    headerTintColor: '#fff',
                }}
            />
        </Stack>
    );
}

export const style = StyleSheet.create({
    header: {
        backgroundColor: '#4630EB',
        fontSize: 32,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
})
