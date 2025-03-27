import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";

export const RecoverPassword = ({
  handleGoBack,
  handleRecoverPassword,
  email,
  setEmail,
  error,
  successMessage,
}) => {
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
          <span className="loginTitle">Recuperar Contraseña</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ backgroundColor: "white" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<LoginIcon />}
            onClick={handleRecoverPassword}
          >
            Recuperar Contraseña
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
        <Button fullWidth variant="outlined" onClick={handleGoBack}>
          Volver
        </Button>
      </Box>
    </Container>
  );
};
