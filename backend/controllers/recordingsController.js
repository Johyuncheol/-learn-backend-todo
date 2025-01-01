const RecordingsDAO = require("../dao/recordingDao");
const path = require("path");
const fs = require("fs");

class RecordingController {
  // 녹음 파일 업로드
  async upload(req, res) {
    try {
      // 파일이 없을 경우 에러 반환
      if (!req.file) {
        return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
      }

      const uploadPath = path.join(
        __dirname,
        "../uploads",
        req.generatedFileName
      ); // 업로드된 파일 경로

      // 데이터베이스에 파일 정보 저장
      const recordingId = await RecordingsDAO.create(
        req.generatedFileName,
        uploadPath
      );

      // 업로드 성공 응답
      res
        .status(201)
        .json({ id: recordingId, message: "녹음 파일이 업로드되었습니다." });
    } catch (err) {
      console.error("녹음 파일 업로드 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  }

  // 특정 녹음 파일 조회
  async getRecording(req, res) {
    try {
      const recordingId = req.params.id;
      const recording = await RecordingsDAO.getById(recordingId);

      if (!recording) {
        return res.status(404).json({ error: "녹음 파일을 찾을 수 없습니다." });
      }

      res.status(200).json({ recording });
    } catch (err) {
      console.error("녹음 파일 조회 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  }

  // 모든 녹음 파일 조회
  async getAllRecordings(req, res) {
    try {
      const recordings = await RecordingsDAO.getAll();
      res.status(200).json({ recordings });
    } catch (err) {
      console.error("녹음 파일 목록 조회 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  }

  // 녹음 파일 정보 수정
  async update(req, res) {
    try {
      const recordingId = req.params.id;
      const { title, description } = req.body;

      const isUpdated = await RecordingsDAO.update(
        recordingId,
        title,
        description
      );
      if (!isUpdated) {
        return res.status(404).json({ error: "녹음 파일을 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "녹음 파일 정보가 수정되었습니다." });
    } catch (err) {
      console.error("녹음 파일 수정 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  }

  // 녹음 파일 삭제
  async delete(req, res) {
    try {
      const recordingId = req.params.id;
      const recording = await RecordingsDAO.getById(recordingId);

      if (!recording) {
        return res.status(404).json({ error: "녹음 파일을 찾을 수 없습니다." });
      }

      // 파일 삭제
      fs.unlink(recording.file_path, async (err) => {
        if (err) {
          console.error("파일 삭제 오류:", err);
          return res.status(500).json({ error: "파일 삭제 실패" });
        }

        // 데이터베이스에서 삭제
        await RecordingsDAO.delete(recordingId);
        res.status(200).json({ message: "녹음 파일이 삭제되었습니다." });
      });
    } catch (err) {
      console.error("녹음 파일 삭제 오류:", err);
      res.status(500).json({ error: "서버 오류" });
    }
  }
}

module.exports = new RecordingController();
