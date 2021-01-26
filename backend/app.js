const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const imagesRoutes = require('./routes/images');
const adminUserRoutes = require('./routes/adminUser');

const app = express();

mongoose
    .connect(
        'mongodb+srv://HanYang:' +
            process.env.MONGO_ATLAS_PW +
            '@cluster0-f5gmq.mongodb.net/rest?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

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

// app.use((req, res, next) => {
//     res.send('express test');
// });

module.exports = app;
