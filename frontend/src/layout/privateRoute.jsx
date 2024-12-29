import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/check_auth",
          {
            method: "GET",
            credentials: "include", // HTTPOnly 쿠키 포함
          }
        );

        if (response.ok) {
          const { user } = await response.json();

          // 권한 검사
          if (requiredRoles.includes(user.role)) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("인증 확인 오류:", err);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [requiredRoles]);

  if (isAuthorized === null) {
    return <p>로딩 중...</p>; // 초기 로딩 상태
  }

  return isAuthorized ? children : <Navigate to="/" />;
};

export default PrivateRoute;
