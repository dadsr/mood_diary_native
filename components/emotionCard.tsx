import {View, Text} from "react-native";
import {globalStyles} from "@/styles/globalStyles";


interface emotionProps {
    name: string;
    intensity: number;
}


export default function EmotionCard(props: emotionProps){

    return (
        <View style={globalStyles.container}>
            <Text>{props.name}</Text>
            <Text>{props.intensity}</Text>
        </View>
    )
}
