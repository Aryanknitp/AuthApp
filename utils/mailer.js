require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendOTP(email, otp) {
  const htmlContent = `
    <div style="font-family: Arial; padding:20px;">
      <h2 style="color: #1B5E20;">OTP Verification</h2>
      <p>This is a standard process to verify your email address.</p>
      <div style="font-size:18px; font-weight:bold;">
        Your OTP is <span style="color:#00897B;">${otp}</span>
      </div>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
    </div>
  `;

  const mailOptions = {
    from: `<${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

module.exports = sendOTP;