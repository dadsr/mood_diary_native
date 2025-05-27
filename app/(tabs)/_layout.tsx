import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="secondTab"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome name="file-text-o" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="thirdTab"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome name="edit" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
