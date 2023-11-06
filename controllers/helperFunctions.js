const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
};

const sendVerifyEmail = async (name, email, otp) => {
  console.log('Sending Verifying Email.....');
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'AW VERIFICATION PROCESS',
      html: `<p>Hi ${name}, your OTP is: <strong>${otp}</strong>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email (OPT) has been sent !!');
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  securePassword,
  generateOTP,
  sendVerifyEmail,
};
