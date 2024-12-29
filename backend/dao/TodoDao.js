const db = require("../config/db");

class TodoDao {
  // 사용자별 할 일 목록 조회
  async getByUserId(userId) {
    const query = "SELECT * FROM todos WHERE user_id = ?";
    try {
      const [results] = await db.promise().query(query, [userId]);
      return results;
    } catch (err) {
      console.error("TodoDao getByUserId error:", err);
      throw err; 
    }
  }

  // 할 일 추가
  async create(userId, title, description) {
    const query = "INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)";
    try {
      const [results] = await db.promise().query(query, [userId, title, description]);
      return results;
    } catch (err) {
      console.error("TodoDao create error:", err);
      throw err; 
    }
  }

  // 할 일 수정
  async update(todoId, title, description) {
    const query = "UPDATE todos SET title = ?, description = ? WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [title, description, todoId]);
      return results;
    } catch (err) {
      console.error("TodoDao update error:", err);
      throw err; 
    }
  }

  // 할 일 삭제
  async delete(todoId) {
    const query = "DELETE FROM todos WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [todoId]);
      return results;
    } catch (err) {
      console.error("TodoDao delete error:", err);
      throw err; 
    }
  }
}

module.exports = new TodoDao();
