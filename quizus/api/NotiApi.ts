import config from '@/constants/config';

export const getAll = async (id_player: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/noti/${id_player}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch noti ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch noti');
    }
}

export const updateSeenTime = async (id_player: string) => {
    try {
        // console.log(userInfo)
        const response = await fetch(`${config.CAMPAIGN_BE}/api/noti/${id_player}/seen_time`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to update noti seen time ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update noti seen time');
    }
}