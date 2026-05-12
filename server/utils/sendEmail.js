const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another service provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: `Portfolio Contact Form <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
