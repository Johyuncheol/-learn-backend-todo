import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file); // 반드시 'file'로 설정

    const res = await fetch("http://localhost:8080/api/recordings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("파일 업로드 성공!");
    } else {
      alert("파일 업로드 실패");
    }
  };

  return (
    <div>
      <h1>녹음 파일 업로드</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
}
