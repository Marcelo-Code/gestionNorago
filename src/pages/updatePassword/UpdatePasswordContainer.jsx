import React, { useState, useEffect } from "react";
import { supabaseClient } from "../../services/config/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UpdatePassword } from "./UpdatePassword";

export const UpdatePasswordContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("access_token");

  console.log(searchParams);

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
