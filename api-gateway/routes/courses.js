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
const can = require("../middlewares/permission");

router.get("/", index);
router.get("/:id", show);
router.post("/", verifyToken, can('admin'), store);
router.put("/:id", verifyToken, can("admin"), update);
router.delete("/:id", verifyToken, can("admin"), destroy);
module.exports = router;
