import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Text } from 'react-native';

export default function Layout() {
    return (
        <Tabs>
            <TabSlot />
            <TabList>
                <TabTrigger name="diary1" href="/1" group="diary">
                    <Text>יומן 1</Text>
                </TabTrigger>
                <TabTrigger name="diary2" href="/2" group="diary">
                    <Text>יומן 2</Text>
                </TabTrigger>
                <TabTrigger name="diary3" href="/3" group="diary">
                    <Text>יומן 3</Text>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}
