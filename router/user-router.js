const express = require("express");
const router = express.Router();
const handler = require("../router-handler/user-hanler");

router.get("/login", handler.login);

router.post("/register", handler.regUser);

module.exports = router;
