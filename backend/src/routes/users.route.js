const express = require("express");
const router = express.Router();

const usersValidator = require("../middlewares/validators/users.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");

const usersController = require("../controllers/users.controller");

router.get("/", usersController.find);
router.post("/", usersValidator.create, usersController.register);

router.post("/login", usersController.login);
router.post("/logout", verifyJWT, usersController.logout);

module.exports = router;