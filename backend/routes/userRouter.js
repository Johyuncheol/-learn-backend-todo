const express = require("express");
const userController = require("../controllers/UserController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

const router = express.Router();

// 로그인
router.post("/login", userController.login);

// 로그아웃
router.post("/logout", userController.logout);

// 회원가입
router.post("/register", userController.register);

// 인증이 필요한 라우트
router.use(tokenMiddleware);

// 권한 확인
router.get("/check_auth", userController.checkAuth);

module.exports = router;
