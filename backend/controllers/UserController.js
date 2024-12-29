const bcrypt = require("bcryptjs");
const UserDao = require("../dao/UserDao");
const SessionDao = require("../dao/SessionDao");
const TokenService = require("../services/TokenService");
const { generateJti } = require("../utils/jti");

class UserController {
  async login(req, res) {
    const { id, password } = req.body;

    if (!id || !password) {
      return res
        .status(400)
        .json({ error: "아이디와 비밀번호를 입력해주세요." });
    }

    try {
      const user = await UserDao.findById(id);
      if (!user) {
        return res.status(400).json({ error: "사용자를 찾을 수 없습니다." });
      }

      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(400).json({ error: "잘못된 비밀번호입니다." });
      }

      const jti = generateJti(user[0].user_idx);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await SessionDao.saveJti(
        user[0].user_idx,
        jti,
        req.ip,
        req.headers["user-agent"],
        expiresAt
      );

      const accessToken = await TokenService.generateAccessToken(
        user[0].user_idx,
        user[0].name,
        user[0].role
      );
      const refreshToken = await TokenService.generateRefreshToken(
        user[0].user_idx,
        jti
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000,
        path: "/",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 3600 * 1000,
        path: "/",
      });

      res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
      console.error("로그인 오류:", err);
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  }

  async logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ error: "리프레시 토큰이 없습니다." });
    }

    try {
      const decoded = await TokenService.verifyToken(
        refreshToken,
        process.env.JWT_SECRET_REFRESH
      );
      const { jti } = decoded;

      await SessionDao.deleteJti(jti);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.status(200).json({ message: "로그아웃 성공" });
    } catch (err) {
      console.error("로그아웃 오류:", err);
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  }

  async register(req, res) {
    const { id, name, password, role } = req.body;

    if (!id || !name || !password || !role) {
      return res.status(400).json({ error: "모든 필드를 입력해주세요." });
    }

    try {
      const existingUser = await UserDao.findById(id);
      if (existingUser) {
        return res.status(400).json({ error: "이미 존재하는 아이디입니다." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserDao.create({ id, name, password: hashedPassword, role });

      res.status(201).json({ message: "회원가입 성공" });
    } catch (err) {
      console.error("회원가입 오류:", err);
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  }

  checkAuth(req, res) {
    console.log(req.user)
    res.status(200).json({ user: req.user });
  }
}

module.exports = new UserController();
