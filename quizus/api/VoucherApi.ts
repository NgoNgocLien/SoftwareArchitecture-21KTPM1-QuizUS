import config from '@/constants/config';

export const getExchangedVouchers = async (id_player: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/voucher/exchange/${id_player}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            // console.log(result)
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const getActiveVouchers = async () => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/voucher/active`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const exchangeCoinVoucher = async (id_player: string, id_campaign: string, score_exchange: number) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/voucher/exchange/coin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_player: id_player,
                id_campaign: id_campaign,
                score_exchange: score_exchange
            })
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}

export const exchangeItemVoucher = async (id_player: string, id_campaign: string, id_voucher: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/voucher/exchange/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_player: id_player,
                id_campaign: id_campaign,
                id_voucher: id_voucher
            })
        });

        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            throw new Error('Failed to fetch data ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data');
    }
}