const express = require("express");
const router = express.Router();

const { destroy, store, update } = require("../controllers/ReviewController");

router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
