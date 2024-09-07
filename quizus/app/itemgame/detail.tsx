import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import config from '@/constants/config';

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
                <Image
                    style={styles.giftImage} // Modified style for the GIF
                    source={require('@/assets/images/gift.gif')}
                />
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
    backgroundGame: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', // Ensure it covers the entire view
        zIndex: -1, // Ensure it's behind giftGame
    },
});
