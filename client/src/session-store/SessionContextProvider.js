import React from "react";
import SessionContext from "./SessionContext";
import { useState } from "react";

function SessionContextProvider(props) {
  const [accessToken, setAccessToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [admitted, setAdmitted] = useState(true);

  const isSessionValid = () => {
    const accessTokenExpiration = new Date(
      localStorage.getItem("accessTokenExpiration")
    );
    const currentTime = new Date();
    return accessTokenExpiration > currentTime;
  };

  const setAccessTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === "accessToken") {
        const decodedValue = decodeURIComponent(cookieValue);
        let decodedAccessToken;
        const jsonStartIndex = decodedValue.indexOf(":");
        if (jsonStartIndex !== -1) {
          const jsonString = decodedValue.substring(jsonStartIndex + 1);
          try {
            decodedAccessToken = JSON.parse(jsonString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          setAccessToken(decodedAccessToken);
        }
      }
    }
  };

  return (
    <SessionContext.Provider
      value={{
        setAccessTokenFromCookie,
        isSessionValid,
        userId,
        setUserId,
        admitted,
        setAdmitted,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}

export default SessionContextProvider;
