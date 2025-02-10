const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require("../firebase.json")), // Path to your Firebase Admin SDK JSON file
});

// Route to verify OTP (Firebase)
router.post("/verify-otp", async (req, res) => {
  const { verificationId, otp } = req.body;

  try {
    // Verify OTP
    const phoneCredential = admin.auth.PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await admin.auth().signInWithCredential(phoneCredential);
    res.json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: "OTP verification failed." });
  }
});

module.exports = router;
