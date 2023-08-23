import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SessionExpired = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <Container
      className={`session-expired-container ${showAnimation ? "show" : ""}`}
      maxWidth="sm"
      style={{ textAlign: "center", marginTop: "10%" }}
    >
      <Typography variant="h4" gutterBottom>
        Session Expired
      </Typography>
      <Typography paragraph>
        Your session has expired. Please log in again to continue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLoginClick}
      >
        Login
      </Button>
    </Container>
  );
};

export default SessionExpired;
