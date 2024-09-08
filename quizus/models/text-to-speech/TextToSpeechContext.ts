import { TextToSpeech } from './TextToSpeech';

export class TextToSpeechContext {
    private strategy: TextToSpeech;

    constructor(strategy: TextToSpeech) {
        this.strategy = strategy;
    }

    setStrategy(strategy: TextToSpeech) {
        this.strategy = strategy;
    }

    async convertTextToSpeech(): Promise<void> {
        while (!this.strategy.isReady()) {
            await new Promise(resolve => setTimeout(resolve, 100));  // Add a small delay
        }
        this.strategy.playAudio();
    }
}
