const express = require("express");
const router = express.Router();

const usersValidator = require("../middlewares/validators/users.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");

const usersController = require("../controllers/users.controller");

router.get("/", usersController.findAll);
router.post("/", usersValidator.create, usersController.register);
router.post("/get-user-auth", usersController.getUserAuth);

router.post(
    "/address",
    verifyJWT,
    usersValidator.address,
    usersController.updateAddress
);
router.post("/login", usersController.login);
router.post("/logout", verifyJWT, usersController.logout);
router.post(
    "/recovery-password",
    usersValidator.recoveryPassword,
    usersController.recoveryPassword
);
router.post(
    "/recovery-password/change/verify",
    usersValidator.getRecoveryPasswordChange,
    usersController.getRecoveryPasswordChange
);
router.post(
    "/recovery-password/change",
    usersValidator.recoveryPasswordChange,
    usersController.recoveryPasswordChange
);
router.post(
    "/delete",
    verifyJWT,
    usersValidator.delete,
    usersController.delete
);
router.post(
    "/contact",
    usersValidator.contactSendEmail,
    usersController.contactSendEmail
);
router.put("/", verifyJWT, usersValidator.update, usersController.update);

module.exports = router;
