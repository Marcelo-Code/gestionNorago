import React from "react";
import "./footer.css";
import { darkColor, lightColor } from "../../utils/helpers";

export const Footer = (footerProps) => {
  const { darkMode } = footerProps;

  return (
    <footer
      style={{ backgroundColor: darkMode ? darkColor : lightColor }}
      className="footerContainer"
    >
      <span className="footerBrandTitle">© 2025 Gestión Norago</span>
      <span className="footerEditorSign">Marcelo Feltes</span>
    </footer>
  );
};
