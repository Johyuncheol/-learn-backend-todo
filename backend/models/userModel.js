const db = require("../config/db");

const User = {
  // 사용자 조회
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

  // 사용자 생성
  async create(id, name, password) {
    const query = "INSERT INTO users (id, name, password) VALUES (?, ?, ?)";
    try {
      const [results] = await db.promise().query(query, [id, name, password]);
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
};

module.exports = User;
