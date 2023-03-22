const express = require("express");
const router = express.Router();

const usersValidator = require("../middlewares/validators/users.validator");
const { verifyJWT } = require("../middlewares/jwtVerify.middleware");

const usersController = require("../controllers/users.controller");

router.get("/", usersController.findAll);

router.post("/", usersValidator.create, usersController.create);
router.post("/get-user-auth", verifyJWT, usersController.getUserAuth);
router.post("/login", usersValidator.auth, usersController.auth);
router.post("/logout", verifyJWT, usersController.logout);
router.post(
    "/recovery-password/send",
    usersValidator.sendRecoveryPasswordEmail,
    usersController.sendRecoveryPasswordEmail
);
router.post(
    "/recovery-password/verify",
    usersValidator.verifyRecoveryPasswordEmailAndToken,
    usersController.verifyRecoveryPasswordEmailAndToken
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
