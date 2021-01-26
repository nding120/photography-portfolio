const express = require('express');

const ImgController = require('../controllers/images');
const extractFile = require('../middleware/file');
const checkCat = require('../middleware/check-cat');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/:cat', checkCat, extractFile, ImgController.createImgs);
router.post(
    '/:cat/delete-some',
    checkAuth,
    checkCat,
    ImgController.deleteImgsById
);

router.put('/:cat/:id', checkAuth, checkCat, ImgController.updateImg);

router.get('/:cat', checkCat, ImgController.getImgs);
router.get('/:cat/:id', checkCat, ImgController.getImg);

router.delete('/:cat', checkAuth, checkCat, ImgController.deleteImgs);
router.delete('/:cat/:id', checkAuth, checkCat, ImgController.deleteImg);

module.exports = router;
