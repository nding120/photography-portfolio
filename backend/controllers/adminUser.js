const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminUser = require('../models/adminUser');

exports.adminSignUp = (req, res, next) => {
    if (req.body.adminInvitationCode !== process.env.ADMIN_INVITATION_CODE) {
        return res.status(401).json({
            success: false,
            message: 'Admin invitation code incorrect!',
        });
    }

    AdminUser.find()
        .then((users) => {
            if (users.length >= 2) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Auth failed!' });
            }

            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    return AdminUser.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                    });
                })
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: 'User created!',
                    });
                })
                .catch((err) =>
                    res.status(500).json({
                        success: false,
                        message: 'User already exist!',
                    })
                );
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Internal Error',
            });
        });
};

exports.adminSignIn = (req, res, next) => {
    let adminUser;
    AdminUser.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User doesn't exist!",
                });
            }

            adminUser = user;
            bcrypt.compare(req.body.password, user.password).then((result) => {
                if (!result) {
                    return res.status(401).json({
                        success: false,
                        message: 'Passwords Incorrect!',
                    });
                }

                const token = jwt.sign(
                    { email: adminUser.email, id: adminUser._id },
                    process.env.JWT_KEY
                );
                return res.status(200).json({
                    success: true,
                    token: token,
                    id: adminUser._id,
                    message: 'User Authorized!',
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Internal Error',
            });
        });
};

exports.updateAdminUser = (req, res, next) => {
    AdminUser.findOne({ _id: req.userData.id, email: req.userData.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User doesn't exist!",
                });
            }

            bcrypt
                .compare(
                    req.body.currentPwd ? req.body.currentPwd : '',
                    user.password
                )
                .then((result) => {
                    if (!result) {
                        return res.status(401).json({
                            success: false,
                            message: 'Passwords Incorrect!',
                        });
                    }
                    const updates = {};
                    if (req.body.username) {
                        updates.username = req.body.username;
                    }
                    if (req.body.email) {
                        updates.email = req.body.email;
                    }
                    if (req.body.newPwd) {
                        bcrypt.hash(req.body.newPwd, 10).then((hash) => {
                            updates.password = hash;
                            updateAdminUserInfo(user, updates, res);
                        });
                    } else {
                        updateAdminUserInfo(user, updates, res);
                    }
                });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Internal Error',
            });
        });
};

exports.deleteAdminUser = (req, res, next) => {
    AdminUser.deleteOne({ _id: req.userData.id, email: req.userData.email })
        .then((result) => {
            if (result.n > 0) {
                return res.status(200).json({
                    success: true,
                    message:
                        'Deleting admin user successful! ' + req.userData.email,
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'Admin user not found!' });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Deleting admin user failed!',
            });
        });
};

function updateAdminUserInfo(user, updates, res) {
    const updatedAdminUser = new AdminUser({
        _id: user._id,
        email: updates.email ? updates.email : user.email,
        username: updates.username ? updates.username : user.username,
        password: updates.password ? updates.password : user.password,
    });

    AdminUser.updateOne({ _id: user._id, email: user.email }, updatedAdminUser)
        .then((result) => {
            if (result.n > 0) {
                const token = jwt.sign(
                    {
                        email: updates.email ? updates.email : user.email,
                        id: user._id,
                    },
                    process.env.JWT_KEY
                );

                return res.status(200).json({
                    success: true,
                    token: token,
                    message:
                        'Updating admin user successful! ' + updates.email
                            ? updates.email
                            : user.email,
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'Admin user not found!' });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Email address used!',
            });
        });
}
