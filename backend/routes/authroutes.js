const express = require("express");
const router = express.Router();

const authController = require("../controller/authcontroller");
const verifyToken = require("../middlewares/authmiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/users",verifyToken,authController.getAllUsers);

router.put("/users/update-password", verifyToken, authController.updatePassword);
router.put("/users/:id",verifyToken,authController.updateUser);

router.get("/user", verifyToken, authController.getUser);

router.delete("/users/:id",verifyToken,authController.deleteUser);


module.exports = router;
