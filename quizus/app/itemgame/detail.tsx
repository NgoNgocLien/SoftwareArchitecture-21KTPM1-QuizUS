import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import config from '@/constants/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Paragraph } from '@/components/text/Paragraph';
import { Colors } from '@/constants/Colors';
import LottieView from 'lottie-react-native';
import { Accelerometer } from 'expo-sensors';
import { LoadingView } from '@/components/LoadingView';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';

const SHAKE_THRESHOLD = 2.3; // Adjust for sensitivity
const COOLDOWN_PERIOD = 3000; // 2 seconds cooldown


export default function ItemGameDetail() {
    const router = useRouter();
    const params = useLocalSearchParams(); 

    const id_campaign = params.id_campaign as string;
    const itemInfoString = Array.isArray(params.itemInfo) ? params.itemInfo[0] : params.itemInfo;
    const itemInfo = JSON.parse(itemInfoString);
    
    const [loading, setLoading] = useState(true);
    const [changeImage, setChangeImage] = useState(false);
    const [showExitPopup, setShowExitPopup] = useState(false);

    const [hasNavigated, setHasNavigated] = useState(false);
    const lastShakeTime = useRef<number>(0); // Store the last shake time
    const subscriptionRef = useRef<any>(null); // Store subscription reference

    const handleFinishGame = async () => {
        // Prevent triggering if the user has already navigated
        if (hasNavigated) return;

        setHasNavigated(true); // Set to true to prevent further shakes

        try {
            const isItem1 = Math.random() < 0.5;
            
            // Trigger alert only once
            Alert.alert('Item Selected', `You got item: ${isItem1 ? "Item 1" : "Item 2"}`);
            
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

                // Navigate to result page after finishing the game
                router.replace({
                    pathname: '/itemgame/result',
                    params,
                });
            } else {
                // Trigger an error alert only if the response is not okay
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'System error occurred');
        }
    };

    const handleCloseGame = () => {
        setHasNavigated(true); // Set the flag when closing the game
        router.replace({
            pathname: '/campaign',
            params: {
                id_campaign: id_campaign
            }
        });
    };

    const subscribe = () => {
        subscriptionRef.current = Accelerometer.addListener(accelerometerData => {
            const { x, y, z } = accelerometerData;
            const totalForce = Math.sqrt(x * x + y * y + z * z);

            const now = Date.now();

            // Only trigger shake if it passes the threshold and cooldown period has passed
            if (totalForce > SHAKE_THRESHOLD && (now - lastShakeTime.current) > COOLDOWN_PERIOD) {
                setChangeImage(true);
                lastShakeTime.current = Date.now(); // Update the last shake time

                // Delay the rest of the code by 2 seconds (2000 ms)
                setTimeout(() => {
                    if (!hasNavigated) {
                        handleFinishGame();
                    }
                }, 2000);
            }
        });
        Accelerometer.setUpdateInterval(200); // Adjust the update interval
    };

    const unsubscribe = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.remove(); // Properly remove the accelerometer listener
            subscriptionRef.current = null; // Clear the reference
        }
    };

    // Focus effect to manage accelerometer subscription
    useFocusEffect(
        React.useCallback(() => {
            subscribe(); // Subscribe when the screen is focused

            return () => {
                unsubscribe(); // Unsubscribe when the screen is unfocused
            };
        }, [])
    );


    return (
    <SafeAreaView style={styles.background}>
        {
        showExitPopup && (
            <>
            <View style={styles.exitContainer}>
            <Heading type={'h5'}>Kết thúc</Heading>
            <Paragraph type={'p2'} color={Colors.light.subText}>Bạn có chắc chắn muốn thoát trò chơi không?</Paragraph>
            <View style={styles.exitButtons}>
                <Button text="Quay lại" type="tertiary" style={styles.exitButton} onPress={() => {
                    setShowExitPopup(false);
                }} />
                <Button text="Đồng ý" type="primary" style={styles.exitButton}
                onPress={() => {
                    setShowExitPopup(false);
                    handleCloseGame();
                }} />
            </View>
            </View>
            <View style={styles.overlayContainer}>
            </View>
            </>
        )
        }
        <>
            {/* Background game image (behind the giftGame) */}
            <View style={styles.backgroundGame}>
                <Image
                    style={{ width: '100%', height: '120%' }}
                    source={require('@/assets/images/background-item-game.png')}
                    resizeMode="cover" // Ensures the background image covers the entire area
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>

            {
             loading ? <LoadingView/> : 
            <View style={styles.giftGame}>
                <TouchableOpacity style={styles.exitView} onPress={() => {setShowExitPopup(true)}}>
                    <MaterialCommunityIcons name={'window-close'} size={28} color={Colors.light.background} suppressHighlighting={true}/>                
                </TouchableOpacity>
                {
                    !changeImage 
                    ?
                    <LottieView
                        source={require('@/assets/animations/shaking.json')}
                        style={styles.giftImage}
                        autoPlay
                        loop
                    />
                    :
                    <LottieView
                        source={require('@/assets/animations/open.json')}
                        style={styles.giftImage}
                        autoPlay
                        loop
                    />
                }
                
                <View style={styles.gradientText}>
                    <MaterialCommunityIcons name={'vibrate'} size={28} color={Colors.light.background}  style={{ transform: [{ rotate: '-15deg' }] }} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>
                    <Paragraph type={'p2'} color={Colors.light.background}>Hãy lắc điện thoại để nhận vật phẩm</Paragraph>
                </View>
                <Image
                    style={styles.gradientImage} // Modified style for the gradient image
                    source={require('@/assets/images/gradient-shape-game.png')}
                />
                
            </View>
            }
        </>
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: Colors.gray._900,
        opacity: 0.5,
        zIndex: 100
      },
      exitContainer:{
        width: '80%',
        top: '40%',
        left: '10%',
        padding: 20,
        backgroundColor: Colors.light.background,
        borderRadius: 20,
        gap: 10,
        position: 'absolute',
        zIndex: 101
      },
      exitButtons:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      exitButton:{
        width: '48%',
        marginBottom: 0
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

