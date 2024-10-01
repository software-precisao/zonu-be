const { Router } = require('express');

const FacebookController = require('../controllers/FacebookController');

const router = Router();



router.post('/callback', FacebookController.callback);
router.get('/facebook-leads', FacebookController.getLeads);
router.post('/logout', FacebookController.logout); 

module.exports = router;