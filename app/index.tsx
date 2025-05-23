import {JSX, useEffect, useState} from "react";
import {Case} from "@/models/Case";
import services from "@/services/Services";
import {router} from "expo-router";
import {Text, Animated, Button, View, StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import ScrollView = Animated.ScrollView;
import CaseCard from "@/components/caseCard";
import {globalStyles, colors, spacing } from "@/styles/globalStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";



export default function HomeScreen(): JSX.Element {
    const insets = useSafeAreaInsets();

    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        services.getCases().then((cases) => setCases(cases));
    },[]);


    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { id: 0 } });
    };


    return (
        <SafeAreaView  style = {[globalStyles.container,{paddingBottom: insets.bottom}]}>
            <Text style = {globalStyles.heading}>רשימת אירועים:</Text>
            <ScrollView style = {globalStyles.scrollView}>
                { cases.map(c => <CaseCard key={c.id} case={c} />) }
            </ScrollView>
            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity style={globalStyles.button} onPress={addNewCase}>
                    <Text style={globalStyles.buttonText} >הוספת אירוע</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

    );


}



// const styles = StyleSheet.create({
//
//     scrollView: {
//         backgroundColor :'#4CD964',
//         borderColor: '#000020',
//         width: '100%',
//         marginBottom: 16,
//     },
// });
