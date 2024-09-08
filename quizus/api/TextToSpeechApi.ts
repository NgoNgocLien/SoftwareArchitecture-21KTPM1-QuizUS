import config from '@/constants/config';
import { Audio } from 'expo-av';

export const getElevenLabsSpeech = async (text: string, voice_id: string) => {
    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/with-timestamps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'xi-api-key': config.ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_turbo_v2_5",
                language_code: "vi",
                voice_settings: {
                    stability: 0.2,
                    similarity_boost: 0.3
                }
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate audio');
        }

        const result = await response.json();
        
        return result.audio_base64;
    } catch (error) {
        console.error('Error generating audio:', error);
        throw error;
    }
}
