const Campaign = require('../models/campaign');
const PlayerGame = require('../models/playerGame');
const Voucher = require('../models/voucher');
const TurnRequest = require('../models/turnRequest');
const ItemGift = require('../models/itemGift');
const axios = require('axios');
const turnRequest = require('../models/turnRequest');
const PlayerNoti = require('../models/playerNoti');

// Tìm kiếm game theo campaign
const searchByCampaign = async (req, res) => {
    try {
        if (!req.params.id_campaign) {
            return res.status(400).json({ message: 'id_campaign is required' });
        }

        const campaign = await Campaign.findById(req.params.id_campaign).populate('id_quiz');
        if (!campaign) {
            res.status(404).json({ message: 'Campaign not found' });
        } else {
            res.status(200).json(campaign);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// lấy tất cả mảnh ghép (item) của người chơi
const getAllItem = async (req, res) => {
    try {
        const id_player = req.params.id_player;

        if (!id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        const playerGames = await PlayerGame.find({ id_player }).populate({
            path: 'id_campaign',
            populate: {
                path: 'id_voucher',
                model: 'Voucher'
            }
        });

        if (!playerGames || playerGames.length === 0) {
            return res.status(404).json({ message: 'No games found for this player.' });
        }

        const currentTime = new Date();

        const result = playerGames
            .filter(playerGame => {
                const campaign = playerGame.id_campaign;
                return campaign.start_datetime <= currentTime && campaign.end_datetime >= currentTime && campaign.id_quiz == null;
            })
            .map(playerGame => {
                const campaign = playerGame.id_campaign;
                const voucher = campaign.id_voucher;
                return {
                    id_campaign: campaign._id,
                    name: campaign.name,
                    photo: campaign.photo,
                    item1_photo: campaign.item1_photo,
                    quantity_item1: playerGame.quantity_item1,
                    item2_photo: campaign.item2_photo,
                    quantity_item2: playerGame.quantity_item2,
                    start_datetime: campaign.start_datetime,
                    end_datetime: campaign.end_datetime,
                    vouchers: voucher ? {
                        id_voucher: voucher._id,
                        code: voucher.code,
                        qr_code: voucher.qr_code,
                        photo: voucher.photo,
                        price: voucher.price,
                        description: voucher.description,
                        expired_date: voucher.expired_date,
                        score_exchange: voucher.score_exchange,
                        status: voucher.status
                    } : null
                };
            });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// lưu kết quả chơi game của người chơi
const saveResult = async (req, res) => {
    try {
        if (!req.body.id_player || !req.body.id_campaign) {
            return res.status(400).json({ message: 'id_player, id_campaign are required' });
        }

        const playerGame = await PlayerGame.findOne({
            id_player: req.body.id_player,
            id_campaign: req.body.id_campaign,
        })

        if (!playerGame) {
            const newPlayerGame = new PlayerGame({
                id_player: req.body.id_player,
                id_campaign: req.body.id_campaign,
                player_turn: 2,
                quantity_item1: req.body.isItem1 ? 1 : 0,
                quantity_item2: !req.body.isItem1 ? 1 : 0,
            });

            const savedPlayerGame = await newPlayerGame.save();
            res.status(201).json(savedPlayerGame);
        } else {
            playerGame.player_turn -= 1;

            if (req.body.isItem1) {
                playerGame.quantity_item1 = (playerGame.quantity_item1 || 0) + 1;
            }
            else {
                playerGame.quantity_item2 = (playerGame.quantity_item2 || 0) + 1;
            }

            const savedPlayerGame = await playerGame.save();
            return res.status(201).json(savedPlayerGame);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// lấy lượt chơi còn lại của người chơi với 1 campaign
const getPlayerTurnByCampaign = async (req, res) => {
    try {
        const { id_player, id_campaign } = req.params;

        if (!id_player || !id_campaign) {
            return res.status(400).json({ message: 'id_player, id_campaign are required' });
        }

        const playerGame = await PlayerGame.findOne({
            id_player: id_player,
            id_campaign: id_campaign,
        });

        if (!playerGame) {
            return res.status(200).json({ player_turn: 3 });
        }

        return res.status(200).json({ player_turn: playerGame.player_turn });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// thêm lượt chơi của 1 campaign với 1 người chơi
const addPlayerTurn = async (req, res) => {
    try {
        const { id_player, id_campaign } = req.body;

        if (!id_player || !id_campaign) {
            return res.status(400).json({ message: 'id_player, id_campaign are required' });
        }

        const playerGame = await PlayerGame.findOne({ id_player, id_campaign });

        if (!playerGame) {
            return res.status(404).json({ message: 'Player game data not found for this campaign.' });
        }

        playerGame.player_turn += 1;
        await playerGame.save();

        return res.status(200).json({
            message: 'Player turns successfully added.',
            playerGame
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// giảm lượt chơi của 1 campaign với 1 người chơi
const reducePlayerTurn = async (req, res) => {
    try {
        const { id_player, id_campaign } = req.body;

        if (!id_player || !id_campaign) {
            return res.status(400).json({ message: 'id_player, id_campaign are required' });
        }

        const playerGame = await PlayerGame.findOne({ id_player, id_campaign });

        if (!playerGame) {
            return res.status(404).json({ message: 'Player game data not found for this campaign.' });
        }

        if (playerGame.player_turn < 1) {
            return res.status(400).json({ message: 'Not enough player turns to reduce.' });
        }

        playerGame.player_turn -= 1;
        await playerGame.save();

        return res.status(200).json({
            message: 'Player turns successfully reduced.',
            playerGame
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// xin lượt chơi từ bạn bè cho 1 campaign
const requestTurn = async (req, res) => {
    try {
        const { id_sender, id_receiver, id_campaign } = req.body;

        if (!id_sender || !id_receiver || !id_campaign) {
            return res.status(400).json({ message: 'id_sender, id_receiver, and id_campaign are required' });
        }

        const playerGame = await PlayerGame.findOne({
            id_player: id_sender,
            id_campaign: id_campaign
        });

        if (!playerGame) {
            return res.status(404).json({ message: 'Sender is not participating in this campaign.' });
        }

        // Tạo bản ghi mới trong TurnRequest (Lưu thông tin xin lượt chơi)
        const turnRequest = new TurnRequest({
            id_sender,
            id_receiver,
            id_campaign,
            request_time: new Date(),
            reply_time: null,
            is_accept: null
        });

        const savedTurnRequest = await turnRequest.save();

        // lấy thông tin sender
        const senderResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${id_sender}`);
        const sender = senderResponse.data;

        // lấy thông tin campaign
        const campaignResponse = await axios.get(`http://gateway_proxy:8000/campaign/api/campaign/${id_campaign}`);
        const campaign = campaignResponse.data;

        // Thêm noti
        const newNoti = new PlayerNoti({
            type: "friend",
            subtype: "request_turn",
            id_receiver,
            id_sender,
            name_sender: sender.username,
            id_campaign,
            name_campaign: campaign.name,
            id_turnrequest: savedTurnRequest._id,
            is_accept: null,
            noti_time: new Date(),
            seen_time: null
        });

        await newNoti.save();

        return res.status(201).json({
            message: 'Turn request sent.',
            turnRequest: savedTurnRequest,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// người chơi từ chối/chấp nhận cho bạn bè lượt chơi
const replyTurn = async (req, res) => {
    try {
        const { id_request, is_accept } = req.body;

        if (!id_request) {
            return res.status(400).json({ message: 'id_request are required' });
        }

        const turnRequest = await TurnRequest.findById(id_request);

        if (!turnRequest) {
            return res.status(404).json({ message: 'Turn request not found.' });
        }

        const { id_sender, id_receiver, id_campaign } = turnRequest;

        // Từ chối gửi lượt chơi
        if (!is_accept) {
            // Cập nhật TurnRequest với reply_time và is_accept = false
            turnRequest.reply_time = new Date();
            turnRequest.is_accept = false;
            await turnRequest.save();

            const playerNoti = await PlayerNoti.findOne({
                id_turnrequest: turnRequest._id
            });
            if (!playerNoti) {
                return res.status(404).json({ message: 'Player notification not found.' });
            }
            else {
                // Cập nhật PlayerNoti với is_accept = false và seen_time (nếu null)
                playerNoti.is_accept = false;
                if (playerNoti.seen_time === null) {
                    playerNoti.seen_time = new Date();
                }
                await playerNoti.save();
            }
            return res.status(200).json({
                message: 'Reject successfully!',
                turnRequest
            });
        }
        else { // Chấp nhận gửi lượt chơi
            const receiverGame = await PlayerGame.findOne({
                id_player: id_receiver,
                id_campaign: id_campaign
            });

            if (!receiverGame) {
                receiverGame = new PlayerGame({
                    id_player: id_receiver,
                    id_campaign: id_campaign,
                    player_turn: 2,
                    quantity_item1: 0,
                    quantity_item2: 0
                });
                await receiverGame.save();
            }
            else {
                if (receiverGame.player_turn < 1) {
                    return res.status(400).json({ message: 'Receiver does not have enough turn to send.' });
                }
                receiverGame.player_turn -= 1;
                await receiverGame.save();
            }

            let senderGame = await PlayerGame.findOne({
                id_player: id_sender,
                id_campaign: id_campaign
            });
            senderGame.player_turn += 1;
            await senderGame.save();

            // Cập nhật TurnRequest với reply_time và is_accept = true
            turnRequest.reply_time = new Date();
            turnRequest.is_accept = true;
            await turnRequest.save();

            const requestNoti = await PlayerNoti.findOne({
                id_turnrequest: turnRequest._id
            });
            if (!requestNoti) {
                return res.status(404).json({ message: 'Player request notification not found.' });
            }
            else {
                // Cập nhật requestNoti với is_accept = true và seen_time (nếu null)
                requestNoti.is_accept = true;
                if (requestNoti.seen_time === null) {
                    requestNoti.seen_time = new Date();
                }
                await requestNoti.save();
            }

            // lấy thông tin sender
            const senderResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${id_sender}`);
            const sender = senderResponse.data;

            // lấy thông tin campaign
            const campaignResponse = await axios.get(`http://gateway_proxy:8000/campaign/api/campaign/${id_campaign}`);
            const campaign = campaignResponse.data;

            // Thêm noti receive
            const newNoti = new PlayerNoti({
                type: "friend",
                subtype: "receive_turn",
                id_receiver,
                id_sender,
                name_sender: sender.username,
                id_campaign,
                name_campaign: campaign.name,
                id_turnrequest: turnRequest._id,
                noti_time: new Date(),
                seen_time: null
            });

            await newNoti.save();

            return res.status(200).json({
                message: 'Player turn successfully transferred.',
                sender: { id_sender, player_turn: senderGame.player_turn },
                receiver: { id_receiver, player_turn: receiverGame.player_turn },
                turnRequest
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// xem thông báo liên quan đến noti
const seenTurnNoti = async (req, res) => {
    try {
        const { id_noti } = req.body;

        if (!id_noti) {
            return res.status(400).json({ message: 'id_noti are required' });
        }

        const turnNoti = await PlayerNoti.findById(id_noti);

        if (!turnNoti) {
            return res.status(404).json({ message: 'Turn notification not found.' });
        }
        turnNoti.seen_time = new Date();
        await turnNoti.save();

        return res.status(201).json({
            message: 'Noti successfully seen!',
            noti: turnNoti
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// tặng mảnh ghép cho bạn
const sendItem = async (req, res) => {
    try {
        const { id_sender, id_receiver, id_item, id_campaign } = req.body;

        if (!id_sender || !id_receiver || !id_item || !id_campaign) {
            return res.status(400).json({ message: 'id_sender, id_receiver, id_item, and id_campaign are required' });
        }

        const senderGame = await PlayerGame.findOne({
            id_player: id_sender,
            id_campaign: id_campaign
        });

        // Kiểm tra số lượng item dựa trên id_item
        if (id_item === 1 && senderGame.quantity_item1 < 1) {
            return res.status(400).json({ message: 'Sender does not have enough item1 to send.' });
        }
        if (id_item === 2 && senderGame.quantity_item2 < 1) {
            return res.status(400).json({ message: 'Sender does not have enough item2 to send.' });
        }

        let receiverGame = await PlayerGame.findOne({
            id_player: id_receiver,
            id_campaign: id_campaign
        });

        // Nếu người nhận chưa tham gia campaign, tạo một bản ghi mới trong PlayerGame
        if (!receiverGame) {
            receiverGame = new PlayerGame({
                id_player: id_receiver,
                id_campaign: id_campaign,
                player_turn: 3,
                quantity_item1: id_item === 1 ? 1 : 0,
                quantity_item2: id_item === 2 ? 1 : 0
            });

            if (id_item === 1) {
                // Giảm 1 quantity_item1 của người gửi
                senderGame.quantity_item1 -= 1;
            } else if (id_item === 2) {
                // Giảm 1 quantity_item2 của người gửi
                senderGame.quantity_item2 -= 1;
            } else {
                return res.status(400).json({ message: 'Invalid item id. Only 1 or 2 are valid.' });
            }

            await senderGame.save();
            await receiverGame.save();
        }
        else {
            if (id_item === 1) {
                // Giảm 1 quantity_item1 của người gửi
                senderGame.quantity_item1 -= 1;

                // Tăng 1 quantity_item1 của người nhận
                receiverGame.quantity_item1 += 1;
            } else if (id_item === 2) {
                // Giảm 1 quantity_item2 của người gửi
                senderGame.quantity_item2 -= 1;

                // Tăng 1 quantity_item2 của người nhận
                receiverGame.quantity_item2 += 1;
            } else {
                return res.status(400).json({ message: 'Invalid item id. Only 1 or 2 are valid.' });
            }
            await senderGame.save();
            await receiverGame.save();
        }

        // Tạo bản ghi mới trong ItemGift để lưu thông tin mảnh ghép đã tặng
        const newGift = new ItemGift({
            id_sender,
            id_receiver,
            id_item,
            id_campaign,
            gift_time: new Date()
        });

        await newGift.save();

        // lấy thông tin sender
        const senderResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${id_sender}`);
        const sender = senderResponse.data;

        // lấy thông tin campaign
        const campaignResponse = await axios.get(`http://gateway_proxy:8000/campaign/api/campaign/${id_campaign}`);
        const campaign = campaignResponse.data;

        // Thêm noti
        const newNoti = new PlayerNoti({
            type: "friend",
            subtype: "item",
            id_receiver,
            id_sender,
            name_sender: sender.username,
            id_campaign,
            name_campaign: campaign.name,
            id_item,
            id_itemgift: newGift._id,
            noti_time: new Date(),
            seen_time: null
        });

        await newNoti.save({
                type: newNoti.type,
                subtype: newNoti.subtype,
                id_receiver: newNoti.id_receiver,
                id_sender: newNoti.id_sender,
                name_sender: newNoti.name_sender,
                id_campaign: newNoti.id_campaign,
                name_campaign: newNoti.name_campaign,
                id_item: newNoti.id_item,
                id_itemgift: newNoti.id_itemgift,
                noti_time: newNoti.noti_time,
                seen_time: newNoti.seen_time
            });

        console.log({
            type: newNoti.type,
            subtype: newNoti.subtype,
            id_receiver: newNoti.id_receiver,
            id_sender: newNoti.id_sender,
            name_sender: newNoti.name_sender,
            id_campaign: newNoti.id_campaign,
            name_campaign: newNoti.name_campaign,
            id_item: newNoti.id_item,
            id_itemgift: newNoti.id_itemgift,
            noti_time: newNoti.noti_time,
            seen_time: newNoti.seen_time
        })

        await axios.post('http://10.0.1.35:8004/emit-notification', {
            noti: {
                type: newNoti.type,
                subtype: newNoti.subtype,
                id_receiver: newNoti.id_receiver,
                id_sender: newNoti.id_sender,
                name_sender: newNoti.name_sender,
                id_campaign: newNoti.id_campaign,
                name_campaign: newNoti.name_campaign,
                id_item: newNoti.id_item,
                id_itemgift: newNoti.id_itemgift,
                noti_time: newNoti.noti_time,
                seen_time: newNoti.seen_time
            }
        });

        return res.status(201).json({
            message: 'Item successfully sent!',
            gift: newGift
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// nhận mảnh ghép từ bạn
const receiveItem = async (req, res) => {
    try {
        const { id_gift } = req.body;

        if (!id_gift) {
            return res.status(400).json({ message: 'id_gift is required' });
        }

        const gift = await ItemGift.findById(id_gift);

        if (!gift) {
            return res.status(404).json({ message: 'Gift not found.' });
        }

        if (gift.accept_time !== null) {
            return res.status(400).json({ message: 'This gift has already been accepted.' });
        }

        const { id_sender, id_receiver, id_item, id_campaign } = gift;

        const senderGame = await PlayerGame.findOne({
            id_player: id_sender,
            id_campaign: id_campaign
        });

        const receiverGame = await PlayerGame.findOne({
            id_player: id_receiver,
            id_campaign: id_campaign
        });

        if (!receiverGame) {
            receiverGame = new PlayerGame({
                id_player: id_receiver,
                id_campaign: id_campaign,
                player_turn: 3,
                quantity_item1: 0,
                quantity_item2: 0
            });
            await receiverGame.save();
        }

        // Kiểm tra và cập nhật số lượng item
        if (id_item === 1) {
            // Giảm 1 quantity_item1 của người gửi
            if (senderGame.quantity_item1 < 1) {
                return res.status(400).json({ message: 'Sender does not have enough item1 to transfer.' });
            }

            senderGame.quantity_item1 -= 1;

            // Tăng 1 quantity_item1 của người nhận
            receiverGame.quantity_item1 += 1;
        } else if (id_item === 2) {
            // Giảm 1 quantity_item2 của người gửi
            if (senderGame.quantity_item2 < 1) {
                return res.status(400).json({ message: 'Sender does not have enough item2 to transfer.' });
            }

            senderGame.quantity_item2 -= 1;

            // Tăng 1 quantity_item2 của người nhận
            receiverGame.quantity_item2 += 1;
        } else {
            return res.status(400).json({ message: 'Invalid item id. Only 1 or 2 are valid.' });
        }

        gift.accept_time = new Date();

        await senderGame.save();
        await receiverGame.save();
        await gift.save();

        return res.status(200).json({
            message: 'Gift successfully accepted.',
            sender: {
                id_sender,
                quantity_item1: senderGame.quantity_item1,
                quantity_item2: senderGame.quantity_item2
            },
            receiver: {
                id_receiver,
                quantity_item1: receiverGame.quantity_item1,
                quantity_item2: receiverGame.quantity_item2
            },
            gift
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// lấy các thông báo xin lượt chơi từ bạn bè
const getItemRequest = async (req, res) => {
    try {
        const { id_player } = req.params;

        if (!id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        const gifts = await ItemGift.find({
            id_receiver: id_player
        }).populate('id_campaign');

        const result = await Promise.all(gifts.map(async (gift) => {
            try {
                const playerResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${gift.id_sender}`);
                const player = playerResponse.data;

                return {
                    id_gift: gift._id,
                    id_sender: gift.id_sender,
                    name_sender: player.username,
                    id_receiver: gift.id_receiver,
                    id_item: gift.id_item,
                    id_campaign: gift.id_campaign._id,
                    id_campaign_name: gift.id_campaign.name,
                    gift_time: gift.gift_time,
                    accept_time: gift.accept_time,
                }
            } catch (axiosError) {
                console.log(axiosError)
                throw new Error("Failed to fetch player information.");
            }
        }))

        return res.json(gifts);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// lấy các thông báo tặng mảnh ghép từ bạn bè
const getTurnRequest = async (req, res) => {
    try {
        const { id_player } = req.params;

        if (!id_player) {
            return res.status(400).json({ message: 'id_player is required' });
        }

        const turns = await TurnRequest.find({
            id_receiver: id_player
        }).populate('id_campaign');

        const result = await Promise.all(turns.map(async (turn) => {
            try {
                const playerResponse = await axios.get(`http://gateway_proxy:8000/user/api/player/${turn.id_sender}`);
                const player = playerResponse.data;

                return {
                    id_turn: turn._id,
                    id_sender: turn.id_sender,
                    name_sender: player.username,
                    id_receiver: turn.id_receiver,
                    id_campaign: turn.id_campaign._id,
                    id_campaign_name: turn.id_campaign.name,
                    request_time: turn.request_time,
                    accept_time: turn.accept_time,
                }
            } catch (axiosError) {
                console.log(axiosError)
                throw new Error("Failed to fetch player information.");
            }
        }))

        return res.json(result);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Lấy số lượng người chơi theo loại trò chơi
const getPlayerCountByGameType = async (req, res) => {
    try {
        // Đếm số lượng người chơi cho trò "lắc vật phẩm" (id_quiz là null)
        const itemGameCampaigns = await Campaign.find({ id_quiz: null }).select('_id');
        const itemGamePlayerCount = await PlayerGame.countDocuments({
            id_campaign: { $in: itemGameCampaigns.map(campaign => campaign._id) }
        });

        // Đếm số lượng người chơi cho trò "trắc nghiệm" (id_quiz khác null)
        const quizGameCampaigns = await Campaign.find({ id_quiz: { $ne: null } }).select('_id');
        const quizGamePlayerCount = await PlayerGame.countDocuments({
            id_campaign: { $in: quizGameCampaigns.map(campaign => campaign._id) }
        });

        // Trả về kết quả đếm số lượng người chơi theo loại trò chơi
        return res.status(200).json({
            itemGamePlayerCount, 
            quizGamePlayerCount
        });

    } catch (error) {
        console.error('Error in getPlayerCountByGameType:', error.message);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    searchByCampaign,
    getAllItem,
    saveResult,
    getPlayerTurnByCampaign,
    addPlayerTurn,
    reducePlayerTurn,
    requestTurn,
    replyTurn,
    sendItem,
    receiveItem,
    getTurnRequest,
    getItemRequest,
    seenTurnNoti,
    getPlayerCountByGameType
};
