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

        // console.log(response)

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

export const increasePlayerTurn = async (id_player: string, id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/add`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_player,
                id_campaign
            }),
        });

        // console.log(response);
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

export const sendItem = async (
    id_sender: string, 
    id_receiver: string, 
    id_item: string, 
    id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/item/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_sender,
                id_receiver,
                id_item,
                id_campaign
            }),
        });

        // console.log(response);
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

// export const receiveItem = async (
//     id_gift: string, ) => {
//     try {
//         const response = await fetch(`${config.CAMPAIGN_BE}/api/game/item/receive`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 id_gift,
//             }),
//         });

//         // console.log(response);
//         const result = await response.json();
//         if (response.ok) {
//             // console.log(result)
//             return result;
//         } else {
//             throw new Error('Failed to fetch data ', result.message);
//         }
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to fetch data');
//     }
// }

export const sendTurn = async (
    id_sender: string, 
    id_receiver: string, 
    id_campaign: string) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_sender,
                id_receiver,
                id_campaign
            }),
        });

        // console.log(response);
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

export const replyTurn = async (
    id_request: string, 
    is_accept: boolean) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/request`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_request: id_request,
                is_accept: is_accept
            }),
        });

        // console.log(response);
        const result = await response.json();
        if (response.ok) {
            // console.log(result)
            return result;
        } else {
            throw new Error('Failed to reply turn ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to reply turn');
    }
}

export const seenTurnNoti = async (
    id_noti: string
) => {
    try {
        const response = await fetch(`${config.CAMPAIGN_BE}/api/game/player_turn/seen`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_noti: id_noti
            }),
        });

        // console.log(response);
        const result = await response.json();
        if (response.ok) {
            // console.log(result)
            return result;
        } else {
            throw new Error('Failed to seen turn noti ', result.message);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to seen turn noti');
    }
}
