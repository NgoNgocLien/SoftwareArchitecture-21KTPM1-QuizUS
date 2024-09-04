import config from '@/constants/config.js';

export const getCampaignsInProgess = async () => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/in_progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}