import React, { useContext } from "react";
import "./pageNotFound.css";
import { Button } from "@mui/material";
import { buttonColor, darkColor } from "../../utils/helpers";
import { GeneralContext } from "../../context/GeneralContext";

export const PageNotFound = (pageNotFoundProps) => {
  const { handleGoBack } = pageNotFoundProps;
  const { darkMode } = useContext(GeneralContext);
  return (
    <div className="pageNotFoundContainer">
      <span
        className="pageNotFoundTitle"
        style={{ color: darkMode ? "white" : buttonColor }}
      >
        Error 404: Página no encontrada
      </span>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoBack}
        className="pageNotFoundButton"
        sx={{
          background: darkMode ? darkColor : "white",
          color: darkMode ? "white" : darkColor,
          width: "80%",
          maxWidth: "600px",
          minWidth: "300px",
        }}
      >
        Volver
      </Button>
    </div>
  );
};
