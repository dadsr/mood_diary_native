import {JSX, useState} from "react";
import {Text, View, StyleSheet, Button, TouchableOpacity, Modal} from "react-native";
import {Case} from "@/models/Case";
import {router} from "expo-router";
import services from "@/services/Services";
import {globalStyles} from "@/styles/globalStyles";
import {EmotionsSelector} from "@/components/emotionsSelector";


interface caseProps {
    case: Case;
}

export default function CaseCard(props: caseProps): JSX.Element {
    const {case: item } = props
    const [isModalVisible, setIsModalVisible] = useState(false);//open/close modal

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const editCase = () => {
        router.push({ pathname: '/editCase', params: { id: item.id } });
    };


    const deleteCase = () => {
        services.deleteCase(item.id);
        router.back();
    };

    return (
        <View  style={globalStyles.card}>
            <Text style={globalStyles.text} >אירוע: {item.caseName}</Text>
            <Text style={globalStyles.text} >תאריך: {item.caseDate.toLocaleDateString('he-IL')}</Text>
            <Text style={globalStyles.text} >מחשבה: {item.thought}</Text>
            <Text style={globalStyles.text} >רגשות: </Text>
            <View>
                <TouchableOpacity style={globalStyles.container} onPress={openModal}>
                    <Text style={globalStyles.text} >רגשות</Text>
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={closeModal}
                    transparent={true}
                >
                    <View style={globalStyles.container}>
                        <View style={globalStyles.heading}>
                            <Text style={globalStyles.text}>רגשות</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={globalStyles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.modalContent}>
                            {/*<EmotionsSelector control={control} name="emotions" />*/}
                        </View>

                        <TouchableOpacity style={globalStyles.button} onPress={closeModal}>
                            <Text style={globalStyles.buttonText}>שמור</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

            <Text style={globalStyles.text} >התנהגות: {item.behavior}</Text>
            <Text style={globalStyles.text} >סימפטומים: {item.symptoms}</Text>

            <View style={globalStyles.buttonContainer}>

                <TouchableOpacity style={globalStyles.button} onPress={editCase}>
                    <Text style={globalStyles.buttonText} >עריכה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={deleteCase}>
                    <Text style={globalStyles.buttonText} >הסר</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    case_info: {},
    case_preview_name_container: {},
    case_preview_id: {},
    button_card: {},
});
