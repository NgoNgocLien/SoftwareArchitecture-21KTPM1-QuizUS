import config from '@/constants/config';

export const getPlayerById = async (id_player: string) => {
    try {
        const response = await fetch(`${config.USER_BE}/api/player/${id_player}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch player ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch player');
    }
}

export const getPlayerScore = async (id_player: string) => {
    try {
        const response = await fetch(`${config.USER_BE}/api/player/score/${id_player}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch player score ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch player score');
    }
}