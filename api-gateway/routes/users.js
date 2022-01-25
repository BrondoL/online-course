const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const {
    register,
    login,
    update,
    getUser,
    logout,
} = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/", verifyToken, update);
router.get("/", verifyToken, getUser);

module.exports = router;
