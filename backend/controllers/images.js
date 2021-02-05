const fs = require('fs');

const Landscape = require('../models/landscape');
const Life = require('../models/life');
const Portrait = require('../models/portrait');

const IMG_CAT_MAP = {
    landscape: Landscape,
    life: Life,
    portrait: Portrait,
};

exports.createImgs = (req, res, next) => {
    if (!req.files && !req.files.length) {
        return res.status(400).json({
            message: 'Image not found!',
            success: false,
        });
    }

    const url = req.protocol + '://' + req.get('host');
    const images = [];
    let idx = 0;
    for (const file of req.files) {
        let title = undefined;
        let desc = undefined;
        if (req.body.titles && req.body.titles[idx]) {
            title = req.body.titles[idx];
        }
        if (req.body.descs && req.body.descs[idx]) {
            desc = req.body.descs[idx];
        }
        images.push({
            title: title,
            desc: desc,
            path: url + '/images/' + req.params.cat + '/' + file.filename,
        });
        idx++;
    }

    IMG_CAT_MAP[req.params.cat]
        .insertMany(images)
        .then((imgs) => {
            res.status(201).json({
                message: 'Uploading images successful!',
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Uploading image failed!',
                success: false,
            });
        });
};

exports.updateImg = (req, res, next) => {
    let imgPath = req.body.path;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imgPath = url + '/images/' + req.params.cat + '/' + file.filename;
    }
    const image = new IMG_CAT_MAP[req.params.cat]({
        _id: req.params.id,
        title: req.body.title,
        desc: req.body.desc,
        path: imgPath,
    });

    IMG_CAT_MAP[req.params.cat]
        .updateOne({ _id: req.params.id }, image)
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'Update image successful!',
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: 'Image not found!',
                    success: false,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Update image failed!',
                success: false,
            });
        });
};

exports.getImg = (req, res, next) => {
    IMG_CAT_MAP[req.params.cat]
        .findById(req.params.id)
        .then((img) => {
            if (img) {
                res.status(200).json(formatImg(img));
            } else {
                res,
                status(404).json({
                    message: 'Image not found!',
                    success: false,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Fetching image failed!',
                success: false,
            });
        });
};

exports.getImgs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const imgQuery = IMG_CAT_MAP[req.params.cat].find();
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    imgQuery
        .then((imgs) => {
            const images = [];
            for (const img of imgs) {
                images.push(formatImg(img));
            }
            res.status(200).json(images);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Fetching images failed!',
                success: false,
            });
        });
};

exports.deleteImg = (req, res, next) => {
    IMG_CAT_MAP[req.params.cat]
        .findOneAndDelete({ _id: req.params.id })
        .then((img) => {
            if (img) {
                res.status(200).json({
                    message: 'Deleting images successful!',
                    success: true,
                });
                removeImgFromDir(img);
            } else {
                res.status(400).json({
                    message: 'Image not found!',
                    success: false,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Deleting image failed!',
                success: false,
            });
        });
};

exports.deleteImgs = (req, res, next) => {
    IMG_CAT_MAP[req.params.cat]
        .deleteMany()
        .then((result) => {
            res.status(200).json({
                message: 'Deleting images successful!',
                success: true,
            });
            const dir = 'backend/images/' + req.params.cat;
            fs.readdir(dir, (err, imgs) => {
                if (err) {
                    console.log(err);
                    return;
                }
                for (const img of imgs) {
                    unlink(dir + '/' + img);
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Deleting images failed!',
                success: false,
            });
        });
};

exports.deleteImgsById = (req, res, next) => {
    IMG_CAT_MAP[req.params.cat]
        .find({
            _id: {
                $in: req.body.ids,
            },
        })
        .then((imgs) => {
            if (imgs.length) {
                for (const img of imgs) {
                    img.remove().then((result) => {
                        removeImgFromDir(result);
                    });
                }
                res.status(200).json({
                    message: 'Deleting images successful!',
                    success: true,
                });
            } else {
                res.status(400).json({
                    message: 'Images not found!',
                    success: false,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Deleting images failed!',
                success: false,
            });
        });
};

function formatImg(img) {
    return {
        id: img._id,
        title: img.title,
        desc: img.desc,
        path: img.path,
        createdAt: img.created_at,
        updatedAt: img.updated_at,
    };
}

function removeImgFromDir(img) {
    if (!img || !img.path) {
        console.log('Image is invalid!');
        return;
    }
    const path = 'backend/images/' + img.path.split('/images/')[1];
    unlink(path);
}

function unlink(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.log(
                'Image not found in directory! ' +
                path.split('backend/images/')[1]
            );
        } else {
            console.log(
                'Image removed from directory! ' +
                path.split('backend/images/')[1]
            );
        }
    });
}