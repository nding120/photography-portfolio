const IMG_CAT_ARR = ['landscape', 'life', 'portrait'];

module.exports = (req, res, next) => {
    if (IMG_CAT_ARR.indexOf(req.params.cat) !== -1) {
        next();
    } else {
        return res.status(404).json({
            message: 'Invalid image catalog!',
            success: false,
        });
    }
};