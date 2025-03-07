import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import "./loading.css";

export const Loading = () => {
  return (
    <Box className="loadingContainer">
      <LinearProgress />
    </Box>
  );
};
