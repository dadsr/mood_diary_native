import { View, Text, StyleSheet } from 'react-native';

export default function secondDiary() {
    return (
        <View style={styles.container}>
            <Text>This is Tab 2</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
