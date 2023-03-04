const nodemailer = require("nodemailer");
const config = require('./config');
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPassword,
    },
});

module.exports = { transporter, nodemailerEmail: config.nodemailerUser };
