import React from "react";

const SessionContext = React.createContext({
  setAccessTokenFromCookie: null,
  isSessionValid: null,
  userId: null,
  setUserId: null,
  admitted: false,
  setAdmitted: null,
});

export default SessionContext;
