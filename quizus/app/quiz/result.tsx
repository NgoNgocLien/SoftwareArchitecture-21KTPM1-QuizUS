import React, {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Image, Text, TouchableOpacity, Modal } from 'react-native';

import { Button } from '@/components/Button';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import config from '@/constants/config';
import { FontAwesome6 } from '@expo/vector-icons';

import dialogStyles from '@/components/modal/Dialog.styles'

export default function Result() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const point = params.point as string;
    const score = parseInt(params.score as string);
    const elapsedTime = parseInt(params.elapsedTime as string);
    const playerTurn = parseInt(params.playerTurn as string);

    const id_campaign = params.id_campaign as string;

    const minutes = Math.floor(elapsedTime / config.DURATION).toString().padStart(2, '0');
    const seconds = Math.ceil((elapsedTime % config.DURATION) / 1000).toString().padStart(2, '0');
    console.log(elapsedTime);

    const handlePlayAgain = () => {
        router.replace({
            pathname: '/campaign',
            params: { id_campaign: id_campaign }
        })
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const handleShare = () => {

    }

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
                    {point}/10
                </Paragraph>
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievement}  activeOpacity={0.6}>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    Xu thưởng
                </Paragraph>
                <Paragraph color={Colors.brand._800} type={'p2'}> 
                    {(score > 0) ? `+${score}` : 0}
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
                        onPress={handlePlayAgain}>
                    </Button>
                ) : (
                    <Button text="Thêm lượt chơi" type="tertiary" style={{marginBottom: 10}}
                        onPress={() => {setModalVisible(true);}}>
                    </Button>
                )
            }
        </View>

        <Modal
            transparent={true} 
            animationType="fade" 
            visible={isModalVisible}
            onRequestClose={() => {setModalVisible(false);}}
        >
            <View style={dialogStyles.centeredView}>
                <View style={dialogStyles.modalView}>
                    <View style={dialogStyles.topView}>
                        <Heading type={'h5'}>Thêm lượt chơi</Heading>

                        <FontAwesome6 name='xmark' style={{fontSize: 20, padding: 5, color: Colors.gray._600}} 
                            onPress={() => setModalVisible(false)} suppressHighlighting={true}/>
                    </View>
                    <View style={dialogStyles.buttonView}>
                        <Button style={dialogStyles.button} text={'Chia sẻ sự kiện'} type='primary'></Button>
                        <Button style={dialogStyles.button} text={'Xin lượt chơi từ bạn bè'} type='secondary'></Button>
                    </View>
                    
                </View>
            </View>
        </Modal>

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