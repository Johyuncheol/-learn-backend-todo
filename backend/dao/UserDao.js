const db = require("../config/db");

const UserDao = {
  // 사용자 조회 (id값으로)
  async findById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [id]);
      return results;
    } catch (err) {
      console.error("User findById error:", err);
      throw err;
    }
  },

  // 사용자 조회(idx로)
  async findByUserIdx(user_idx) {
    const query = "SELECT * FROM users WHERE user_idx = ?";
    try {
      const [results] = await db.promise().query(query, [user_idx]);
      return results;
    } catch (err) {
      console.error("User findByUserIdx error:", err);
      throw err;
    }
  },

  // 사용자 생성
  async create(id, name, password, role) {
    const query =
      "INSERT INTO users (id, name, password, role) VALUES (?, ?, ?, ?)";
    try {
      const [results] = await db
        .promise()
        .query(query, [id, name, password, role]);
      return results;
    } catch (err) {
      console.error("User create error:", err);
      throw err; 
    }
  },

  // 사용자 아이디와 비밀번호 조회
  async findByIdAndPassword(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [id]);
      return results;
    } catch (err) {
      console.error("User findByIdAndPassword error:", err);
      throw err; 
    }
  },

  // 사용자의 정보 업데이트 (예: 비밀번호 변경)
  async updatePassword(id, newPassword) {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    try {
      await db.promise().query(query, [newPassword, id]);
    } catch (err) {
      console.error("User updatePassword error:", err);
      throw err;
    }
  },
};

module.exports = UserDao;
