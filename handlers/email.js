const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

var transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
});

// send mail with defined transport object
let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: "correo@correo.com",
    subject: "Password Reset",
    text: "Hola",
    html: "<b>hola</b>",
};

transport.sendMail(mailOptions);