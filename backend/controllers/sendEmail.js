const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const sendmail = require('sendmail')({ silent: false });

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    OAUTH_PLAYGROUND
);

exports.sendEmail = (req, res, next) => {
    oauth2Client.setCredentials({
        refresh_token: process.env.CLIENT_REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.CLIENT_NAME,
            pass: process.env.CLIENT_PW,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.CLIENT_REFRESH_TOKEN,
            accessToken,
        },
    });

    const mailOptions = {
        from: process.env.CLIENT_NAME,
        to: process.env.EMAIL_TO,
        subject: req.body.subject,
        html: `
            <table>
                <tr>
                    <td>
                        email: 
                    </td>
                    <td>
                        ${req.body.email}
                    </td>
                </tr>
                <tr>
                    <td>
                        name: 
                    </td>
                    <td>
                        ${req.body.firstName + ' ' + req.body.lastName}
                    </td>
                </tr>
                <tr>
                    <td>
                        message: 
                    </td>
                    <td>
                        ${req.body.message}
                    </td>
                </tr>
            </table>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'email sent failed!',
            });
        } else {
            console.log(req.body, info.response);
            res.status(201).json({
                success: true,
                message: 'email sent successfully!',
            });
        }
    });
};

exports.sendEmailFromFakeAddress = (req, res, next) => {
    console.log(process.env.FAKE_EMAIL);
    sendmail({
            from: process.env.FAKE_EMAIL,
            to: 'yh0324@sina.cn',
            subject: req.body.subject,
            html: `
            <table>
                <tr>
                    <td>
                        email: 
                    </td>
                    <td>
                        ${req.body.email}
                    </td>
                </tr>
                <tr>
                    <td>
                        name: 
                    </td>
                    <td>
                        ${req.body.firstName + ' ' + req.body.lastName}
                    </td>
                </tr>
                <tr>
                    <td>
                        message: 
                    </td>
                    <td>
                        ${req.body.message}
                    </td>
                </tr>
            </table>
        `,
        },
        (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'email sent failed!',
                });
            } else {
                console.log(info);
                res.status(201).json({
                    success: true,
                    message: 'email sent successfully!',
                });
            }
        }
    );
};