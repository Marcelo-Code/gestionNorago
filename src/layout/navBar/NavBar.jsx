import React from "react";
import "./NavBar.css";
import { BurguerMenuContainer } from "../burguerMenu/BurguerMenuContainer";
import { Link } from "react-router-dom";
import { SwitchDarkMode } from "../switchDarkMode/SwitchDarkMode";
import { darkColor, lightColor } from "../../utils/helpers";

export const NavBar = (navBarProps) => {
  const { darkMode, changeMode } = navBarProps;
  return (
    <nav
      style={{ backgroundColor: darkMode ? darkColor : lightColor }}
      className="navbar"
    >
      <BurguerMenuContainer />
      <Link to={"/"} className="navbar-brand">
        {darkMode ? (
          <img
            src="/images/noragoLightLogo.png"
            width={100}
            alt="Logo"
            className="navbar-logo"
          />
        ) : (
          <img
            src="/images/noragoLogo.png"
            width={100}
            alt="Logo"
            className="navbar-logo"
          />
        )}
      </Link>
      <SwitchDarkMode checked={darkMode} onChange={changeMode} />
    </nav>
  );
};
