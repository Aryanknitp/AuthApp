const express = require("express");
const router = express.Router();

const authLimit = require("./middleware/ratelimit");
const authMiddleware = require("../middleware/authmiddleware");
const { signup, login } = require("../controllers/authcontroller");
const verifyOTP = require("../controllers/otpcontroller");
const resendOTP = require("../controllers/resendotp");
const refreshToken = require("../controllers/refreshToken");
const getUserProfile = require("../controllers/usercontroller");
// console.log(signup);
router.post("/signup", authLimit, signup);

router.post("/verify-otp", verifyOTP);

// console.log(resendOTP);
router.post("/resend-otp", resendOTP);

router.post("/login", authLimit, login);

router.post("/refresh-token", refreshToken);


router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;