import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import config from '@/constants/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Paragraph } from '@/components/text/Paragraph';
import { Colors } from '@/constants/Colors';
import LottieView from 'lottie-react-native';
import { Accelerometer } from 'expo-sensors';

const SHAKE_THRESHOLD = 2.3; // Adjust for sensitivity
const COOLDOWN_PERIOD = 3000; // 2 seconds cooldown


export default function ItemGameDetail() {
    const router = useRouter();
    const params = useLocalSearchParams(); 

    const id_campaign = params.id_campaign as string;
    const itemInfoString = Array.isArray(params.itemInfo) ? params.itemInfo[0] : params.itemInfo;
    const itemInfo = JSON.parse(itemInfoString);

    const [hasNavigated, setHasNavigated] = useState(false);

    const handleFinishGame = async () => {
        try {
            const isItem1 = Math.random() < 0.5;
            Alert.alert('err',isItem1.toString())
            
            const response = await fetch(`${config.CAMPAIGN_BE}/api/game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_player: config.ID_PLAYER,
                    id_campaign: id_campaign,
                    isItem1: isItem1
                }),
            });


            const result = await response.json();

            if (response.ok) {    
                const params = {
                    isItem1: isItem1.toString(),
                    quantity_item1: result.quantity_item1,
                    quantity_item2: result.quantity_item2,
                    id_campaign: id_campaign,
                    playerTurn: result.player_turn,
                    itemInfo: JSON.stringify(itemInfo),
                };

                setHasNavigated(true);
                router.replace({
                    pathname: '/itemgame/result',
                    params,
                });
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Lỗi hệ thống');
        }
    };

    const handleCloseGame = () =>{
        setHasNavigated(true);
        router.replace({
            pathname: '/campaign',
            params: {
                id_campaign: id_campaign
            }
        })
    }

    const [data, setData] = useState({ x: 0, y: 0, z: 0 });
    const [subscription, setSubscription] = useState<any>(null);
    const lastShakeTime = useRef<number>(0); // Ref to store the last shake time
    
    const subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
                const { x, y, z } = accelerometerData;
                const totalForce = Math.sqrt(x * x + y * y + z * z);

                const now = Date.now();
                if (!hasNavigated && totalForce > SHAKE_THRESHOLD && now - lastShakeTime.current > COOLDOWN_PERIOD) {
                    lastShakeTime.current = now; // Update the last shake time
                    handleFinishGame();
                }
            })
        );
        Accelerometer.setUpdateInterval(100); // Adjust the update interval
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        subscribe();
        return () => unsubscribe();
    }, []);


    return (
        <SafeAreaView style={styles.background}>
            {/* Background game image (behind the giftGame) */}
            <View style={styles.backgroundGame}>
                <Image
                    style={{ width: '100%', height: '120%' }}
                    source={require('@/assets/images/background-item-game.png')}
                    resizeMode="cover" // Ensures the background image covers the entire area
                />
            </View>

            {/* Gift game view (on top of background) */}
            <View style={styles.giftGame}>
                <TouchableOpacity style={styles.exitView} onPress={handleCloseGame}>
                    <MaterialCommunityIcons name={'window-close'} size={28} color={Colors.light.background} suppressHighlighting={true}/>                
                </TouchableOpacity>
                <LottieView
                    source={require('@/assets/animations/shaking.json')}
                    style={styles.giftImage}
                    autoPlay
                    loop
                />
                <View style={styles.gradientText}>
                    <MaterialCommunityIcons name={'vibrate'} size={28} color={Colors.light.background}  style={{ transform: [{ rotate: '-15deg' }] }} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>
                    <Paragraph type={'p2'} color={Colors.light.background}>Hãy lắc điện thoại để nhận vật phẩm</Paragraph>
                </View>
                <Image
                    style={styles.gradientImage} // Modified style for the gradient image
                    source={require('@/assets/images/gradient-shape-game.png')}
                />
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    giftGame: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0, 
        height: '90%', // Give it enough height to be visible
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        zIndex: 10, // Ensure it's on top of the background
        backgroundColor: 'transparent', // Make sure it’s transparent
    },
    giftImage: {
        width: '150%',  // Adjust the size of the GIF
        height: '150%',
        resizeMode: 'contain', // Ensure it scales properly
        alignSelf: 'center',
        top: -35
    },
    gradientImage: {
        width: '100%',
        height: '8%',
        opacity: 0.8,
        position: 'absolute', // Ensure it's positioned within the giftGame view
        bottom: 10, // Position the gradient image at the bottom of the giftGame
    },
    gradientText:{
        width: '100%',
        height: '8%',
        opacity: 0.8,
        position: 'absolute', // Ensure it's positioned within the giftGame view
        bottom: 10, // Position the gradient image at the bottom of the giftGame
        zIndex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    exitView: {
        width: '10%',
        height: '6%',
        position: 'absolute',
        backgroundColor: Colors.light.primary, 
        top: 30,
        right: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        zIndex: 1000
    },
    backgroundGame: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', // Ensure it covers the entire view
        zIndex: -1, // Ensure it's behind giftGame
    },
});

