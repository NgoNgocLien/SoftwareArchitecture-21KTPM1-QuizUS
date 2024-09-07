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
import PLayerTurnModal from '@/components/modal/PlayerTurnModal';

export default function ItemGameResult() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const playerTurn = parseInt(params.playerTurn as string);

    const id_campaign = params.id_campaign as string;
    const quantity_item1 = parseInt(params.quantity_item1 as string);
    const quantity_item2 = parseInt(params.quantity_item2 as string);
    const isItem1 = (params.isItem1 as string) == 'true';

    const itemInfoString = Array.isArray(params.itemInfo) ? params.itemInfo[0] : params.itemInfo;
    const itemInfo = JSON.parse(itemInfoString);

    const handlePlayAgain = () => {
        router.replace({
            pathname: '/campaign',
            params: { id_campaign: id_campaign }
        })
    }

    const [isModalVisible, setModalVisible] = useState(false);

    return (
    <SafeAreaView style={styles.background}>
    {/* Background game image (behind the giftGame) */}
    <View style={styles.overlayBackground}>
    </View>
    <View style={styles.backgroundGame}>
        <Image
            style={{ width: '100%', height: '120%' }}
            source={require('@/assets/images/background-item-game.png')}
            resizeMode="cover" // Ensures the background image covers the entire area
        />
    </View>
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
            source={isItem1 ? {uri: itemInfo.item1_photo} : {uri: itemInfo.item2_photo} }
        />

        <View style={styles.headingContainer}>
            <Paragraph type={'p2'} color={Colors.feedback.warning}>Chúc mừng bạn đã nhận được</Paragraph>
            <Heading type={"h1"} color={Colors.feedback.warning}>Mảnh ghép {isItem1 ? 1 : 2}/2</Heading>
        </View>
        <Paragraph type={'p2'} color={Colors.light.background} style={{textAlign: 'center'}}>Đây là 1 trong 2 mảnh ghép để đổi voucher Grab. Thu thập đủ 2 mảnh ghép để đổi voucher ngay nhé!</Paragraph>

        <Button text="Đổi voucher" type="primary" 
            style={{
                marginBottom: -10,
                backgroundColor: (quantity_item1 >= 1 && quantity_item2 >= 1) ? Colors.feedback.warning : Colors.gray._500
            }} 
            onPress={() => {router.replace("/")}}>
        </Button>
        <Paragraph type={'p3'} color={Colors.light.background} style={{alignSelf: 'flex-start'}}>Đang có: {quantity_item1 + quantity_item2} mảnh Grab</Paragraph>

        <View style={styles.buttonContainer}>
            <Button text="Trang chủ" type="primary" style={{marginBottom: 10, width: '48%'}}
                onPress={() => {router.replace("/")}}>
            </Button>
            {
                playerTurn ? (
                    <Button text="Chơi lại" type="tertiary" style={{marginBottom: 10, width: '48%'}} 
                        onPress={handlePlayAgain}>
                    </Button>
                ) : (
                    <Button text="Thêm lượt chơi" type="tertiary" style={{marginBottom: 10 , width: '48%'}}
                        onPress={() => {setModalVisible(true);}}>
                    </Button>
                )
            }
        </View>

        <PLayerTurnModal 
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            id_campaign={id_campaign}
            afterShare={handlePlayAgain}>
        </PLayerTurnModal>

    </View>
    </SafeAreaView>
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
    headingContainer:{
        gap: 5,
        marginBottom: -10,
    },
    buttonContainer:{
        width: '100%',
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backgroundGame: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', // Ensure it covers the entire view
        zIndex: -2, // Ensure it's behind giftGame
    },
    overlayBackground:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '120%', 
        backgroundColor: Colors.light.mainText,
        opacity: 0.5,  
        zIndex: -1, 
    }
});