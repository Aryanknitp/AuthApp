const db = require("../../db");
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const [rows] = await db.execute(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("USER DATA ", rows[0]); 
    res.json({
      message: "User fetched successfully",
      user: rows[0]
    });

  } catch (err) {
    console.error("FETCH USER ERROR ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = getUserProfile;

