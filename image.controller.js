const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newImage = new Image({
      title: req.body.title,
      tags: req.body.tags.split(','),
      imageUrl: result.secure_url,
    });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const tag = req.query.tag;
    const images = tag ? await Image.find({ tags: tag }) : await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};