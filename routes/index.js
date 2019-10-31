const indexController = require("../controllers/indexController");
const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", indexController.GetIndex);

module.exports = router;
