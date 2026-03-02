const db = require("../db");
const generateOTP = require("../utils/otp");
const sendOTP = require("../utils/mailer");

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const cleanEmail = email.trim().toLowerCase();

    const [rows] = await db.execute(
      "SELECT id, is_verified FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "User not found" });

    if (rows[0].is_verified)
      return res.status(400).json({ message: "Email already verified" });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await db.execute(
      "UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?",
      [otp, expiry, rows[0].id]
    );

    await sendOTP(cleanEmail, otp);

    res.json({ message: "OTP resent successfully" });

  } catch (err) {
    console.error("RESEND OTP ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = resendOTP;