const express = require("express");
const { handleGenerateNewShortURL,handleSingleUrl,handleAnalytictsUrl } = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortID", handleSingleUrl);
router.get("/analytics/:shortID", handleAnalytictsUrl);
module.exports = router;
