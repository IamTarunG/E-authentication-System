const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const nodemailer = require('nodemailer');
const otpGenerator = require("otp-generator")
const { checkSingle } = require('@reacherhq/api');
// const { Auth } = require("two-step-auth"); 
const genOTP = () => {

  // let otp = Math.random();
  // otp = otp * 1000000;
  // otp = parseInt(otp);
  // console.log(otp);
  // return otp
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, specialChars: false });

}
let otp
const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const result = await checkSingle({ to_email: email })
  try {
    const userExist = await User.findOne({ email: email });
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please all fileds" });
    }
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });

    } else {
      if (result.is_reachable === 'safe') {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        if (user) {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToke(user._id),
          });
        }
      }
      else {
        return res.status(400).json('Invalid Email entered')
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToke(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }


  } catch (error) {
    return res.status(400).json(error.message);
  }
});

const sendOTP = (req, res) => {
  console.log(req.user.email)
  otp = genOTP()
  console.log(otp)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });
  let mailOptions = {
    from: "tarungudipalli5@gmail.com",
    to: req.user.email,
    subject: 'Your OTP is',
    text: `Your otp is ${otp}`
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return res.json(400).json({ msg: "Cannot send", err: err })
    }
    console.log("Email sent successfully", data);

    return res.status(200).json({ msg: 'OTP sent successfully', otp })
  });
}
const resendotp = (req, res) => {
  console.log(req.user.email)
  otp = genOTP()
  console.log(otp)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });
  let mailOptions = {
    from: "tarungudipalli5@gmail.com",
    to: req.user.email,
    subject: 'Your OTP is',
    text: `Your otp is ${otp}`
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return res.json(400).json({ msg: "Cannot send", err: err })
    } else {
      console.log("Email sent successfully", data);
      return res.status(200).json({ 'otp': otp, msg: 'OTP sent successfully again' })
    }
  });
}
const verifyotp = (req, res) => {


  if (req.body.otp === otp) {
    return res.status(200).json("You have been successfully registered");
  }


  return res.status(400).json({ msg: 'otp is incorrect' });





}
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
const generateToke = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};


module.exports = {
  signUpUser,
  loginUser,
  getMe,
  sendOTP,
  resendotp,
  verifyotp
};
