const db = require("../config/db");

class RecordingsDAO {
  // 녹음 파일 정보 조회 (ID로)
  async getById(id) {
    const query = "SELECT * FROM recordings WHERE file_name = ?";
    try {
      const [results] = await db.promise().query(query, [id]);
      return results;
    } catch (err) {
      console.error("RecordingsDAO getById error:", err);
      throw err;
    }
  }

  // 모든 녹음 파일 조회
  async getAll() {
    const query = "SELECT * FROM recordings";
    try {
      const [results] = await db.promise().query(query);
      return results;
    } catch (err) {
      console.error("RecordingsDAO getAll error:", err);
      throw err;
    }
  }

  // 녹음 파일 정보 수정
  async update(id, title, description) {
    const query = `
      UPDATE recordings
      SET title = ?, description = ?
      WHERE id = ?
    `;
    try {
      const [results] = await db
        .promise()
        .query(query, [title, description, id]);
      return results;
    } catch (err) {
      console.error("RecordingsDAO update error:", err);
      throw err;
    }
  }

  // 녹음 파일 삭제
  async delete(id) {
    const query = "DELETE FROM recordings WHERE id = ?";
    try {
      const [results] = await db.promise().query(query, [id]);
      return results;
    } catch (err) {
      console.error("RecordingsDAO delete error:", err);
      throw err;
    }
  }

  // 녹음 파일 저장
  async create(fileName, filePath) {
    const query = `
      INSERT INTO recordings (file_name, file_path)
      VALUES (?, ?)
    `;
    try {
      const [results] = await db.promise().query(query, [fileName, filePath]);
      return results;
    } catch (err) {
      console.error("RecordingsDAO create error:", err);
      throw err;
    }
  }
}

module.exports = new RecordingsDAO();
