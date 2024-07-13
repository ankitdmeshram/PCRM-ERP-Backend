const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendMail = async (to, sub, text) => {
  try {
    // Email content
    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: to,
      subject: sub,
      text: text,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    console.log("Mail Sent Error");
  }
};