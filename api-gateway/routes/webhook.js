const express = require("express");
const router = express.Router();

const { store } = require("../controllers/WebhookController");

router.post("/midtrans", store);

module.exports = router;
