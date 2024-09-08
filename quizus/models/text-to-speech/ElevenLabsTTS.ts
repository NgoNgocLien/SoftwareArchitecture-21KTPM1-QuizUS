import { TextToSpeech } from './TextToSpeech';
import { getElevenLabsSpeech } from '@/api/TextToSpeechApi';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export class ElevenLabsTTS implements TextToSpeech {
    private VOICE_ID = "onwK4e9ZLuTAKqWW03F9";
    private filePath = FileSystem.documentDirectory + 'audio.mp3';

    private text: string;
    private audio: Audio.Sound | null;

    constructor(text: string) {
        this.text = text;
        this.audio = null;

        getElevenLabsSpeech(text, this.VOICE_ID).then((response) => {
            const path = this.saveAudioFile(response, this.filePath);
            const sound = new Audio.Sound();
            sound.loadAsync({ uri: path }).then(() => {
                this.text = text;
                this.audio = sound;
            }).catch((error) => {
                console.error('Error loading audio file:', error);
            });
        }).catch((error) => {
            console.error('Error generating audio:', error);
        });

    }

    private saveAudioFile(audioData: string, filePath: string): string {
        FileSystem.writeAsStringAsync(filePath, audioData, {
            encoding: FileSystem.EncodingType.Base64,
        });
        this.filePath = filePath;
        return filePath;
    }

    getText() {
        return this.text;
    }

    getAudio(): Audio.Sound {
        if (this.audio === null) {
            throw new Error('Audio file not found');
        }
        return this.audio;
    }

    async playAudio() {
        try {
            if (this.audio === null) {
                throw new Error('Audio file not found');
            }
            await this.audio.playAsync();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }
    

    async stopAudio() {
        try {
            if (this.audio === null) {
                throw new Error('Audio file not found');
            }
            await this.audio.stopAsync();
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    }

    isReady() {
        if (this.audio === null) {
            return false;
        } else {
            return true;
        }
    }
}
