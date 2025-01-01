const express = require("express");
const RecordingController = require("../controllers/recordingsController");
const multer = require("multer");
const path = require("path");

// Multer 설정 (파일 저장 위치와 파일 이름 설정)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads"); // 업로드 디렉토리 경로
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    try {
      // URL 인코딩된 파일 이름을 디코딩
      const decodedFileName = decodeURIComponent(file.originalname);

      // UTF-8로 제대로 디코딩 처리
      const utf8FileName = Buffer.from(decodedFileName, "latin1").toString(
        "utf8"
      );

      const timestamp = Date.now(); // 파일 이름에 타임스탬프
      const finalFileName = `${timestamp}_${utf8FileName}`;

      req.generatedFileName = finalFileName;

      cb(null, finalFileName);
    } catch (err) {
      console.error("Error generating file name:", err);
      cb(err);
    }
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// 파일 업로드 처리
router.post("/", upload.single("file"), RecordingController.upload); // 파일 업로드 시 'file'이라는 필드 이름을 사용

// 녹음 파일 조회
router.get("/:id", RecordingController.getRecording);

// 모든 녹음 파일 조회
router.get("/", RecordingController.getAllRecordings);

// 녹음 파일 정보 수정
router.put("/:id", RecordingController.update);

// 녹음 파일 삭제
router.delete("/:id", RecordingController.delete);

module.exports = router;
