import React, { useContext } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../context/GeneralContext";

export const NavBarContainer = () => {
  const { darkMode, changeMode } = useContext(GeneralContext);
  const navBarProps = {
    darkMode,
    changeMode,
  };
  return <NavBar {...navBarProps} />;
};
