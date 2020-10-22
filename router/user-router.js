const express = require("express");
const router = express.Router();
const handler = require("../router-handler/user-handler");
const expressJoi = require("@escook/express-joi");
const { reg_login_scheme } = require("../schema/user");

router.post("/login", expressJoi(reg_login_scheme), handler.login);

router.post("/register", expressJoi(reg_login_scheme), handler.regUser);

module.exports = router;