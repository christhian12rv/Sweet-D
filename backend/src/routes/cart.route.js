const express = require("express");
const router = express.Router();

const cartValidator = require("../middlewares/validators/cart.validator");

const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getAll);
router.get("/data", cartController.getAllData);
router.post("/", cartValidator.create, cartController.create);
router.post("/clear", cartController.clear);
router.put("/", cartValidator.update, cartController.update);
router.delete("/:id", cartController.remove);

module.exports = router;
