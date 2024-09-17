const { Router } = require('express');

const FacebookController = require('../controllers/FacebookController');

const router = Router();



router.post('/callback', FacebookController.callback);
router.get('/facebook-leads', FacebookController.getLeads);

module.exports = router;