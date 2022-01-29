const express = require("express");
const router = express.Router();

const {
    index,
    show,
    destroy,
    store,
    update,
} = require("../controllers/ChapterController");

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
