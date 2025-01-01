import Link from "next/link";

export default function RecordingList({ recordings }) {
  return (
    <ul>
      {recordings.map((recording) => (
        <li key={recording.id}>
          <Link href={`/${recording.id}`}>
            <a>{recording.file_name}</a>
          </Link>
          <Link href={`/edit/${recording.id}`}>
            <a style={{ marginLeft: "10px" }}>수정</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
