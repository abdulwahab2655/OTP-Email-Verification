const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const {
  securePassword,
  generateOTP,
  sendVerifyEmail,
} = require('./helperFunctions');

const otpMap = new Map(); // Store OTPs temporarily for verification

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error('Invalid Name Entered');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error('Invalid Email Entered');
    } else if (password.length < 6) {
      throw Error('Password is too Short');
    } else {
      const Hashpassword = await securePassword(password);

      const user = {
        name: name,
        email: email,
        password: Hashpassword,
      };
      const newUser = await User.create(user);

      const otp = generateOTP();
      otpMap.set(email, otp); // Store OTP temporarily

      sendVerifyEmail(name, email, otp);
      res.status(StatusCodes.OK).json({ newUser });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, userOTP } = req.body;
    const storedOTP = otpMap.get(email);

    if (!storedOTP) {
      throw Error('OTP not found. Please request a new OTP.');
    }

    if (parseInt(userOTP) !== storedOTP) {
      throw Error('Invalid OTP. Please try again.');
    }

    otpMap.delete(email); // Remove OTP after successful verification

    // Mark the email as verified in your user data or database
    const user = await User.findOne({ email });
    if (user) {
      user.isVerified = true;
      await user.save();
    }

    res.status(StatusCodes.OK).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  verifyEmail,
};
