import React, { useContext } from "react";
import "./home.css";
import CircularProgress from "@mui/material/CircularProgress";
import { GeneralContext } from "../../context/GeneralContext";
import { darkColor } from "../../utils/helpers";

export const Home = (homeProps) => {
  const { sizeDBMessage, isLoading } = homeProps;
  const { darkMode } = useContext(GeneralContext);
  return (
    <>
      <div className="homeContainer">
        <div className="imageContainer"></div>
        {isLoading ? (
          <span
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </span>
        ) : (
          <span
            className="infoContainer"
            style={{ color: darkMode ? "white" : darkColor }}
          >
            {sizeDBMessage}
          </span>
        )}
      </div>
    </>
  );
};
