const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

router.post("/register", validator.registrationValidation, userController.Register);
router.post("/login", validator.loginValidation, userController.Login);
router.get("/user",auth.authentication, userController.getUsers);


module.exports = router;