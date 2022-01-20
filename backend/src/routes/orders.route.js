const express = require("express");
const router = express.Router();

const ordersValidator = require("../middlewares/validators/orders.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");
const { verifyJWTAdmin } = require("../middlewares/jwtAdminVerify.middleware");

const ordersController = require("../controllers/orders.controller");

router.get("/", verifyJWT, ordersController.findAllByUser);
router.post("/", verifyJWT, ordersValidator.create, ordersController.create);
router.put("/", verifyJWTAdmin, ordersValidator.update, ordersController.update);

module.exports = router;