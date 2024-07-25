const express = require('express');
const router = express.Router();

const leadController = require("../controllers/leadController");

router.post("/criar", leadController.criarLead);
router.get("/", leadController.obterLeads);



module.exports = router;