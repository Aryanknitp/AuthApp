const jwt = require("jsonwebtoken");
const db = require("../db");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const [rows] = await db.execute(
      "SELECT id FROM users WHERE id = ? AND refresh_token = ?",
      [decoded.id, refreshToken]
    );

    if (rows.length === 0)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXP }
    );

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};
module.exports = refreshToken;