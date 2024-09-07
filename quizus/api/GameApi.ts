import config from '@/constants/config';

export const getGameInfo = async (id_campaign: string) => {
    try {

        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/campaign/${id_campaign}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            // console.log('game: ', result)
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const getPlayerTurn = async (id_player: string, id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/${id_player}/${id_campaign}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response)

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const increasePlayerTurn = async (id_player: string, id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_player,
                id_campaign
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}
