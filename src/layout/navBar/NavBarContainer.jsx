import React, { useContext } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../context/GeneralContext";

export const NavBarContainer = () => {
  const { darkMode, changeMode, setIsLoggedIn } = useContext(GeneralContext);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };
  const navBarProps = {
    darkMode,
    changeMode,
    handleLogout,
  };
  return <NavBar {...navBarProps} />;
};
