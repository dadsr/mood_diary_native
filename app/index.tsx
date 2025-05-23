import {JSX, useEffect, useState} from "react";
import {Case} from "@/models/Case";
import services from "@/services/Services";
import {router} from "expo-router";
import {Animated, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import CaseCard from "@/components/caseCard";
import {globalStyles} from "@/styles/globalStyles";
import ScrollView = Animated.ScrollView;
import {useSafeAreaInsets} from "react-native-safe-area-context";


export default function HomeScreen(): JSX.Element {

    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        services.getCases().then((cases) => setCases(cases));
    },[cases]);


    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { id: 0 } });
    };


    return (
        <SafeAreaView  style = {[globalStyles.container, {paddingBottom: Math.max(insets.bottom,20)}]}>
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

