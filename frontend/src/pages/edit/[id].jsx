import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditRecording({ recording }) {
  const [title, setTitle] = useState(recording.file_name);
  const [description, setDescription] = useState(recording.description);
  const router = useRouter();

  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/api/recordings/${recording.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      }
    );

    if (res.ok) {
      alert("수정 완료");
      router.push(`/`);
    } else {
      alert("수정 실패");
    }
  };

  return (
    <div>
      <h1>녹음 파일 수정</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
      />
      <button onClick={handleUpdate}>수정 완료</button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/recordings/${params.id}`);
  const data = await res.json();
  return { props: { recording: data.recording } };
}
