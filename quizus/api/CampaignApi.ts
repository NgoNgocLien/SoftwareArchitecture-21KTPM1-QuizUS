import config from '@/constants/config';

export const getCampaignById = async (id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/campaign/${id_campaign}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch data: ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const getCampaignsInProgess = async () => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/campaign/in_progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // console.log("in_progress", response);
        const result = await response.json();
        
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch data getCampaignsInProgess: ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data getCampaignsInProgess: ');
    }
}

export const likeCampaign = async (id_player: string, id_campaign: string) => {
    try {
        let player = "100006";
        let campaign = "100001";
        const response = await fetch(`${config.CAMPAIGN_BE}/api/campaign/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerId: id_player,
                campaignId: id_campaign,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to like campaign: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to like campaign');
    }
}

export const unlikeCampaign = async (id_player: string, id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/campaign/unlike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerId: id_player,
                campaignId: id_campaign,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to unlike campaign: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to unlike campaign');
    }
}

export const getLikedCampaigns = async (id_player: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/campaign/like/${id_player}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch liked campaigns: getLikedCampaigns' + result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch liked campaigns');
    }
}
