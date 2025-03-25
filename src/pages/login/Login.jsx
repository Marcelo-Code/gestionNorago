import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";

export const Login = () => {
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
          <span className="loginTitle">Login</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: "white" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<LoginIcon />}
            onClick={() => alert("LogIn")}
          >
            LogIn
          </Button>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography>
              <Link style={{ color: "white", justifySelf: "center" }}>
                Olvidé mi contraseña
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
