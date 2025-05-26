import {Text, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles";
import React from "react";
import {Emotion} from "@/models/Emotion";
import Slider from "@react-native-community/slider";


interface EmotionsProps {
    emotions: Emotion[];
}


export default function EmotionCard(props: EmotionsProps) {
    console.log("EmotionCard");
    const {emotions} = props;
    console.log("emotions - ", emotions.length);


    // Function to render markings for slider
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[globalStyles.sliderMark, {left: `${i}%`}]}>
                    <View style={globalStyles.markLine}/>
                </View>
            );
        }
        return markings;
    };


    return (
        <View style={globalStyles.container}>
            {emotions.length === 0 ? (
                <View style={globalStyles.card}>
                    <Text style={globalStyles.text}>לא נשמרו רגשות הגדר רגשות לאירוע במסך עריכה</Text>
                </View>
            ) : (
                emotions.map((emotion:Emotion, index: number) => (
                    <View key={index} style={globalStyles.sliderContainer}>
                        <Text style={globalStyles.emotionLabel}>{emotion.displayName}</Text>

                        <View style={globalStyles.sliderWithMarkings} >
                            <View style={globalStyles.markingsContainer}>
                                {renderSliderMarkings()}
                            </View>

                            <Slider
                                style={globalStyles.slider}
                                minimumValue={0}
                                maximumValue={100}
                                step={10}
                                value={emotion.getIntensity}
                                minimumTrackTintColor="#4630EB"
                                maximumTrackTintColor="#4630EB"
                                thumbTintColor="#4630EB"
                                disabled={true}
                            />
                            <Text style={globalStyles.intensityValue}>{emotion.getIntensity}%</Text>
                        </View>
                    </View>
                ))
            )}
        </View>
    );
}
