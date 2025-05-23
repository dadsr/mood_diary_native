import {Platform} from "react-native";
import {Case} from "@/models/Case";
import {SerializedCase, SerializedEmotion} from "@/models/Types";
import {Emotion} from "@/models/Emotion";
import AsyncStorage from "@react-native-async-storage/async-storage";


const  isWeb = (Platform.OS === 'web');

export class Services {

    async getCases(): Promise<Case[]> {

        let storedCases:string|null = null;
        if (isWeb) {
            storedCases = localStorage.getItem('cases');
        } else {
            storedCases = await AsyncStorage.getItem('cases');
        }
        if(storedCases) {
            const parsed = JSON.parse(storedCases) as SerializedCase[];

            return parsed.map(caseItem => {
                const caseInstance = new Case();
                caseInstance.id = caseItem.id;
                caseInstance.caseName = caseItem.caseName;
                caseInstance.caseDate = new Date(caseItem.caseDate);
                caseInstance.thought = caseItem.thought;

                caseInstance.emotions = caseItem.emotions?.map((e: SerializedEmotion) =>
                    new Emotion(e._emotion, e._intensity)) || [];

                caseInstance.behavior = caseItem.behavior;
                caseInstance.symptoms = caseItem.symptoms;
                return caseInstance;
            });
        }
        return [];
    }

    async getCase(id: number): Promise<Case|null>{
        const cases:Case[] = await this.getCases();
        const index: number = cases.findIndex(c => c.id === id);
        if (index !== -1) {
            return cases[index];
        }
        return null;
    }

    async updateCase(updatedCase:Case): Promise<void>{
        const cases:Case[] =await this.getCases();
        const index = cases.findIndex(c => c.id === updatedCase.id);
        if(index !== -1) {
            const serializedCase: SerializedCase = {
                ...updatedCase,
                emotions: updatedCase.emotions.map(e => ({
                    _emotion: e.getEmotion,
                    _intensity: e.getIntensity
                })),
                caseDate: updatedCase.caseDate.toISOString()
            };
            const updatedCases = [...cases];
            updatedCases[index] = this.parseSerializedCase(serializedCase);
            if (isWeb) {
                localStorage.setItem('cases', JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
            } else {
                await AsyncStorage.setItem('cases', JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
            }
        }
    }

    async addCase(newCase:Case): Promise<void> {
        const cases:Case[] =await this.getCases();
        if(cases.length > 0){
            newCase.id =  Math.max(...cases.map(c => c.id || 0)) + 1 ;
        } else{
            newCase.id = 1;
        }
        const serializedCase = {
            ...newCase,
            emotions: newCase.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            })),
            caseDate: newCase.caseDate.toISOString()
        };
        if(isWeb){
            localStorage.setItem('cases', JSON.stringify([...cases, serializedCase]));
        } else{
            await AsyncStorage.setItem('cases', JSON.stringify([...cases, serializedCase]));
        }
    }

    async deleteCase(caseId:number):Promise<void> {
        const cases:Case[] = await this.getCases();
        const newCases = cases.filter(caseItem => caseItem.id !== caseId);
        if(isWeb){
            localStorage.setItem('cases', JSON.stringify(newCases));
        } else{
            await AsyncStorage.setItem('cases', JSON.stringify(newCases));
        }
    }

    private parseSerializedCase(serialized: SerializedCase): Case {
    const caseInstance = new Case();
    caseInstance.id = serialized.id;
    caseInstance.caseDate = new Date(serialized.caseDate);
    caseInstance.caseName = serialized.caseName;
    caseInstance.thought = serialized.thought;
    caseInstance.emotions = serialized.emotions.map(e =>
        new Emotion(e._emotion, e._intensity)
    );
    caseInstance.behavior = serialized.behavior;
    caseInstance.symptoms = serialized.symptoms;
    return caseInstance;
    }

    private serializeCase(caseInstance: Case): SerializedCase {
        return {
            ...caseInstance,
            caseDate: caseInstance.caseDate.toISOString(),
            emotions: caseInstance.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            }))
        };
    }

}
const services =new Services();
export default services;