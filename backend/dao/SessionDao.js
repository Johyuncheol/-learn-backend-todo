const db = require("../config/db");

class SessionDao {
  // 세션 조회 (IP와 User-Agent 포함)
  async getByUserAgentAndIp(user_idx, ipAddress, userAgent) {
    const query = `
      SELECT * FROM user_sessions
      WHERE user_idx = ? AND ip_address = ? AND user_agent = ?
    `;
    try {
      const [results] = await db.promise().query(query, [user_idx, ipAddress, userAgent]);
      return results;
    } catch (err) {
      console.error("SessionDao getByUserAgentAndIp error:", err);
      throw err;
    }
  }

  // 세션 만료 시간 갱신
  async updateSession(jti, expiresAt) {
    const query = `
      UPDATE user_sessions
      SET expires_at = ?
      WHERE jti = ?
    `;
    try {
      const [results] = await db.promise().query(query, [expiresAt, jti]);
      return results;
    } catch (err) {
      console.error("SessionDao updateSession error:", err);
      throw err;
    }
  }

  // jti 저장 (IP와 User-Agent 포함)
  async saveJti(user_idx, jti, ipAddress, userAgent, expiresAt) {
    const query = `
      INSERT INTO user_sessions (user_idx, jti, ip_address, user_agent, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      const [results] = await db.promise().query(query, [user_idx, jti, ipAddress, userAgent, expiresAt]);
      return results;
    } catch (err) {
      console.error("SessionDao saveJti error:", err);
      throw err;
    }
  }

  // jti로 세션 조회
  async getByJti(jti) {
    const query = "SELECT * FROM user_sessions WHERE jti = ?";
    try {
      const [results] = await db.promise().query(query, [jti]);
      return results;
    } catch (err) {
      console.error("SessionDao getByJti error:", err);
      throw err;
    }
  }

  // jti 삭제
  async deleteJti(jti) {
    const query = "DELETE FROM user_sessions WHERE jti = ?";
    try {
      const [results] = await db.promise().query(query, [jti]);
      return results;
    } catch (err) {
      console.error("SessionDao deleteJti error:", err);
      throw err;
    }
  }

  // 만료된 세션 삭제
  async deleteExpiredSessions() {
    const query = "DELETE FROM user_sessions WHERE expires_at < NOW()";
    try {
      const [results] = await db.promise().query(query);
      return results;
    } catch (err) {
      console.error("SessionDao deleteExpiredSessions error:", err);
      throw err;
    }
  }
}

module.exports = new SessionDao();
