import { View, Text, StyleSheet } from 'react-native';

export default function thirdDiary() {
    return (
        <View style={styles.container}>
            <Text>This is Tab 3</Text>
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
