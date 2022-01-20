const express = require("express");
const router = express.Router();

const cartValidator = require("../middlewares/validators/cart.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");

const cartController = require("../controllers/cart.controller");

router.post("/", verifyJWT, cartValidator.create, cartController.create);
router.put("/", verifyJWT, cartValidator.update, cartController.update);

module.exports = router;