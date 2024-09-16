const { Router } = require('express');

const WebhooksController = require('../controllers/WebhooksController');

const router = Router();

const verifyRequestSignature = require("../helpers/verifySignature");


router.get('/facebook-webhook', WebhooksController.handleWebhookGet);
router.post('/facebook-webhook', verifyRequestSignature, WebhooksController.handleWebhookPost);

module.exports = router;