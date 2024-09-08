import { Audio } from 'expo-av';

export interface TextToSpeech {
    getText(): string;
    getAudio(): Audio.Sound;
    playAudio(): void;
    stopAudio(): void;
    isReady(): boolean;
}