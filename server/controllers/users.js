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
      res.status(400).json({ message: "Please all fileds" });
    }
    if (userExist) {
      res.status(400).json({ message: "User already exists" });

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
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToke(user._id),
          });
        }
      }
      else {
        res.status(400).json('Invalid Email entered')
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToke(user._id),
      });
    } else {
      res.status(400).json({ message: "Not correct user" });
    }


  } catch (error) {
    res.status(400).json(error.message);
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
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully", data);
    }
    res.json('Sent Successfully')
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
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully", data);
    }
  });
  res.json({ 'otp': otp, mesg: 'OTP sent successfully again' })
}
const verifyotp = (req, res) => {
  if (req.body.otp == otp) {
    res.send("You has been successfully registered");
  }
  else {
    res.render('otp', { msg: 'otp is incorrect' });
  }
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
