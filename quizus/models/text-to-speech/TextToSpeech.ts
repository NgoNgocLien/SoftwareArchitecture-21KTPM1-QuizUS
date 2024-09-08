import { Audio } from 'expo-av';

export interface TextToSpeech {
    getDuration(): Promise<number>;
    playAudio(): Promise<void>;
}