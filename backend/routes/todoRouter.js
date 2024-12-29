// routes/todoRoutes.js
const express = require("express");
const todoController = require("../controllers/TodoController");
const tokenMiddleware = require("../middleware/tokenMiddleware");

const router = express.Router();

// 인증된 사용자만 접근할 수 있도록 tokenMiddleware 적용
router.use(tokenMiddleware); // 모든 todo 관련 라우터에 인증을 요구

// 할 일 목록 조회
router.get("/", todoController.getTodos);

// 할 일 추가
router.post("/", todoController.create);

// 할 일 수정
router.put("/:id", todoController.update);

// 할 일 삭제
router.delete("/:id", todoController.delete);

module.exports = router;
