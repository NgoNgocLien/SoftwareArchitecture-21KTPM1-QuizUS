import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    StyleSheet, 
    ScrollView, 
    View, 
    Text, 
    Image, 
    Keyboard, 
    TouchableWithoutFeedback, 
    TouchableHighlight } from 'react-native';

import { Header } from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/CampaignCard';

export default function Rewards() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                style={styles.background}
            >
                <View>
                    <Header />          
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        paddingHorizontal: 20,
    },

});