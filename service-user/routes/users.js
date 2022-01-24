const express = require("express");
const router = express.Router();

const {
    register,
    login,
    update,
    index,
} = require("../controllers/UserController");

router.get("/:id", index);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", update);

module.exports = router;
