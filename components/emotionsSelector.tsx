import React, {JSX} from "react";
import {CaseFormValues, EmotionOption} from "@/models/Types";
import {Control, Controller} from "react-hook-form";
import {EmotionKey, EmotionsConst} from "@/models/EmotionsConst";
import {Platform, Text, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles";
import {Emotion} from "@/models/Emotion";
// For web
import Select from 'react-select';
// For mobile
import {MultiSelect} from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';


interface EmotionsSelectorProps {
    control: Control<CaseFormValues>;
    name: "emotions";
}

export function EmotionsSelector({control, name}: EmotionsSelectorProps): JSX.Element {
    // Create options for the Select component
    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        intensity: 50
    }));

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>רגשות:</Text>
            <Controller
                name={name}
                control={control}
                render={({field}) => {
                    const selectValue: EmotionOption[] = Array.isArray(field.value) ?
                        field.value
                            .filter((emotion: Emotion) => emotion.getEmotion !== null && emotion.getEmotion !== undefined)
                            .map((emotion: Emotion) => (
                                {
                                    value: emotion.getEmotion as EmotionKey,
                                    label: EmotionsConst[emotion.getEmotion as EmotionKey].displayName,
                                    intensity: emotion.getIntensity
                                }
                            )) : [];
                    return (
                        <View style={globalStyles.container} >
                            {Platform.OS === 'web' ? (
                                <Select
                                    isMulti
                                    options={emotionOptions}
                                    value={selectValue}
                                    onChange={(selectedOptions: any) => {
                                        const emotions = selectedOptions.map((option: EmotionOption) =>
                                            new Emotion(option.value, option.intensity)
                                        );
                                        field.onChange(emotions);
                                    }}
                                    placeholder="בחר רגש..."
                                    classNamePrefix="emotions-select"
                                />
                            ) : (
                                // Mobile
                                <MultiSelect
                                    style={globalStyles.dropDown}
                                    data={emotionOptions}
                                    labelField="label"
                                    valueField="value"
                                    value={selectValue.map(option => option.value)}
                                    onChange={(selectedItems) => {
                                        const emotions = selectedItems.map((item: any) => {
                                            const existingEmotion = selectValue.find(option => option.value === item);
                                            return new Emotion(
                                                item,
                                                existingEmotion ? existingEmotion.intensity : 50
                                            );
                                        });
                                        field.onChange(emotions);
                                    }}
                                    placeholder="בחר רגש..."
                                    search
                                    searchPlaceholder="חיפוש..."
                                />
                            )}
                            {/* Intensity sliders for selected emotions */}
                            {selectValue.map((option: EmotionOption) => (
                                <View key={option.value} style={globalStyles.sliderContainer}>
                                    <Text style={globalStyles.emotionLabel}>{option.label}</Text>
                                    <Slider
                                        style={globalStyles.slider}
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={1}
                                        value={option.intensity}
                                        onValueChange={(value) => {
                                            const updated = field.value.map((emotion: Emotion) =>
                                                emotion.getEmotion === option.value
                                                    ? new Emotion(option.value, parseInt(value.toString()))
                                                    : emotion
                                            );
                                            field.onChange(updated);
                                        }}
                                        minimumTrackTintColor="#007AFF"
                                        maximumTrackTintColor="#CCCCCC"
                                    />
                                    <Text style={globalStyles.intensityValue}>{option.intensity}%</Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    )
}
