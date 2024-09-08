import { TextToSpeech } from './TextToSpeech';
import { Audio } from 'expo-av';

export class TextToSpeechContext {
    private strategy: TextToSpeech;

    constructor(strategy: TextToSpeech) {
        this.strategy = strategy;
    }

    setStrategy(strategy: TextToSpeech) {
        this.strategy = strategy;
    }

    async playAudio(): Promise<void> {
        // Wait until the audio is ready, then play it
        await this.strategy.playAudio();
    }

    async getDuration(): Promise<number> {
        return await this.strategy.getDuration();
    }
}
