import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/Button';
import { useFocusEffect, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { removeFromSecureStore } from '@/api/SecureStoreService';
import { TextToSpeechContext } from '@/models/text-to-speech/TextToSpeechContext';
import { ElevenLabsTTS } from '@/models/text-to-speech/ElevenLabsTTS';
import { Audio } from 'expo-av';
import { getElevenLabsSpeech } from '@/api/TextToSpeechApi';
import config from '@/constants/config';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    removeFromSecureStore("id_player");
    router.replace("/login");
  };

    const [TTSContext, setTTSContext] = useState<TextToSpeechContext | null>(null);

    // // Function to play the audio
    // const loadAudio = useCallback(async (text: string) => {
    //     try {
    //         const context = new TextToSpeechContext(new ElevenLabsTTS(text));
    //         const isReady = context.waitUntilReady(); // Wait for audio to load
    //         setTTSContext(context);
    //         console.log("Audio loaded");
    //         // get audio length
    //         const audio = await context.getAudio();
    //         const status = await audio.getStatusAsync();
    //         console.log("Audio status:", status.durationMillis);

    //     } catch (error) {
    //         console.error("Error playing audio:", error);
    //     }
    // }, []);

    // // Play audio on screen focus
    // useFocusEffect(
    //     useCallback(() => {
    //         loadAudio("Trái đất có bao nhiêu lục địa?");
    //     }, [])
    // );

    // // Play the audio
    // const playAudio = async (text: string) => {
    //     try {
    //         if (TTSContext) {
    //             await TTSContext.playAudio(); // Play the audio
    //             console.log("Playing audio");
    //         } else {
    //             console.error("Audio context not found");
    //         }
    //     } catch (error) {
    //         console.error("Error playing audio:", error);
    //     }
    // };

    const playAudio = async (text: string) => {
        getElevenLabsSpeech(text, config.VOICE_ID).then((response) => {   
            console.log("Audio loaded");
        }).catch((error) => {
            console.error('Error generating audio:', error);
        });
    }


  return (
    <LinearGradient
      colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
      locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Button
          text="Đăng xuất"
          type="primary"
          onPress={handleLogout}
        />
        
        <Button
          text="Tạo file audio"
          type="primary"
          onPress={() => playAudio("Trái đất có bao nhiêu lục địa?")} // Play audio on button press
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
