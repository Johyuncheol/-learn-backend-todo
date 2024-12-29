const TodoDao = require("../dao/TodoDao");

class TodoController {
  // 사용자별 할 일 목록 조회
  getTodos(req, res) {
    const user_idx = req.user_idx;  // Token에서 userId 추출

    TodoDao.getByUserId(user_idx)
      .then((todos) => {
        res.status(200).json({ todos });
      })
      .catch((err) => {
        console.error("할 일 목록 조회 오류:", err);
        res.status(500).json({ error: "서버 오류" });
      });
  }

  // 할 일 추가
  create(req, res) {
    const { title, description } = req.body;
    const user_idx = req.user_idx;  // Token에서 userId 추출

    TodoDao.create(user_idx, title, description)
      .then(() => {
        res.status(201).json({ message: "할 일이 추가되었습니다." });
      })
      .catch((err) => {
        console.error("할 일 추가 오류:", err);
        res.status(500).json({ error: "서버 오류" });
      });
  }

  // 할 일 수정
  update(req, res) {
    const { title, description } = req.body;
    const todoId = req.params.id;

    TodoDao.update(todoId, title, description)
      .then(() => {
        res.status(200).json({ message: "할 일이 수정되었습니다." });
      })
      .catch((err) => {
        console.error("할 일 수정 오류:", err);
        res.status(500).json({ error: "서버 오류" });
      });
  }

  // 할 일 삭제
  delete(req, res) {
    const todoId = req.params.id;

    TodoDao.delete(todoId)
      .then(() => {
        res.status(200).json({ message: "할 일이 삭제되었습니다." });
      })
      .catch((err) => {
        console.error("할 일 삭제 오류:", err);
        res.status(500).json({ error: "서버 오류" });
      });
  }
}

module.exports = new TodoController();
