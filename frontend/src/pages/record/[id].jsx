import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecordingDetail() {
  const { id } = useParams(); 
  const [recording, setRecording] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecording = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recordings/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch recording details");
        }
        const data = await res.json();
        console.log(data)
        setRecording(data.recording[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecording();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recording) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recording.file_name}</h1>
      <audio controls>
        <source src={`http://localhost:8080/uploads/${recording.file_name}`} />
        Your browser does not support the audio element.
      </audio>
      <p>{recording.description}</p>
    </div>
  );
}
