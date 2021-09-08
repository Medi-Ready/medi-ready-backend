const express = require("express");
const router = express.Router();

const loginController = require("./controllers/login.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/api/login", loginController.login);
router.post("/api/logout", loginController.logout);
router.get("/api/auth-check", verifyToken, loginController.authorize);

module.exports = router;
