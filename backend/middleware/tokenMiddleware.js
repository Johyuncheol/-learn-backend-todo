const TokenService = require("../services/TokenService");

const tokenMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    if (accessToken) {
      const decoded = await TokenService.verifyToken(accessToken, process.env.JWT_SECRET);
      req.user = { user_idx: decoded.user_idx, name: decoded.name, role: decoded.role };
      return next();
    }

    if (refreshToken) {
      const { newAccessToken, newRefreshToken } = await TokenService.refreshAccessToken(refreshToken, req);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000,
        path: "/",
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 3600 * 1000,
        path: "/",
      });

      req.user = { user_idx: decoded.user_idx, name: decoded.name, role: decoded.role };
      return next();
    }

    return res.status(401).json({ error: "토큰이 없습니다." });
  } catch (err) {
    console.error("토큰 검증 오류:", err);
    return res.status(401).json({ error: "토큰 검증 실패" });
  }
};

module.exports = tokenMiddleware;
