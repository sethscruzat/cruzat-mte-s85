const express = require("express");
const router = express.Router();

const {verify} = require("../middleware/auth.js")
const userController = require("../controllers/userController.js")

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.getUserDetails);

module.exports = router;