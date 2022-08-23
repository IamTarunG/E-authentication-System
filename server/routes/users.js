const express = require("express");
const userRouter = express.Router();
const { signUpUser, loginUser, getMe, sendOTP, resendotp, verifyotp } = require("../controllers/users.js");
const protect = require("../middleware/auth.js");
userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
userRouter.get('/sendotp', protect, sendOTP)
userRouter.get('/resendotp', protect, resendotp)
userRouter.post('/verifyotp', protect, verifyotp)
module.exports = userRouter;
