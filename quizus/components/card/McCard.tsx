import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Audio } from 'expo-av';

interface McCardProps {
  question_id?: string;
  question_text?: string;
  setMillisecondMC: (value: number) => void;
}

const audioFiles: { [key: string]: any } = {
  q1: require('@/assets/audio/q1.mp3'),
  q2: require('@/assets/audio/q2.mp3'),
  q3: require('@/assets/audio/q3.mp3'),
  q4: require('@/assets/audio/q4.mp3'),
  q5: require('@/assets/audio/q5.mp3'),
  q6: require('@/assets/audio/q6.mp3'),
  q7: require('@/assets/audio/q7.mp3'),
  q8: require('@/assets/audio/q8.mp3'),
  q9: require('@/assets/audio/q9.mp3'),
  q10: require('@/assets/audio/q10.mp3'),
};

export function McCard({
    question_id = "q1",
    question_text = '',
    setMillisecondMC
}: McCardProps) {
   
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  
  // Function to play the sound
  const playSound = async () => {
    try {
      const pathMp3 = audioFiles[question_id]; // Select the audio file using question_id

      if (pathMp3) {
        const { sound, status } = await Audio.Sound.createAsync(
          pathMp3,
          { shouldPlay: true, isLooping: false }
        );
        setSound(sound);
  
        console.log('Sound loaded:', status);
        const currentStatus = await sound.getStatusAsync();
        console.log('Current Status:', currentStatus);
  
        // Play sound
        await sound.playAsync();
        console.log('Playing sound...');
  
        // Get the duration of the sound
        if (currentStatus.isLoaded && currentStatus.durationMillis) {
          setMillisecondMC(currentStatus.durationMillis);
          console.log("Seconds: ", currentStatus.durationMillis)
        } else {
          setMillisecondMC(0); // Set duration to 0 if unavailable
        }
      } else {
        console.error(`Audio file not found for question_id: ${question_id}`);
      }
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

    const play = async () => {
      await playSound();
    };

    const timer = setTimeout(() => {
      play();
    }, 1000); // 1-second delay

    return () => {
      clearTimeout(timer);
      sound?.unloadAsync(); // Clean up the sound object
    };
  }, [question_id]);

  return (
    <View style={styles.videoContainer}>
      <Image
            style={{width: '100%', height: '80%'}}
            source={require('@/assets/images/MC.gif')}
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
