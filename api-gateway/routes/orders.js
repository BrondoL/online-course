const express = require("express");
const router = express.Router();

const { index } = require("../controllers/OrderController");

router.get("/", index);

module.exports = router;
