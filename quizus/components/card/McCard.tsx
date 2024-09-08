import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Audio } from 'expo-av';
import { TextToSpeechContext } from '@/models/text-to-speech/TextToSpeechContext';
import { ElevenLabsTTS } from '@/models/text-to-speech/ElevenLabsTTS';
import { useFocusEffect } from '@react-navigation/native';

interface McCardProps {
  question_id?: string;
  question_text?: string;
  setMillisecondMC: (value: number) => void;
}

const MCs = [
    require('@/assets/images/gif/MC_01.gif'),
    require('@/assets/images/gif/MC_02.gif'),
    require('@/assets/images/gif/MC_03.gif'),
    require('@/assets/images/gif/MC_04.gif'),
    require('@/assets/images/gif/MC_05.gif'),
    require('@/assets/images/gif/MC_06.gif'),
    require('@/assets/images/gif/MC_07.gif'),
    require('@/assets/images/gif/MC_08.gif'),
    require('@/assets/images/gif/MC_09.gif'),
];

export function McCard({
    question_id = "q1",
    question_text = '',
    setMillisecondMC
}: McCardProps) {
   
  const [TTSContext, setTTSContext] = useState<TextToSpeechContext | null>(null);
  
  // Function to play the sound
  const playSound = async () => {
    try {
        const context = new TextToSpeechContext(new ElevenLabsTTS(question_text));
        await context.playAudio();
        await context.getDuration().then((duration) => {
            setMillisecondMC(duration + 1000);
        });
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  // Request audio permissions
  async function requestPermissions() {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access audio was denied');
    }
  }

  // useEffect to handle playing the sound
  useEffect(() => {
        requestPermissions();

        playSound();

        return () => {
            setTTSContext(null);
        };
    }, [question_id]);

  return (
    <View style={styles.videoContainer}>
      <Image
            style={{width: '100%', height: '100%'}}
            source={MCs[Math.floor(Math.random() * MCs.length)]}
        />
    </View>
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
    backgroundColor: Colors.light.subText,
    zIndex: 100,
  },
});
