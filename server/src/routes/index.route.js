const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.controller");

router.get("/dashboard", indexController.getDashboard);

module.exports = router;
