const express = require("express");
const router = express.Router();

const { refreshToken } = require("../controllers/RefreshTokenController");

router.post("/", refreshToken);

module.exports = router;
