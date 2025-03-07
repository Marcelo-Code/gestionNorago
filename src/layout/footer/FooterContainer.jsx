import React, { useContext } from "react";
import { Footer } from "./Footer";
import { GeneralContext } from "../../context/GeneralContext";

export const FooterContainer = () => {
  const { darkMode, changeMode } = useContext(GeneralContext);
  const footerProps = {
    darkMode,
    changeMode,
  };
  return <Footer {...footerProps} />;
};
