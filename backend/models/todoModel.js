const db = require("../config/db");

const Todo = {
  // 할 일 추가
  async create(userId, title, description) {
    const query = "INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)";
    try {
      const [results] = await db.promise().query(query, [userId, title, description]);
      return results;
    } catch (err) {
      console.error("Todo create error:", err);
      throw err; 
    }
  },

  // 사용자별 할 일 목록 조회
  async findAllByUserId(userId) {
    const query = "SELECT * FROM todos WHERE user_id = ?";
    try {
      const [results] = await db.promise().query(query, [userId]);
      return results;
    } catch (err) {
      console.error("Todo findAllByUserId error:", err);
      throw err; 
    }
  },

  // 할 일 삭제
  async deleteById(id) {
    const query = "DELETE FROM todos WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [id]);
      return results;
    } catch (err) {
      console.error("Todo deleteById error:", err);
      throw err; 
    }
  },
};

module.exports = Todo;
