import RecordingList from "../components/RecordingList";

export default function Record({ recordings }) {
  return (
    <div>
      <h1>녹음 파일 목록</h1>
      <RecordingList recordings={recordings} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/api/recordings");
  const data = await res.json();
  return { props: { recordings: data.recordings } };
}
