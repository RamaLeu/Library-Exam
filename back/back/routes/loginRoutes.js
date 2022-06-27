const express = require("express");


const {
    loginUser,
    loginSavedUser
} = require("./../controllers/loginController");

const router = express.Router();

router.route("/savedUser").post(loginSavedUser);
router.route("/").post(loginUser);

module.exports = router;