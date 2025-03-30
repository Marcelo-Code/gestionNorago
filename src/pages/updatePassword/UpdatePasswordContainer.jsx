import React, { useState, useEffect } from "react";
import { supabaseClient } from "../../services/config/config";
import { useNavigate } from "react-router-dom";
import { UpdatePassword } from "./UpdatePassword";
import { X } from "@mui/icons-material";

export const UpdatePasswordContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    //Recupera el access token del localStorage
    const accessTokenData = localStorage.getItem(
      "sb-qkifydwkmkllnebiosiq-auth-token"
    );
    const parsedToken = JSON.parse(accessTokenData);
    setAccessToken(parsedToken.access_token);

    const accessToken = parsedToken.access_token;

    if (!accessToken) {
      setError("Invalid access token.");
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { error } = await supabaseClient.auth.updateUser(
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

  const updatePasswordProps = {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    error,
    successMessage,
  };

  return <UpdatePassword {...updatePasswordProps} />;
};
