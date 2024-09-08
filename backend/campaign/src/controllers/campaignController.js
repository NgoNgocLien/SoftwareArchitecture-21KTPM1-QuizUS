const axios = require('axios');
const Campaign = require('../models/campaign');
const Voucher = require('../models/voucher');
const PlayerLikeCampaign = require('../models/playerLikeCampaign');
const PlayerGame = require('../models/playerGame');
const PlayerVoucher = require('../models/playerVoucher');
const Quiz = require('../models/quiz');

// Lấy tất cả các chiến dịch
const getAll = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy tất cả các chiến dịch đang diễn ra
const getInProgress = async (req, res) => {
    try {
        const now = new Date();

        // Lấy tất cả các chiến dịch có start_datetime <= now <= end_datetime
        // order by start_datetime ASC
        const campaigns = await Campaign.find({
            start_datetime: { $lte: now },
            end_datetime: { $gte: now }
        }).sort({ start_datetime: 1 });

        const result = await Promise.all(campaigns.map(async (item) => {
            const id_brand1 = item.id_brand1;
            console.log(id_brand1);
            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${id_brand1}`);
                return {
                    ...item._doc,
                    brand: brandResponse.data
                };
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information.");
            }
        }));

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy tất cả các chiến dịch của một brand theo id_brand
const getBrandCampaign = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            $or: [{ id_brand1: req.params.id_brand }, { id_brand2: req.params.id_brand }]
        });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tìm kiếm chiến dịch
const search = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            name: new RegExp(req.params.keyword, 'i')
        });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tìm kiếm chiến dịch của một brand
const searchByBrand = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            $and: [
                { $or: [{ id_brand1: req.params.id_brand }, { id_brand2: req.params.id_brand }] },
                { name: new RegExp(req.params.keyword, 'i') }
            ]
        });
        res.status(200).json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy thông tin của một chiến dịch
const getById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id_campaign);

        if (campaign) {
            const id_brand1 = campaign.id_brand1;
            const id_voucher = campaign.id_voucher; // Lấy id_voucher từ campaign

            try {
                // Fetch brand information
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${id_brand1}`);

                // Fetch voucher information from MongoDB
                const voucher = await Voucher.findById(id_voucher);

                // Combine the campaign data with the associated brand and voucher information
                const result = {
                    ...campaign._doc,
                    brand: brandResponse.data,
                    voucher: voucher // Thêm thông tin voucher vào kết quả
                };

                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch brand or voucher information.' });
            }
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo một chiến dịch mới
const create = async (req, res) => {
     try {
        const { quiz, campaign } = req.body;
    
        let newQuiz = null;
        if (quiz && quiz.description && quiz.questions && quiz.questions.length > 0) {
          newQuiz = new Quiz(quiz);
          await newQuiz.save(); 
        }
    
        const newCampaign = new Campaign({
          ...campaign,
          id_quiz: newQuiz ? newQuiz._id : null,
        });
    
        await newCampaign.save(); 
        res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
      } catch (error) {
        console.error('Error creating campaign with quiz:', error);
        res.status(500).json({ message: 'Error creating campaign', error });
      }
};

// Cập nhật một chiến dịch
const update = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ message: '_id is required' });
        }

        const updatedCampaign = await Campaign.findByIdAndUpdate(
            _id,
            {
                id_brand1: req.body.id_brand1,
                id_brand2: req.body.id_brand2,
                name: req.body.name,
                photo: req.body.photo,
                start_datetime: req.body.start_datetime,
                end_datetime: req.body.end_datetime,
                id_voucher: req.body.id_voucher,
                max_amount_voucher: req.body.max_amount_voucher,
                given_amount_voucher: req.body.given_amount_voucher,
                id_quiz: req.body.id_quiz,
                item1_photo: req.body.item1_photo,
                item2_photo: req.body.item2_photo,
                score_award: req.body.score_award
            },
            { new: true, runValidators: true }
        );

        if (!updatedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        res.json(updatedCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy campaign yêu thích của 1 player
const getPlayerFavorite = async (req, res) => {
    try {
        const playerLikes = await PlayerLikeCampaign.findOne({ id_player: req.params.id_player }).populate('campaigns.id_campaign');

        if (!playerLikes) {
            return res.json([]);
        }

        // Map over the campaigns to get the campaign data and associated brand information
        const result = await Promise.all(playerLikes.campaigns.map(async (like) => {
            const campaign = like.id_campaign;

            try {
                const brandResponse = await axios.get(`http://gateway_proxy:8000/user/api/brand/${campaign.id_brand1}`);
                const brand = brandResponse.data;

                return {
                    _id: like._id,
                    campaign_data: {
                        ...campaign._doc,
                        brand: {
                            ...brand
                        }
                    }
                };
            } catch (axiosError) {
                throw new Error("Failed to fetch brand information.");
            }
        }));

        // Return the structured result
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Lấy tất cả campaign có thể đổi thưởng bằng coin
const getRedeemableByCoin = async (req, res) => {
    try {
        const { score } = req.body; // Lấy điểm của người chơi từ BODY của request
        const currentTime = new Date();

        const redeemableCampaigns = await Campaign.find({
            score_award: { $lte: score },
            start_datetime: { $lte: currentTime }, // Campaign đã bắt đầu
            end_datetime: { $gte: currentTime } // Campaign chưa kết thúc
        });

        res.status(200).json(redeemableCampaigns);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
    }
};

//Lấy tất cả campaign có thể đổi thưởng bằng coin
const getRedeemableByItem = async (req, res) => {
    try {
        const { playerId } = req.body; // Lấy playerId từ body của request

        let NumItem1 = 1;
        let NumItem2 = 1;

        // Tìm tất cả các PlayerGame của người chơi đủ điều kiện đổi thưởng
        const playerGames = await PlayerGame.find({
            id_player: playerId,
            quantity_item1: { $gte: NumItem1 }, // Kiểm tra số lượng item1 >+ NumItem1
            quantity_item2: { $gte: NumItem2 }  // Kiểm tra số lượng item2 >= NumItem2(nếu cần tăng số lượng yêu cầu để đổi thì tăng 2 biến này)
        });

        const campaignIds = playerGames.map(game => game.id_campaign);
        const currentTime = new Date();

        // Tìm tất cả các campaign mà player có thể đổi thưởng dựa trên danh sách id_campaign và thời gian còn hiệu lực
        const redeemableCampaigns = await Campaign.find({
            _id: { $in: campaignIds }, // Chỉ lấy các campaign mà player đã sưu tầm đủ item
            start_datetime: { $lte: currentTime }, // Campaign đã bắt đầu
            end_datetime: { $gte: currentTime } // Campaign chưa kết thúc
        });

        res.status(200).json(redeemableCampaigns);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
    }
};

// Yêu thích campaign
const like = async (req, res) => {
    const { playerId, campaignId } = req.body;

    if (!playerId || !campaignId) {
        return res.status(400).json({ message: 'Player ID and Campaign ID are required.' });
    }

    try {
        let playerLike = await PlayerLikeCampaign.findOne({ id_player: playerId });

        if (!playerLike) {
            playerLike = new PlayerLikeCampaign({
                id_player: playerId,
                campaigns: [{ id_campaign: campaignId }]
            });
            await playerLike.save();
            return res.status(201).json(playerLike);
        }

        const campaignExists = playerLike.campaigns.some(campaign => campaign.id_campaign.toString() === campaignId);

        if (campaignExists) {
            return res.status(400).json({ message: 'Campaign already liked.' });
        }

        playerLike.campaigns.push({ id_campaign: campaignId });
        await playerLike.save();
        res.status(200).json(playerLike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Bỏ yêu thích campaign
const unlike = async (req, res) => {
    const { playerId, campaignId } = req.body;

    if (!playerId || !campaignId) {
        return res.status(400).json({ message: 'Player ID and Campaign ID are required.' });
    }

    try {
        const playerLike = await PlayerLikeCampaign.findOne({ id_player: playerId });

        if (!playerLike) {
            return res.status(404).json({ message: 'No likes found for this player.' });
        }

        const campaignIndex = playerLike.campaigns.findIndex(campaign => campaign.id_campaign.toString() === campaignId);

        if (campaignIndex === -1) {
            return res.status(400).json({ message: 'Campaign not found in likes.' });
        }

        playerLike.campaigns.splice(campaignIndex, 1);
        await playerLike.save();
        res.json(playerLike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//lấy tẩt cả campaign của 1 voucher
const getCampaignsOfVoucher = async (req, res) => {
    try {
        const { id_voucher } = req.params;

        const campaigns = await Campaign.find({ id_voucher: id_voucher });

        if (campaigns.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy campaign nào với id_voucher này.' });
        }

        res.status(200).json({ data: campaigns });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình lấy campaign.' });
    }
};

const getStats = async (req, res) => {
    try {
        const currentDate = new Date();
        const totalCampaigns = await Campaign.countDocuments();
        const totalVouchers = await PlayerVoucher.countDocuments();
        const voucherStats = await PlayerVoucher.aggregate([
            {
            $lookup: {
                from: 'vouchers', 
                localField: 'id_voucher',
                foreignField: '_id',
                as: 'voucherDetails'
            }
            },
            {
                $unwind: '$voucherDetails' 
            }
        ]);

        const validUnusedVouchers = voucherStats.reduce((accumulator, item) => {
            const expiryDate = new Date(item.voucherDetails.expired_date); 
            if (!item.is_used && expiryDate >= currentDate) {
              accumulator++;
            }
            return accumulator; 
          }, 0);

          const validUsedVouchers = voucherStats.reduce((accumulator, item) => {
            const expiryDate = new Date(item.voucherDetails.expired_date); 
            if (item.is_used && expiryDate > currentDate) {
              accumulator++;
            }
            return accumulator; 
          }, 0);

        const expiredVouchers = voucherStats.reduce((accumulator, item) => {
            const expiryDate = new Date(item.voucherDetails.expired_date); 
            if (expiryDate <= currentDate) {
              accumulator++;
            }
            return accumulator; 
          }, 0);

        const totalValue = voucherStats.reduce((accumulator, item) => {
            accumulator += item.voucherDetails.price; 
            return accumulator; 
        }, 0); 

        res.status(200).json({
            totalCampaigns,
            totalVouchers,
            totalValue,
            validUsedVouchers,
            validUnusedVouchers,
            expiredVouchers
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
  getAll,
  getInProgress,
  getBrandCampaign,
  search,
  searchByBrand,
  getById,
  create,
  update,
  getPlayerFavorite,
  getRedeemableByCoin,
  getRedeemableByItem,
  like,
  unlike,
  getCampaignsOfVoucher,
  getStats,
  getCampaignsOfVoucher
};
