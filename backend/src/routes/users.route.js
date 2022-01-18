const express = require("express");
const router = express.Router();

const usersValidator = require("../middlewares/validators/users.validator");

const usersController = require("../controllers/users.controller");

router.get("/", usersController.list)
router.post("/", usersValidator.create, usersController.register);

module.exports = router;