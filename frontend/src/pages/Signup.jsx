import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // 컴포넌트별 CSS 임포트

function Signup() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        { id, name, password }
      );
      setMessage("회원가입 성공!");
    } catch (error) {
      setMessage("회원가입 실패");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>회원가입</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
