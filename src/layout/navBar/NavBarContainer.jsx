import React, { useContext } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../context/GeneralContext";
import { confirmationAlert } from "../../components/alerts/alerts";

export const NavBarContainer = () => {
  const { darkMode, changeMode, setIsLoggedIn } = useContext(GeneralContext);
  const handleLogout = async () => {
    const confirmed = await confirmationAlert(
      "¿Estás seguro de que deseas salir?"
    );
    if (confirmed) {
      setIsLoggedIn(false);
      localStorage.clear();
    }
  };
  const navBarProps = {
    darkMode,
    changeMode,
    handleLogout,
  };
  return <NavBar {...navBarProps} />;
};
