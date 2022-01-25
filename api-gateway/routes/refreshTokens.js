const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/RefreshTokenController");

router.post("/", refreshToken);

module.exports = router;
