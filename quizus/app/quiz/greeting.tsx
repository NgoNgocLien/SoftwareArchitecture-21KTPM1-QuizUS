import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Image, Text, Alert } from 'react-native';

import { Button } from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import config from '@/constants/config';

export default function Profile() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {id_campaign} = params
    const [quizInfo, setQuizInfo] = useState<Quiz|null>(null);
    
    const fetchQuiz = async () => {
        try{
            const response = await fetch(`${config.CAMPAIGN_BE}/api/game/campaign/${id_campaign}`)
            const data = await response.json()
            setQuizInfo(data.id_quiz)

            if (!response.ok) {
                const result = await response.json();
                Alert.alert('Error', result.message);
            } 

        } catch(error){
            console.error(error);
            Alert.alert('Error', 'Lỗi từ frontend');
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        console.log(quizInfo);
    }, [quizInfo])

    return (
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
        locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
        style={styles.background}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Image
                    style={{width: '100%', height: '80%'}}
                    source={require('@/assets/images/MC.gif')}
                />
            </View>
            <Button text="Tiếp tục" type="primary" 
                onPress={() => {router.replace({
                    pathname: "/quiz/detail",
                    params: {
                        quizInfo: JSON.stringify(quizInfo),
                        id_campaign: id_campaign
                    }
                })}}>
            </Button>
            <Button text="Quay lại" type="tertiary" 
                onPress={() => {router.back()}}>
            </Button>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    videoContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
    }
});