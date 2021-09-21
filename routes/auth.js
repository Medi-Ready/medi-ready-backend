const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { login, logout, authorize } = require("../controllers/auth.controller");

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", verifyToken, authorize);

module.exports = router;
