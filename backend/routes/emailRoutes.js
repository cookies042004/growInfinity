const express = require("express");
const OTP = require("../models/otpModel");
const sendEmail = require("../config/emailSerivce");
const router = express.Router();

// Generate and send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required." });

  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    await OTP.deleteMany({ email }); // Remove previous OTPs
    await OTP.create({ email, otp: otpCode });

    const sent = await sendEmail(email, "Your OTP Code", `Your OTP is: ${otpCode}`);
    console.log("OTP:", sent);
    console.log("OTP Code:", otpCode);  
    if (sent) {
      res.json({ success: true, message: "OTP sent successfully." });
    } else {
      res.status(500).json({ success: false, message: "Failed to send OTP." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending OTP." });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required." });

  try {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
    await OTP.deleteOne({ email });
    res.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "OTP verification failed." });
  }
});

module.exports = router;
