const db = require("../db");

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    const [rows] = await db.execute(
      "SELECT id, otp, otp_expiry FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = rows[0];

    if (!user.otp || !user.otp_expiry) {
      return res.status(400).json({ message: "OTP already used or expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await db.execute(
      "UPDATE users SET is_verified = 1, otp = NULL, otp_expiry = NULL WHERE id = ?",
      [user.id]
    );

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = verifyOTP;