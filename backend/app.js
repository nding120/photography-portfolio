const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const imagesRoutes = require('./routes/images');
const adminUserRoutes = require('./routes/adminUser');
const sendEmailRoutes = require('./routes/sendEmail');

const app = express();

mongoose
    .connect(process.env.MONGO_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(path.join(__dirname, './images'))));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/images', imagesRoutes);
app.use('/api/admin-user', adminUserRoutes);
app.use('/api/send-email', sendEmailRoutes);

module.exports = app;
