const express = require('express');
const router = express.Router();
const Voucher = require('../models/voucher');

// Tìm kiếm voucher theo brand
router.get('/search/:id_brand', async (req, res) => {
  try {
    const vouchers = await Voucher.find({ id_brand: req.params.id_brand });
    res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Tạo voucher
router.post('/', async (req, res) => {
  const voucher = new Voucher({
    id_brand: req.body.id_brand,
    code: req.body.code,
    qr_code: req.body.qr_code,
    photo: req.body.photo,
    price: req.body.price,
    description: req.body.description,
    expired_date: req.body.expired_date,
    score_exchange: req.body.score_exchange,
    status: req.body.status
  });

  try {
    const newVoucher = await voucher.save();
    res.status(201).json(newVoucher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật một voucher
router.put('/', async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.body._id);
    if (voucher) {
      voucher.id_brand = req.body.id_brand || voucher.id_brand;
      voucher.code = req.body.code || voucher.code;
      voucher.qr_code = req.body.qr_code || voucher.qr_code;
      voucher.photo = req.body.photo || voucher.photo;
      voucher.price = req.body.price || voucher.price;
      voucher.description = req.body.description || voucher.description;
      voucher.expired_date = req.body.expired_date || voucher.expired_date;
      voucher.score_exchange = req.body.score_exchange || voucher.score_exchange;
      voucher.status = req.body.status != null ? req.body.status : voucher.status;
      
      const updatedVoucher = await voucher.save();
      res.status(200).json(updatedVoucher);
    } else {
      res.status(404).json({ message: 'Voucher not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
