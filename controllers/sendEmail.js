const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/sendEmail', (req, res) => {
    sendMail(req, res);
})

async function sendMail(req, res) {
    const output = `
    <h3>New message received from the website</h3>
    <h3>Message</h3>
        <p>${req.body.message}</a></p>
    <h3>Contact Details</h3>
    <ul>
        <li style='list-style: none;'> <b>Name</b>: ${req.body.name}</li>
        <li style='list-style: none;'> <b>Email</b>:  ${req.body.email}</li>
        <li style='list-style: none;'> <b>Phone</b>:  ${req.body.phone}</li>
    </ul>
    </br></br></br>
    Warm Regards<br>
    This email was sent from Siyabonga's Portfolio Website
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.webgooru.co.za",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "contact@webgooru.co.za", // generated ethereal user
            pass: "Onyinyechukwu#98", // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: true,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: req.body.email, // sender address
        to: "siyabonga@webgooru.co.za", // list of receivers
        subject: req.body.subject, // Subject line
        html: output // html body
    });

    if (info.messageId) {
        console.log("Message sent: %s", info.messageId);
        res.send({ msg: "Email sent successfully" });
    } else {
        res.status(500).send({ msg: "Email not sent, try again later." });
    }
}

module.exports = router;