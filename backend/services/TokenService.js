const jwt = require("jsonwebtoken");
const SessionDao = require("../dao/SessionDao");
const UserDao = require("../dao/UserDao");

class TokenService {
  static async generateAccessToken(user_idx, name, role) {
    return jwt.sign({ user_idx, name, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  static async generateRefreshToken(user_idx, jti) {
    return jwt.sign({ user_idx, jti }, process.env.JWT_SECRET_REFRESH, {
      expiresIn: "7d",
    });
  }

  static async verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  static async refreshAccessToken(refreshToken, req) {
    const decodedRefresh = await TokenService.verifyToken(
      refreshToken,
      process.env.JWT_SECRET_REFRESH
    );
    const { jti, user_idx } = decodedRefresh;

    const session = await SessionDao.getByJti(jti);
    if (!session.length) {
      throw new Error("유효하지 않은 리프레시 토큰");
    }

    const { expires_at, ip_address, user_agent } = session[0];
    if (new Date(expires_at) < new Date()) {
      throw new Error("리프레시 토큰 만료됨");
    }

    if (ip_address !== req.ip || user_agent !== req.headers["user-agent"]) {
      throw new Error("의심스러운 요청");
    }

    const user = await UserDao.findByUserIdx(user_idx);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const { name, role } = user;
    const newAccessToken = await TokenService.generateAccessToken(
        user_idx,
      name,
      role
    );

    const newJti = `${user_idx}-${Date.now()}`;
    const newRefreshToken = await TokenService.generateRefreshToken(
        user_idx,
      newJti
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await SessionDao.saveJti(
        user_idx,
      newJti,
      req.ip,
      req.headers["user-agent"],
      expiresAt
    );

    return { newAccessToken, newRefreshToken };
  }
}

module.exports = TokenService;
