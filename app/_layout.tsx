import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'blue',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tab 1',
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="secondTab"
                options={{
                    title: 'Tab 2',
                    tabBarIcon: ({ color }) => <FontAwesome name="search" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="thirdTab"
                options={{
                    title: 'Tab 3',
                    tabBarIcon: ({ color }) => <FontAwesome name="cog" size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
