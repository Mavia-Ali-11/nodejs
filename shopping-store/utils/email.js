const nodemailer = require("nodemailer");

const emailSender = async request => {
    let testAccount = await nodemailer.createTestAccount();

    const transpoter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'margaretta.krajcik39@ethereal.email',
            pass: '1nPgw2YsQypCfGmb1u'
        }
    });

    const mailOptions = {
        from: "Mavia Ali <maviaali.ma@gmail.com>",
        to: request.email,
        subject: request.subject,
        text: request.message,
        // html: <h1></h1>
    };

    await transpoter.sendMail(mailOptions, (err, info) => console.log(err, info));
}

module.exports = emailSender;