import {View, Text} from "react-native";


interface emotionProps {
    name: string;
    intensity: number;
}


export default function EmotionCard(props: emotionProps){

    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.intensity}</Text>
        </View>
    )
}
