const db = require("../db");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");
const generateOTP = require("../utils/otp");
const sendOTP = require("../utils/mailer");

// signup logic //
exports.signup = async (req, res) => {
 try{
     const { name, email, password } = req.body;

  if(!name ||!email||!password) {
    return res.status(400).json({message:"All fileds are required"});
  }
  if(password.length<6){
    return res.status(400).json({message:"Password must be at least 6 character"});
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const [existingUser] = await db.execute(
    "SELECT id FROM users WHERE email =?",
     [cleanEmail]
    );
   if(existingUser.length>0){
    return res.status(400).json({message:"Email already registered"});
   }

   //Password Hash ho raha hai
 const hashedpass = await hashPassword(password);
 // generate OTP
const otp = generateOTP();
const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
await db.execute(
  "INSERT INTO users (name, email, password, otp, otp_expiry) VALUES (?,?,?,?,?)",
  [cleanName, cleanEmail, hashedpass, otp, expiry]
);

// send OTP to email
await sendOTP(cleanEmail, otp);
res.json({
  message: "Signup successful. Please verify OTP sent to email."
});
 }
catch(err){
  return res.status(500).json({message:"Internal server error"})
}
}
// Login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [cleanEmail]
    );
    console.log("User Details",rows);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
     
  if (!rows[0].is_verified) {
  return res.status(403).json({
    message: "Account Not verified. Please verify it"
  });
}
    const valid = await comparePassword(password, rows[0].password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
const accessToken = jwt.sign(
  { id: rows[0].id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.ACCESS_TOKEN_EXP }
);

const refreshToken = jwt.sign(
  { id: rows[0].id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: process.env.REFRESH_TOKEN_EXP }
);

// save refresh token in DB
await db.execute(
  "UPDATE users SET refresh_token = ? WHERE id = ?",
  [refreshToken, rows[0].id]
);

 res.cookie("accessToken", accessToken, {
        httpOnly: true,        
        secure: false,         
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    });
  res.json({
  message: "Login successful",
  accessToken,
  refreshToken
  
});
  } 
  catch (err) {
    console.log("error is",err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
