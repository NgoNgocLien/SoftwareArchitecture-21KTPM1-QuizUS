const Item = require('../models/campaignItem');
// const Campaign = require('../models/campaign');

// Tạo item
const create = async (req, res) => {
  const item = new Item({
    id_campaign: req.body.id_campaign,
    photo: req.body.photo,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật một item
const update = async (req, res) => {
  try {
    const item = await Item.findById(req.body._id);
    if (item) {
      item.id_campaign = req.body.id_campaign || item.id_campaign;
      item.photo = req.body.photo || item.photo;
     
      const updatedItem = await item.save();
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {
  create,
  update
};
