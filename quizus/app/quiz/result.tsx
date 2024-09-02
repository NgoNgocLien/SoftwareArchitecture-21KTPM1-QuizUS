import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Image, Text, TouchableOpacity } from 'react-native';

import { Button } from '@/components/Button';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';

export default function Result() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const score = params.score as string;
    const point = params.point as string;
    const passedTime = parseInt(params.passedTime as string);
    const id_quiz = params.id_quiz as string;

    const minutes = Math.floor(passedTime / 60).toString().padStart(2, '0');
    const seconds = (passedTime % 60).toString().padStart(2, '0');
    const [playerTurn, setPlayerTurn] = useState(1);
    // get player turn

    return (
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
        locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
        style={styles.background}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.background}>
    <View style={styles.container}>
        <View style={styles.playerTurnContainer}>
            {
                Array(playerTurn).fill(null).map((_,index) => (
                    <TabBarIcon key={index} name={'cards-heart'} color={Colors.light.primary} />
                ))
            }
            {
                Array(3-playerTurn).fill(null).map((_,index) => (
                    <TabBarIcon key={index} name={'cards-heart'} color={Colors.gray._300} />
                ))
            }
        </View>  

        <Image
            style={{width: 200, height: 200}}
            source={require('@/assets/images/success.png')}
        />

        <Heading type={"h1"}>Hoàn thành</Heading>

        <View style={styles.achievementContainer}>
            <TouchableOpacity style={styles.achievement}  activeOpacity={0.6}>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    Số câu đúng
                </Paragraph>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    {score}/10
                </Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievement}  activeOpacity={0.6}>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    Xu thưởng
                </Paragraph>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    +100
                </Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievement}  activeOpacity={0.6}>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    Thời gian
                </Paragraph>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                {`${minutes}:${seconds}`}
                </Paragraph>
            </TouchableOpacity>
            
        </View>

        <View style={styles.buttonContainer}>
            <Button text="Trang chủ" type="primary" style={{marginBottom: 10}}
                onPress={() => {router.replace("/")}}>
            </Button>
            {
                playerTurn ? (
                    <Button text="Chơi lại" type="tertiary" style={{marginBottom: 10}} 
                        onPress={() => {router.replace("/quiz/1")}}>
                    </Button>
                ) : (
                    <Button text="Chia sẻ" type="tertiary" style={{marginBottom: 10}}
                        onPress={() => {router.replace(`/quiz/${id_quiz}`)}}>
                    </Button>
                )
            }
        </View>
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
        padding: 20,
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerTurnContainer:{
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
    achievement:{
        height: 50,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.secondary,
        borderWidth: 3,
    },
    achievementContainer:{
    },
    buttonContainer:{
        width: '100%',
        marginTop: 'auto'
    }
    
});