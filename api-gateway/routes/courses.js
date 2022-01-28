const express = require("express");
const router = express.Router();

const {
    index,
    show,
    destroy,
    store,
    update,
} = require("../controllers/CourseController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", index);
router.get("/:id", show);
router.post("/", verifyToken, store);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, destroy);
module.exports = router;
