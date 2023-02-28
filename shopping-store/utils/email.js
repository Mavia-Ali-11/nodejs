const nodemailer = require("nodemailer");

const emailSender = async request => {
    const transpoter = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
    });

    const mailOptions = {
        from: "Mavia Ali <maviaali.ma@gmail.com>",
        to: request.email,
        subject: request.subject,
        text: request.message,
        // html: <h1></h1>
    };

    await transpoter.sendMail(mailOptions);
}

module.exports = emailSender;