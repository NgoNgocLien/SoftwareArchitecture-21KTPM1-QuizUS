import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import config from '@/constants/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Paragraph } from '@/components/text/Paragraph';
import { Colors } from '@/constants/Colors';

export default function Profile() {
    const router = useRouter();
    
    const id_campaign = '64e9d9c8e8b4c21c4b2e9f68';
    const itemInfo = {
        item1_photo: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725647152/quizus/f9dog7ropzk6keybvsvz.jpg',
        item2_photo: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725647152/quizus/mpufkyly2nb88hnfdsf7.jpg',
    };

    const [isItem1, setIsItem1] = useState<boolean>(false);

    const handleFinishGame = async () => {
        try {
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
                    quantity_item_1: result.quantity_item_1,
                    quantity_item_2: result.quantity_item_3,
                    id_campaign: id_campaign,
                    playerTurn: result.player_turn
                };

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
        router.replace({
            pathname: '/campaign',
            params: {
                id_campaign: id_campaign
            }
        })
    }

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
                    <MaterialCommunityIcons name={'window-close'} size={28} color={Colors.light.background} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>                
                </TouchableOpacity>
                <Image
                    style={styles.giftImage} // Modified style for the GIF
                    source={require('@/assets/images/gift.gif')}
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
        width: '100%',  // Adjust the size of the GIF
        height: '100%',
        resizeMode: 'contain', // Ensure it scales properly
        alignSelf: 'center',
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
