const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/images', upload.single('image'), imageController.uploadImage);
router.get('/images', imageController.getImages);

module.exports = router;