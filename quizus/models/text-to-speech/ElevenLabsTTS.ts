import { TextToSpeech } from './TextToSpeech';
import { getElevenLabsSpeech } from '@/api/TextToSpeechApi';
import config from '@/constants/config';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export class ElevenLabsTTS implements TextToSpeech {
    private VOICE_ID = "onwK4e9ZLuTAKqWW03F9";
    
    private text: string;
    private audio: Audio.Sound | null;
    private isReady: boolean;

    constructor(text: string) {
        this.text = text;
        this.audio = null;
        this.isReady = false;

        // Generate the audio and load the sound
        getElevenLabsSpeech(text, this.VOICE_ID).then((response) => {
            this.audio = new Audio.Sound();
            this.audio.loadAsync({ uri: `data:audio/mp3;base64,${response}` }).then(() => {
                this.isReady = true;
            }).catch((error) => {
                console.error('Error loading audio:', error);
            });
            
        }).catch((error) => {
            console.error('Error generating audio:', error);
        });
    }

    async playAudio(): Promise<void> {
        while (!this.isReady) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (this.audio === null) {
            throw new Error('Audio file not found');
        } else {
            await this.audio.playAsync();  // Play the audio
        }
    }

    async getDuration(): Promise<number> {
        while (!this.isReady) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (this.audio === null) {
            throw new Error('Audio file not found');
        } else {
            const status = await this.audio.getStatusAsync();
            return status.durationMillis;
        }
    }
}
