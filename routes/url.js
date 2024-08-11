const express = require("express");
const { newShortURL, getAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/", newShortURL);
router.get("/analytics/:shortId", getAnalytics);
module.exports = router;
