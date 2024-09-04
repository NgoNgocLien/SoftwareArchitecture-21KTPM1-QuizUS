import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';
import { Heading } from '../text/Heading';
import { Paragraph } from '../text/Paragraph';
import { Audio } from 'expo-av';

export function McCard({
    question_id = "q1",
    question_text = 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
}) {
   
    // const [sound, setSound] = useState<Audio.Sound | null>(null);
    // const playSound = async () => {
    //     try {
    //       const { sound } = await Audio.Sound.createAsync(
    //         require('./assets/speech.mp3'), 
    //         { shouldPlay: true, isLooping: false } 
    //       );
    //       setSound(sound);
    
    //       console.log('Sound loaded and playing');
    //     } catch (error) {
    //       console.error('Error loading sound:', error);
    //     }
    //   };
    
    //   // Automatically play sound after 1 second
    //   useEffect(() => {
    //     const timer = setTimeout(() => {
    //       playSound();
    //     }, 1000); // 1-second delay
    
    //     // Cleanup function
    //     return () => {
    //       clearTimeout(timer);
    //       sound ? sound.unloadAsync() : undefined; 
    //     };
    //   }, []);
    
    return (
        <>
            <View style={styles.videoContainer}>
                <Image
                    style={{width: '100%', height: '80%'}}
                    source={require('@/assets/images/MC.gif')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors.light.mainText,
      zIndex: 100
    }
});
