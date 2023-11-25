const express = require("express");
const jwt = require("jsonwebtoken");
const Guest = require("../models/Guest");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

const generateTokens = (guestId) => {
  const accessToken = jwt.sign({ id: guestId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Access token with short expiry
  });
  const refreshToken = jwt.sign(
    { id: guestId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "100d", // Refresh token with longer expiry
    }
  );
  return { accessToken, refreshToken };
};

router.post("/send-code", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "whatsapp" });

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  (message) => console.log(message.sid);
});

router.post("/verify-code", async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verificationCheck = await client.verify
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: phoneNumber, code });

    let guest = await Guest.findOne({ phoneNumber: phoneNumber });
    if (!guest) {
      guest = new Guest({ name, email, phoneNumber, dob });
      await guest.save();
      message = "New user created.";
    } else {
      message = "User already exists.";
    }

    if (verificationCheck.status === "approved") {
      res.send({ verified: true, message });
    } else {
      res.send({ verified: false, message });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/register-login", async (req, res) => {
  const { name, email, phoneNumber, dob } = req.body;

  // Check for required fields
  if (!phoneNumber) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    let guest = await Guest.findOne({ phoneNumber: phoneNumber });
    if (!guest) {
      guest = new Guest({ name, email, phoneNumber, dob });
      await guest.save();
      message = "New user created.";
    } else {
      message = "User already exists.";
    }

    const { accessToken, refreshToken } = generateTokens(guest._id);
    guest.token = { access: accessToken, refresh: refreshToken };
    await guest.save();

    res.send({ accessToken, refreshToken, message });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh Token is required.");
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const guest = await Guest.findById(decoded.id);
    if (guest && guest.tokens.refresh === refreshToken) {
      const { accessToken, newRefreshToken } = generateTokens(guest._id);
      guest.tokens = { access: accessToken, refresh: newRefreshToken };
      await guest.save();
      res.send({ accessToken, refreshToken: newRefreshToken });
    } else {
      res.status(403).send("Invalid refresh token.");
    }
  } catch (error) {
    res.status(403).send("Invalid refresh token.");
  }
});

module.exports = router;
