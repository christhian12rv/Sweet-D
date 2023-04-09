const express = require("express");
const router = express.Router();

const productsValidator = require("../middlewares/validators/products.validator");
const { verifyJWTAdmin } = require("../middlewares/jwtAdminVerify.middleware");

const productsController = require("../controllers/products.controller");

router.get("/find-by-slug/:slug", productsController.findBySlug);
router.get("/", productsController.findAll);
router.get("/find-all-by-ids", productsValidator.findAllByIds, productsController.findAllByIds);
router.post(
    "/",
    verifyJWTAdmin,
    productsValidator.create,
    productsController.create
);
router.put(
    "/",
    verifyJWTAdmin,
    productsValidator.update,
    productsController.update
);

module.exports = router;
