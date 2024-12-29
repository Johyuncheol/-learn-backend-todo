import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css"; // 컴포넌트별 CSS 임포트
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { id, password },
        { withCredentials: true } // 쿠키를 포함한 요청 보내기
      );

      if (response.status === 200) {
        // 로그인 성공 시 홈 페이지로 리디렉션
        navigate("/home"); // useNavigate 훅을 사용하여 페이지 이동
      } else {
        setMessage("로그인 성공!");
      }
    } catch (error) {
      setMessage("로그인 실패");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>로그인</h2>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">로그인</button>
        </form>
        <Link to={"/signup"}>회원가입</Link>
      </div>
    </div>
  );
}

export default Login;
