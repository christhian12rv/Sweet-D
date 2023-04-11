const express = require("express");
const router = express.Router();

const ordersValidator = require("../middlewares/validators/orders.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");
const { verifyJWTAdmin } = require("../middlewares/jwtAdminVerify.middleware");

const ordersController = require("../controllers/orders.controller");

router.get("/", ordersController.findAll);
router.get("/:id", ordersController.findByPk);
router.get("/find-by-year-and-month/:year/:month", ordersController.findAllByYearAndMonth);
router.post("/user", verifyJWT, ordersController.findAllByUser);
router.post("/", verifyJWT, ordersValidator.create, ordersController.create);
router.put(
    "/finish",
    verifyJWTAdmin,
    ordersValidator.updateFinish,
    ordersController.updateFinish
);

module.exports = router;
