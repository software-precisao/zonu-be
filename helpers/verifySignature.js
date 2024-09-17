require('dotenv').config();
const crypto = require('crypto');
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;

function verifyRequestSignature(req, res, next) {
    console.log('verifyRequestSignature');
    const signature = req.headers['x-hub-signature-256'];
    if (signature && signature.startsWith('sha256=')) {
      const signatureHash = signature.slice(7);
      const payload = JSON.stringify(req.body);
      const computedHash = crypto.createHmac('sha256', APP_SECRET)
                                 .update(payload)
                                 .digest('hex');
  
      if (crypto.timingSafeEqual(Buffer.from(signatureHash, 'hex'), Buffer.from(computedHash, 'hex'))) {
        return next();
      }
    }
    res.status(400).send('Invalid signature');
  }

module.exports = verifyRequestSignature;
