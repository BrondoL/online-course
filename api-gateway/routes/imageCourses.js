const express = require("express");
const router = express.Router();

const {
    destroy,
    store,
} = require("../controllers/ImageCourseController");

router.post("/", store);
router.delete("/:id", destroy);

module.exports = router;
