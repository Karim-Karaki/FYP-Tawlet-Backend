const express = require("express");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

router.post("/send-code", async (req, res) => {

  const phoneNumber = req.body.phoneNumber;
    
  try {
      await client.verify.v2.services(verifySid)
          .verifications.create({ to: phoneNumber, channel: 'whatsapp' });
      
      res.send({ success: true });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }((message) => console.log(message.sid));

});

router.post("/verify-code", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const code = req.body.code;
  
  try {
      const verificationCheck = await client.verify.v2.services(verifySid)
          .verificationChecks.create({ to: phoneNumber, code: code });
      
      if (verificationCheck.status === 'approved') {
          res.send({ verified: true });
      } else {
          res.send({ verified: false });
      }
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

module.exports = router;
