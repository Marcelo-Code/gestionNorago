import React, { useState, useEffect } from "react";
import { supabaseClient } from "../services/config/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./recoverPassword/recoverPassword.css";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid access token.");
    }
  }, [accessToken]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data, error } = await supabaseClient.auth.updateUser(
        {
          password: newPassword,
        },
        {
          access_token: accessToken,
        }
      );

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="loginContainer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }} className="loginForm">
          <span className="loginTitle">Update Password</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            autoFocus
            sx={{ backgroundColor: "white" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            sx={{ backgroundColor: "white" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" align="center">
              {successMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
