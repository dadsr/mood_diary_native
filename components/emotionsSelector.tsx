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
    console.log("EmotionsSelector");
    // Create options for the Select component
    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        intensity: 50
    }));

    // Function to render markings for slider
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[globalStyles.sliderMark, { left: `${i}%` }]}>
                    <View style={globalStyles.markLine} />
                </View>
            );
        }
        return markings;
    };


    return (
        <View style={[globalStyles.container]}>
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
                        <View  >
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
                                <View style={globalStyles.emotionsSelectorContainer}>

                                    <MultiSelect
                                        selectedTextStyle={globalStyles.multiSelectPlaceholder}
                                        inputSearchStyle={globalStyles.multiSelectSearch}
                                        iconStyle={globalStyles.multiSelectIcon}
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
                                </View>
                            )}


                            {/* Intensity sliders for selected emotions */}
                            {selectValue.map((option: EmotionOption) => (
                                <View key={option.value} style={globalStyles.sliderContainer}>
                                    <Text style={globalStyles.emotionLabel}>{option.label}</Text>

                                    <View key={option.value} style={globalStyles.sliderWithMarkings} >
                                        <View style={globalStyles.markingsContainer}>
                                            {renderSliderMarkings()}
                                        </View>

                                        <Slider
                                            style={globalStyles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={10}
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
                                    </View>
                                    <Text style={globalStyles.intensityValue}>{option.intensity}%</Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
}
