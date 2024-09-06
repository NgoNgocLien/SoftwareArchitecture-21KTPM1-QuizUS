import config from '@/constants/config';

export const getCampaignsInProgess = async () => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/in_progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            return result;
        } else {
            throw new Error('Failed to fetch data: ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}