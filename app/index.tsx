import {JSX, useCallback, useState} from "react";
import {Case} from "@/models/Case";
import services from "@/services/Services";
import {router, useFocusEffect} from "expo-router";
import {Animated, SafeAreaView, Text, TouchableOpacity, View, ScrollView as DefaultScrollView } from "react-native";
import CaseCard from "@/components/caseCard";
import {globalStyles} from "@/styles/globalStyles";

import {useSafeAreaInsets} from "react-native-safe-area-context";


export default function HomeScreen(): JSX.Element {
    console.log("HomeScreen");

    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    useFocusEffect (
        useCallback(() => {
            console.log("HomeScreen focused, fetching cases...");
            services.getCases().then((fetchedCases: Case[]) => {
                    setCases(fetchedCases)
            })
        },[])
    );



    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { id: 0 } });
    };


    return (
        <SafeAreaView  style = {[globalStyles.container, {paddingBottom: Math.max(insets.bottom,20)}]}>
            <Text style = {globalStyles.heading}>רשימת אירועים:</Text>
            <DefaultScrollView  style = {globalStyles.scrollView}>
                {cases.length > 0 ?(
                    cases.map(c => <CaseCard key={c.id} case={c} />)
                ): (
                    <View style = {globalStyles.card}>
                        <Text style={globalStyles.text}>לא נמצאו אירועים.</Text>
                        <Text style={globalStyles.text}>לחץ על הוספת אירוע כדי להתחיל.</Text>
                    </View>
            )}
            </DefaultScrollView >
            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity style={globalStyles.button} onPress={addNewCase}>
                    <Text style={globalStyles.buttonText} >הוספת אירוע</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );

}

