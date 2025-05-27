import {JSX, useEffect, useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import {
    Animated,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    ScrollView as DefaultScrollView,
    Modal
} from 'react-native';
import {Controller, useForm} from "react-hook-form";
import {CaseFormValues} from "@/models/Types";
import services from "@/services/Services";
import {Emotion} from "@/models/Emotion";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Case} from "@/models/Case";
import {colors, globalStyles} from "@/styles/globalStyles";
import ScrollView = Animated.ScrollView;
import {EmotionsSelector} from "@/components/emotionsSelector";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export default function EditCase(): JSX.Element {
    console.log("Edit Case");
    const insets = useSafeAreaInsets();
    const id: number = Number(useLocalSearchParams().id);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [showPicker, setShowPicker] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);//open/close modal

    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm<CaseFormValues>({
        defaultValues: {
            id: 0,
            caseName: '',
            caseDate: new Date(),
            thought: '',
            emotions: [] as Emotion[],
            behavior: '',
            symptoms: ''
        }
    });

    useEffect(() => {
        if (id > 0) {
            (async () => {
                const myCase: Case | null = await services.getCase(id);
                if (myCase) {
                    setValue('id', myCase.id);
                    setValue('caseName', myCase.caseName!);
                    setValue('caseDate', myCase.caseDate!);
                    setValue('thought', myCase.thought!);
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('emotions', myCase.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity)));
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                }
            })();
        }
    }, [id,setValue]);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const submitForm = async (data: CaseFormValues) => {
        setIsSubmiting(true);
        const caseInstance = new Case();
        caseInstance.id = data.id;
        caseInstance.caseName = data.caseName;
        caseInstance.caseDate = data.caseDate;
        caseInstance.thought = data.thought;
        caseInstance.emotions = data.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity));
        caseInstance.behavior = data.behavior;
        caseInstance.symptoms = data.symptoms;

        if (caseInstance.id > 0) {
            await services.updateCase(caseInstance);
        } else {
            await services.addCase(caseInstance);
        }
        setIsSubmiting(false);
        router.back();
    };


    return (
        <SafeAreaView  style = {[globalStyles.container, {paddingBottom: Math.max(insets.bottom,20)}]}>
            <DefaultScrollView  style = {globalStyles.scrollView}>
                    <Text style={globalStyles.text} >אירוע:</Text>
                    <Controller
                        name="caseName"
                        control={control}
                        rules={{required: "שם האירוע הוא שדה חובה"}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={[globalStyles.input,globalStyles.rtlText]}
                                placeholder="שם האירוע"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.caseName && (
                        <Text style={globalStyles.error}>{errors.caseName.message}</Text>
                    )}

                    <Text style={globalStyles.text} >תאריך:</Text>
                    <Controller
                        name="caseDate"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                {Platform.OS === 'web' ? (
                                    <input
                                        type="date"
                                        style={globalStyles.input}
                                        placeholder="תאריך האירוע"
                                        value={value ? new Date(value).toISOString().substring(0, 10) : ''}
                                        onChange={event => {
                                            // Only update if a date is selected
                                            if (event.target.value) {
                                                onChange(new Date(event.target.value).toISOString());
                                            }
                                        }}
                                        onBlur={onBlur}
                                    />
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => setShowPicker(true)}>
                                            <TextInput
                                                style={globalStyles.input}
                                                placeholder="תאריך האירוע"
                                                onBlur={onBlur}
                                                value={value ? new Date(value).toLocaleDateString('he-IL') : ''}
                                                editable={false}
                                                pointerEvents="none"
                                            />
                                        </TouchableOpacity>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={value ? new Date(value) : new Date()}
                                                mode="date"
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    setShowPicker(false); // Hide picker after selection
                                                    if (selectedDate) {
                                                        onChange(selectedDate.toISOString());
                                                    }
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    />
                    <Text style={globalStyles.text} >מחשבה:</Text>
                    <Controller
                        name="thought"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={globalStyles.textarea}
                                placeholder="מחשבה"
                                multiline={true}
                                numberOfLines={4}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {/* Emotions Selector */}
                    <View style={[globalStyles.buttonContainer,{padding:20,borderWidth:10,borderRadius:10,borderColor:'rgba(76,105,229,0.67)'}]}>
                        <TouchableOpacity style={[globalStyles.button,]} onPress={openModal}>
                            <Text style={globalStyles.buttonText}>בחירת רגשות</Text>
                        </TouchableOpacity>
                        <Modal
                            style={globalStyles.modalContent}
                            visible={isModalVisible}
                            animationType="fade"
                            presentationStyle="pageSheet"
                            onRequestClose={closeModal}
                        >
                            <ScrollView style={globalStyles.scrollView}>

                                    <Text style={globalStyles.text} >בחירת רגשות</Text>

                                <View style={[globalStyles.buttonContainer,{alignItems:'flex-start',margin:5}]}>
                                    <TouchableOpacity onPress={closeModal}>
                                        <Text style={[{backgroundColor: colors.error,padding:4,borderWidth:1}]}>X</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={globalStyles.emotionsSelectorContainer}>
                                    <EmotionsSelector control={control} name="emotions" />
                                </View>
                            </ScrollView>

                            <View style={globalStyles.buttonContainer}>
                                <TouchableOpacity style={globalStyles.button} onPress={closeModal}>
                                    <Text style={globalStyles.buttonText}>שמור</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>

                    <Text style={globalStyles.text} >התנהגות:</Text>
                    <Controller
                        name="behavior"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={globalStyles.textarea}
                                placeholder="התנהגות"
                                multiline={true}
                                numberOfLines={4}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Text style={globalStyles.text} >סימפטומים:</Text>
                    <Controller
                        name="symptoms"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={globalStyles.textarea}
                                placeholder="סימפטומים"
                                multiline={true}
                                numberOfLines={4}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
            </DefaultScrollView>
            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity style={globalStyles.button} onPress={handleSubmit(submitForm)}>
                    <Text style={globalStyles.buttonText} >שמירה</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(242,117,0,0.68)',
    },

});

