const express = require("express");


const {
    registerUser, editUser
} = require("./../controllers/registrationController");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/:id").put(editUser);

module.exports = router;